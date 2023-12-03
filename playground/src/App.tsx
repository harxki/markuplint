import type { ConsoleOutputRef } from './components/ConsoleOutput';
import type { DistTag } from './modules/dist-tag';
import type { PlaygroundValues } from './modules/save-values';
import type { Violations } from './modules/violations';
import type { Rules, Config } from '@markuplint/ml-config';

import { Popover, Tab } from '@headlessui/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Split from 'react-split';
import stripJsonComments from 'strip-json-comments';

import logo from './assets/images/logo-horizontal.svg';
import { CodeEditor } from './components/CodeEditor';
import { ConfigEditor } from './components/ConfigEditor';
import { ConsoleOutput } from './components/ConsoleOutput';
import { DepsEditor } from './components/DepsEditor';
import { ExampleSelector } from './components/ExampleSelector';
import { FilenameEditor } from './components/FilenameEditor';
import { PresetsEditor } from './components/PresetsEditor';
import { ProblemsOutput } from './components/ProblemsOutput';
import { SchemaEditor } from './components/SchemaEditor';
import { examples } from './examples';
import { debounce } from './modules/debounce';
import { isJsonObject, parseJson } from './modules/json';
import { loadValues, saveValues } from './modules/save-values';
import { setupContainerServer } from './server';

const defaultCategory = examples[Object.keys(examples).sort()[0]].examples;
const defaultExample = defaultCategory[Object.keys(defaultCategory).sort()[0]];

const parseConfig = (maybeConfig: string): Config | null => {
	try {
		const parsed = parseJson(stripJsonComments(maybeConfig));
		if (isJsonObject(parsed)) {
			return parsed;
		} else {
			return null;
		}
	} catch {
		return null;
	}
};

const isValidJson = (maybeJson: string) => {
	return parseConfig(maybeJson) !== null;
};

let boot = false;
let containerServer: Awaited<ReturnType<typeof setupContainerServer>> | undefined;

const fallbackValues = {
	code: '',
	codeFileType: '.html',
	config: '',
} as const satisfies PlaygroundValues;
const initialValues = {
	...fallbackValues,
	...(loadValues() ?? defaultExample),
} as const;
const { config: initialConfig, codeFileType: initialCodeFileType, code: initialCode } = initialValues;

type StringSet = Readonly<ReadonlySet<string>>;
const areSetsEqual = (set1: StringSet, set2: StringSet) => {
	if (set1.size !== set2.size) return false;
	return [...set1].every(item => set2.has(item));
};

export function App() {
	const consoleRef = useRef<ConsoleOutputRef>(null);
	const [code, setCode] = useState(initialCode);
	const [fileType, setFileType] = useState<string>(initialCodeFileType);
	const filename = `index${fileType}`;
	const [configString, setConfigString] = useState(initialConfig);
	const [depsPackages, setDepsPackages] = useState<StringSet>(new Set(['markuplint']));
	const [distTag, setDistTag] = useState<DistTag>('latest');
	const [violations, setViolations] = useState<Violations | null>(null);
	const [lintTrigger, setLintTrigger] = useState(0);
	const [installedPackages, setInstalledPackages] = useState<Readonly<Record<string, string>>>({});
	const [depsStatus, setDepsStatus] = useState<'success' | 'error' | 'loading' | null>(null);
	const [status, setStatus] = useState<
		'not-started' | 'deps-installing' | 'deps-error' | 'config-updating' | 'lint-checked' | 'config-error'
	>('not-started');
	const [initialized, setInitialized] = useState(false);
	const [selectedTab, setSelectedTab] = useState<'code' | 'config' | null>(null);
	const [version, setVersion] = useState<string>();
	const tabsRef = useRef<HTMLElement>(null);

	useEffect(() => {
		// get version
		void (async () => {
			const response = await fetch('https://registry.npmjs.org/markuplint');
			const json = await response.json();
			const version = json['dist-tags'][distTag];
			if (typeof version !== 'string') {
				throw new TypeError('Invalid version');
			}
			setVersion(version);
		})();
	}, [distTag]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				const entry = entries[0];
				if (entry.isIntersecting) {
					// mobile
					setSelectedTab('code');
				} else {
					// desktop
					setSelectedTab(null);
				}
			},
			{ root: document.body },
		);
		if (tabsRef.current) {
			observer.observe(tabsRef.current);
		}
		return () => {
			observer.disconnect();
		};
	}, []);

	// boot container server
	useEffect(() => {
		if (!boot) {
			boot = true;
			void (async () => {
				containerServer = await setupContainerServer(consoleRef.current!);
				setInitialized(true);
			})();
		}
	}, []);

	// update dependencies when config changed
	useEffect(() => {
		// find @markuplint/* packages from config
		const additionalPackages = configString.match(/@markuplint\/[^"]+/g) ?? [];
		const candidate = new Set(['markuplint', ...additionalPackages]);
		if (!areSetsEqual(depsPackages, candidate)) {
			setDepsPackages(candidate);
		}
	}, [configString, depsPackages]);

	// update config when config changed
	useEffect(() => {
		if (!containerServer) {
			return;
		}

		if (isValidJson(configString)) {
			void (async () => {
				setViolations(null);
				setStatus('config-updating');
				try {
					await containerServer.updateConfig('.markuplintrc', configString);
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error(error);
				}
				setLintTrigger(prev => prev + 1);
			})();
		} else {
			setStatus('config-error');
		}
	}, [configString]);

	// npm install when dependencies changed
	useEffect(() => {
		if (!containerServer || !initialized) {
			return;
		}

		setViolations(null);
		setDepsStatus('loading');
		setStatus('deps-installing');

		void (async () => {
			try {
				const dependencies = [...depsPackages].map(name => `${name}@${distTag}`);
				const installed = await containerServer.updateDeps(dependencies);
				setInstalledPackages(installed);
				setDepsStatus('success');
				setLintTrigger(prev => prev + 1);
			} catch {
				setDepsStatus('error');
				setStatus('deps-error');
			}
		})();
	}, [depsPackages, distTag, initialized]);

	// lint
	useEffect(() => {
		if (!containerServer) {
			return;
		}
		if (depsStatus !== 'success') {
			return;
		}
		void (async () => {
			const result = await containerServer.lint(filename, code);
			setStatus('lint-checked');
			setViolations(result);
		})();
	}, [code, depsStatus, filename, lintTrigger]);

	// save values
	const debouncedSaveValues = useMemo(() => debounce(saveValues, 200), []);
	useEffect(() => {
		if (!initialized) {
			return;
		}
		debouncedSaveValues({
			config: configString,
			codeFileType: fileType,
			code: code,
		});
	}, [configString, code, debouncedSaveValues, initialized, fileType]);

	// update config when rules changed
	const handleChangeRules = useCallback(
		(rules: Rules) => {
			const parsedConfig = { ...parseConfig(configString) };
			if (Object.keys(rules).length === 0) {
				delete parsedConfig.rules;
			} else {
				parsedConfig.rules = rules;
			}
			setConfigString(JSON.stringify(parsedConfig, null, 2));
		},
		[configString],
	);

	const handleChangeFileType = useCallback(
		(newFileType: string) => {
			setFileType(newFileType);
			const parsedConfig = { ...parseConfig(configString) };
			const mapping: Readonly<Record<string, Pick<Config, 'parser' | 'specs'>>> = {
				'.jsx': {
					parser: { '\\.jsx$': '@markuplint/jsx-parser' },
					specs: { '\\.jsx$': '@markuplint/react-spec' },
				},
				'.vue': {
					parser: { '\\.vue$': '@markuplint/vue-parser' },
					specs: { '\\.vue$': '@markuplint/vue-spec' },
				},
				'.svelte': {
					parser: { '\\.svelte$': '@markuplint/svelte-parser' },
				},
			};
			const parserAndSpecs = mapping[newFileType] ?? {};
			if (parserAndSpecs.parser) {
				parsedConfig.parser = parserAndSpecs.parser;
			} else {
				delete parsedConfig.parser;
			}
			if (parserAndSpecs.specs) {
				parsedConfig.specs = parserAndSpecs.specs;
			} else {
				delete parsedConfig.specs;
			}
			setConfigString(JSON.stringify(parsedConfig, null, 2));
		},
		[configString],
	);
	const presets = useMemo((): readonly string[] => {
		const parsedConfig = parseConfig(configString) ?? {};
		const { extends: extendsValue } = parsedConfig;
		return Array.isArray(extendsValue) ? extendsValue : [];
	}, [configString]);
	const rules = useMemo((): Rules => {
		const parsedConfig = parseConfig(configString) ?? {};
		const { rules } = parsedConfig;
		return rules ?? {};
	}, [configString]);
	const handleChangePresets = useCallback(
		(newPresets: readonly string[]) => {
			const parsedConfig = { ...parseConfig(configString) };
			if (newPresets.length === 0) {
				delete parsedConfig.extends;
			} else {
				parsedConfig.extends = newPresets;
			}
			setConfigString(JSON.stringify(parsedConfig, null, 2));
		},
		[configString],
	);
	return (
		<>
			<header className="sticky top-0 z-10 flex items-center justify-between border-b border-b-slate-300 bg-white px-4 py-2">
				<h1 className="text-lg font-bold leading-normal md:text-xl">
					<img
						src={logo}
						alt="Markuplint"
						width={968}
						height={181}
						decoding="async"
						className="mt-[-0.2em] inline-block h-[1.2em] w-auto"
					/>{' '}
					Playground
				</h1>
				<ExampleSelector
					disabled={!initialized}
					onSelect={example => {
						setConfigString(example.config);
						setFileType(example.codeFileType);
						setCode(example.code);
					}}
				/>
			</header>
			<main className="grid grid-cols-1 grid-rows-[auto_minmax(0,1fr)] md:block">
				<nav ref={tabsRef} className="border-b bg-slate-100 md:hidden">
					<ul className="flex flex-wrap gap-1 px-4 pt-1">
						<li>
							<button
								type="button"
								onClick={() => {
									setSelectedTab('code');
								}}
								className="flex items-center gap-2 border-b-2 border-transparent px-3 py-1 font-bold aria-selected:border-ml-blue"
							>
								<span className=" icon-heroicons-solid-code text-xl text-slate-500"></span>
								Code
							</button>
						</li>
						<li>
							<button
								onClick={() => {
									setSelectedTab('config');
								}}
								className="flex items-center gap-2 border-b-2 border-transparent px-3 py-1 font-bold aria-selected:border-ml-blue"
							>
								<span className=" icon-heroicons-solid-cog-6-tooth text-xl text-slate-500"></span>
								Config
							</button>
						</li>
					</ul>
				</nav>
				<Split
					direction="horizontal"
					sizes={[60, 40]}
					gutter={() => {
						const gutterElement = document.createElement('div');
						gutterElement.className =
							'w-[2px] box-content border-x-4 border-transparent bg-slate-300 cursor-col-resize hover:bg-ml-blue hidden md:block';
						return gutterElement;
					}}
					gutterStyle={() => ({})}
					className="flex h-full"
					minSize={0}
				>
					<Split
						direction="vertical"
						sizes={[60, 40]}
						gutter={() => {
							const gutterElement = document.createElement('div');
							gutterElement.className =
								'w-full h-[2px] box-content border-y-4 border-transparent bg-slate-300 cursor-row-resize hover:bg-ml-blue';
							return gutterElement;
						}}
						gutterStyle={() => ({})}
						className={
							selectedTab === null ? 'overflow-x-hidden' : selectedTab === 'code' ? '!w-full' : 'hidden'
						}
					>
						<section>
							<CodeEditor
								value={code}
								filename={filename}
								violations={violations ?? []}
								onChange={setCode}
							/>
						</section>
						<div className="grid grid-rows-1">
							<ProblemsOutput violations={violations} />
						</div>
					</Split>
					<section
						className={`grid grid-rows-[auto_minmax(0,1fr)] ${
							selectedTab === null ? '' : selectedTab === 'config' ? '!w-full' : 'hidden'
						}`}
					>
						<Tab.Group>
							<div className="flex items-center justify-between gap-2 bg-slate-100 px-4 py-1">
								<hgroup className="flex flex-wrap items-baseline">
									<h2 className="flex items-baseline gap-2 border-b-2 border-transparent font-bold aria-selected:border-ml-blue">
										<span className=" icon-heroicons-solid-cog-6-tooth translate-y-[0.15em] text-xl text-slate-500"></span>
										Config
									</h2>
									<p className="text-xs tracking-tight">
										<code>.markuplintrc</code>
									</p>
								</hgroup>
								<Tab.List className="flex rounded-lg border">
									<Tab className="flex items-center justify-center gap-1 overflow-hidden px-2 py-1 text-sm text-black text-opacity-60 first:rounded-s-lg last:rounded-e-lg aria-selected:bg-white  aria-selected:text-opacity-100">
										<span className=" icon-majesticons-curly-braces shrink-0"></span>
										JSON
									</Tab>
									<Tab className="flex items-center justify-center gap-1 overflow-hidden px-2 py-1 text-sm text-black text-opacity-60 first:rounded-s-lg last:rounded-e-lg aria-selected:bg-white aria-selected:text-opacity-100">
										<span className=" icon-heroicons-solid-adjustments-horizontal shrink-0"></span>
										Visual
									</Tab>
								</Tab.List>
							</div>

							<Tab.Panels>
								<Tab.Panel unmount={false} className="grid h-full">
									<ConfigEditor value={configString} onChange={setConfigString} />
								</Tab.Panel>
								<Tab.Panel unmount={false} className="h-full overflow-y-auto">
									<div className="grid gap-2 px-4 py-4">
										<details open className="group overflow-hidden rounded-lg border">
											<summary
												className="
													flex items-center justify-between gap-2 border-slate-300 bg-slate-100 
													px-4 py-2 font-medium -outline-offset-2
												"
											>
												Parser &amp; Specs
												<span className="icon-heroicons-solid-chevron-down text-xl group-open:icon-heroicons-solid-chevron-up" />
											</summary>
											<FilenameEditor value={fileType} onChange={handleChangeFileType} />
										</details>
										<details open className="group overflow-hidden rounded-lg border">
											<summary
												className="
												flex items-center justify-between gap-2 border-slate-300 bg-slate-100 
												px-4 py-2 font-medium -outline-offset-2
											"
											>
												Presets
												<span className="icon-heroicons-solid-chevron-down text-xl group-open:icon-heroicons-solid-chevron-up" />
											</summary>
											<PresetsEditor
												fileType={fileType}
												value={presets}
												onChange={handleChangePresets}
											/>
										</details>
										<details open className="group overflow-hidden rounded-lg border">
											<summary
												className="
													flex items-center justify-between gap-2 border-slate-300 bg-slate-100 
													px-4 py-2 font-medium -outline-offset-2
												"
											>
												Rules
												<span className="icon-heroicons-solid-chevron-down text-xl group-open:icon-heroicons-solid-chevron-up" />
											</summary>
											{version && (
												<SchemaEditor
													value={rules}
													version={version}
													onChange={handleChangeRules}
												/>
											)}
										</details>
									</div>
								</Tab.Panel>
							</Tab.Panels>
						</Tab.Group>
					</section>
				</Split>
			</main>
			<footer className="sticky bottom-0 flex items-center justify-end border-t bg-white px-4 py-1 text-sm">
				<output className="flex items-center justify-end gap-1">
					{
						{
							'not-started': <></>,
							'deps-installing': (
								<>
									<span className="icon-custom-loading-wrapper relative text-lg text-slate-200">
										<span className="icon-custom-loading absolute inset-0 animate-spin text-ml-blue"></span>
									</span>
									Installing dependencies... (may take 10-30 sec.)
								</>
							),
							'deps-error': (
								<>
									<span className="icon-heroicons-solid-x-circle  text-red-500"></span>
									Install error!
								</>
							),
							'config-updating': (
								<>
									<span className="icon-custom-loading-wrapper relative text-lg text-slate-200">
										<span className="icon-custom-loading absolute inset-0 animate-spin text-ml-blue"></span>
									</span>
									Updating config...
								</>
							),
							'config-error': (
								<>
									<span className=" icon-heroicons-solid-x-circle  text-red-500"></span>
									Config file is invalid!
								</>
							),
							'lint-checked': (
								<>
									<span className=" icon-heroicons-solid-check text-green-700"></span>
									Checked!
								</>
							),
						}[status]
					}
				</output>
				<Popover>
					<Popover.Button
						className="
						ml-2 flex items-center gap-1
						rounded-md bg-slate-100 px-2 py-1 text-slate-900 shadow-sm
						hover:bg-slate-200 hover:text-slate-800
					"
					>
						<span className="icon-heroicons-solid-command-line"></span>
						Console
					</Popover.Button>
					<Popover.Panel
						unmount={false}
						className="absolute bottom-[calc(100%+1rem)] right-4 z-10 w-[calc(100%-3rem)] max-w-4xl overflow-hidden rounded-lg border bg-white shadow-lg"
					>
						<ConsoleOutput ref={consoleRef} />
					</Popover.Panel>
				</Popover>
				<Popover>
					<Popover.Button
						className="
						ml-2 flex items-center gap-1
						rounded-md bg-slate-100 px-2 py-1 text-slate-900 shadow-sm
						hover:bg-slate-200 hover:text-slate-800
					"
					>
						<span className=" icon-heroicons-solid-tag"></span>
						{`v${version}`}
					</Popover.Button>
					<Popover.Panel
						unmount={false}
						className="absolute bottom-[calc(100%+1rem)] left-4 right-4 z-10 ml-auto w-fit overflow-hidden rounded-lg border bg-white shadow-lg"
					>
						<DepsEditor
							status={depsStatus}
							installedPackages={installedPackages}
							distTag={distTag}
							depsPackages={depsPackages}
							onChange={setDistTag}
						/>
					</Popover.Panel>
				</Popover>
			</footer>
		</>
	);
}
