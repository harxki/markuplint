import { mlRuleTest } from 'markuplint';

import rule from './';

test('is test 1', async () => {
	const { violations } = await mlRuleTest(
		rule,
		`
		<div data-attr="value" data-Attr='db' data-attR=tr>
			lorem
			<p>ipsam</p>
		</div>
		`,
		{ rule: true },
	);

	expect(violations).toStrictEqual([
		{
			severity: 'error',
			message: 'The attribute name is duplicated',
			line: 2,
			col: 26,
			raw: 'data-Attr',
		},
		{
			severity: 'error',
			message: 'The attribute name is duplicated',
			line: 2,
			col: 41,
			raw: 'data-attR',
		},
	]);
});

test('is test 2', async () => {
	const { violations } = await mlRuleTest(
		rule,
		`
		<div
			data-attr="value"
			data-Attr='db'
			data-attR=tr>
			lorem
			<p>ipsam</p>
		</div>
		`,
		{ rule: true },
	);

	expect(violations).toStrictEqual([
		{
			severity: 'error',
			message: 'The attribute name is duplicated',
			line: 4,
			col: 4,
			raw: 'data-Attr',
		},
		{
			severity: 'error',
			message: 'The attribute name is duplicated',
			line: 5,
			col: 4,
			raw: 'data-attR',
		},
	]);
});

test('is test 3', async () => {
	const { violations } = await mlRuleTest(rule, '<img src="/" SRC="/" >', { rule: true }, false, 'ja');

	expect(violations.map(_ => _.message)).toStrictEqual(['その属性名が重複しています']);
});

test('nodeRules disable', async () => {
	const { violations } = await mlRuleTest(rule, '<div><span attr attr></span></div>', {
		rule: true,
		nodeRule: [
			{
				selector: 'span',
				rule: false,
			},
		],
	});

	expect(violations.length).toStrictEqual(0);
});

test('Vue', async () => {
	const { violations } = await mlRuleTest(rule, '<template><div attr v-bind:attr /></template>', {
		rule: true,
		parser: {
			'.*': '@markuplint/vue-parser',
		},
	});

	expect(violations).toStrictEqual([
		{
			severity: 'error',
			line: 1,
			col: 21,
			message: 'The attribute name is duplicated',
			raw: 'v-bind:attr',
		},
	]);
});

test('React', async () => {
	const { violations } = await mlRuleTest(rule, '<div tabindex tabIndex />', {
		rule: true,
		parser: {
			'.*': '@markuplint/vue-parser',
		},
	});

	expect(violations).toStrictEqual([]);
});

test('Pug', async () => {
	const { violations } = await mlRuleTest(rule, '.hoge(class="hoge2")&attributes({class: "hoge3"})', {
		rule: true,
		parser: {
			'.*': '@markuplint/pug-parser',
		},
	});

	expect(violations.length).toBe(0);
});

test('Svelte', async () => {
	const { violations } = await mlRuleTest(
		rule,
		'<div class:selected="{isSelected}" class:focused="{isFocused}"></div>',
		{
			rule: true,
			parser: {
				'.*': '@markuplint/svelte-parser',
			},
		},
	);

	expect(violations.length).toBe(0);
});
