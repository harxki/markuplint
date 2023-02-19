/**
 * IDL attributes VS Content attributes
 *
 * @see https://github.com/facebook/react/blob/main/packages/react-dom-bindings/src/shared/possibleStandardNames.js
 */
const idlContentMap = {
	// HTML
	accept: 'accept',
	acceptCharset: 'acceptcharset',
	accessKey: 'accesskey',
	action: 'action',
	allowFullScreen: 'allowfullscreen',
	alt: 'alt',
	as: 'as',
	async: 'async',
	autoCapitalize: 'autocapitalize',
	autoComplete: 'autocomplete',
	autoCorrect: 'autocorrect',
	autoFocus: 'autofocus',
	autoPlay: 'autoplay',
	autoSave: 'autosave',
	capture: 'capture',
	cellPadding: 'cellpadding',
	cellSpacing: 'cellspacing',
	challenge: 'challenge',
	charSet: 'charset',
	checked: 'checked',
	cite: 'cite',
	classID: 'classid',
	className: 'class',
	cols: 'cols',
	colSpan: 'colspan',
	content: 'content',
	contentEditable: 'contenteditable',
	contextMenu: 'contextmenu',
	controls: 'controls',
	controlsList: 'controlslist',
	coords: 'coords',
	crossOrigin: 'crossorigin',
	data: 'data',
	dateTime: 'datetime',
	default: 'default',
	defer: 'defer',
	dir: 'dir',
	disabled: 'disabled',
	disablePictureInPicture: 'disablepictureinpicture',
	disableRemotePlayback: 'disableremoteplayback',
	download: 'download',
	draggable: 'draggable',
	encType: 'enctype',
	enterKeyHint: 'enterkeyhint',
	form: 'form',
	formAction: 'formaction',
	formEncType: 'formenctype',
	formMethod: 'formmethod',
	formNoValidate: 'formnovalidate',
	formTarget: 'formtarget',
	frameBorder: 'frameborder',
	headers: 'headers',
	height: 'height',
	hidden: 'hidden',
	high: 'high',
	href: 'href',
	hrefLang: 'hreflang',
	htmlFor: 'for',
	httpEquiv: 'httpequiv',
	icon: 'icon',
	id: 'id',
	imageSizes: 'imagesizes',
	imageSrcSet: 'imagesrcset',
	inputMode: 'inputmode',
	integrity: 'integrity',
	is: 'is',
	itemID: 'itemid',
	itemProp: 'itemprop',
	itemRef: 'itemref',
	itemScope: 'itemscope',
	itemType: 'itemtype',
	keyParams: 'keyparams',
	keyType: 'keytype',
	kind: 'kind',
	label: 'label',
	lang: 'lang',
	list: 'list',
	loop: 'loop',
	low: 'low',
	manifest: 'manifest',
	marginHeight: 'marginheight',
	marginWidth: 'marginwidth',
	max: 'max',
	maxLength: 'maxlength',
	media: 'media',
	mediaGroup: 'mediagroup',
	method: 'method',
	min: 'min',
	minLength: 'minlength',
	multiple: 'multiple',
	muted: 'muted',
	name: 'name',
	noModule: 'nomodule',
	nonce: 'nonce',
	noValidate: 'novalidate',
	open: 'open',
	optimum: 'optimum',
	pattern: 'pattern',
	placeholder: 'placeholder',
	playsInline: 'playsinline',
	popover: 'popover',
	popoverHideTarget: 'popoverhidetarget',
	popoverShowTarget: 'popovershowtarget',
	popoverToggleTarget: 'popovertoggletarget',
	poster: 'poster',
	preload: 'preload',
	profile: 'profile',
	radioGroup: 'radiogroup',
	readOnly: 'readonly',
	referrerPolicy: 'referrerpolicy',
	rel: 'rel',
	required: 'required',
	reversed: 'reversed',
	role: 'role',
	rows: 'rows',
	rowSpan: 'rowspan',
	sandbox: 'sandbox',
	scope: 'scope',
	scoped: 'scoped',
	scrolling: 'scrolling',
	seamless: 'seamless',
	selected: 'selected',
	shape: 'shape',
	size: 'size',
	sizes: 'sizes',
	span: 'span',
	spellCheck: 'spellcheck',
	src: 'src',
	srcDoc: 'srcdoc',
	srcLang: 'srclang',
	srcSet: 'srcset',
	start: 'start',
	step: 'step',
	style: 'style',
	summary: 'summary',
	tabIndex: 'tabindex',
	target: 'target',
	title: 'title',
	type: 'type',
	useMap: 'usemap',
	value: 'value',
	width: 'width',
	wmode: 'wmode',
	wrap: 'wrap',

	// SVG and RDFa
	accentHeight: 'accent-height',
	accumulate: 'accumulate',
	additive: 'additive',
	alignmentBaseline: 'alignment-baseline',
	allowReorder: 'allowreorder',
	alphabetic: 'alphabetic',
	amplitude: 'amplitude',
	arabicForm: 'arabic-form',
	ascent: 'ascent',
	attributeName: 'attributeName',
	attributeType: 'attributeType',
	autoReverse: 'autoreverse',
	azimuth: 'azimuth',
	baseFrequency: 'baseFrequency',
	baselineShift: 'baseline-shift',
	baseProfile: 'baseProfile',
	bbox: 'bbox',
	begin: 'begin',
	bias: 'bias',
	by: 'by',
	calcMode: 'calcMode',
	capHeight: 'cap-height',
	clip: 'clip',
	clipPath: 'clip-path',
	clipPathUnits: 'clipPathUnits',
	clipRule: 'clip-rule',
	color: 'color',
	colorInterpolation: 'color-interpolation',
	colorInterpolationFilters: 'color-interpolation-filters',
	colorProfile: 'color-profile',
	colorRendering: 'color-rendering',
	contentScriptType: 'contentScriptType',
	contentStyleType: 'contentStyleType',
	cursor: 'cursor',
	cx: 'cx',
	cy: 'cy',
	d: 'd',
	decelerate: 'decelerate',
	descent: 'descent',
	diffuseConstant: 'diffuseConstant',
	direction: 'direction',
	display: 'display',
	divisor: 'divisor',
	dominantBaseline: 'dominant-baseline',
	dur: 'dur',
	dx: 'dx',
	dy: 'dy',
	edgeMode: 'edgeMode',
	elevation: 'elevation',
	enableBackground: 'enable-background',
	end: 'end',
	exponent: 'exponent',
	fill: 'fill',
	fillOpacity: 'fill-opacity',
	fillRule: 'fill-rule',
	filter: 'filter',
	filterRes: 'filterRes',
	filterUnits: 'filterUnits',
	floodColor: 'flood-color',
	floodOpacity: 'flood-opacity',
	focusable: 'focusable',
	fontFamily: 'font-family',
	fontSize: 'font-size',
	fontSizeAdjust: 'font-size-adjust',
	fontStretch: 'font-stretch',
	fontStyle: 'font-style',
	fontVariant: 'font-variant',
	fontWeight: 'font-weight',
	format: 'format',
	from: 'from',
	fr: 'fr',
	fx: 'fx',
	fy: 'fy',
	g1: 'g1',
	g2: 'g2',
	glyphName: 'glyph-name',
	glyphOrientationHorizontal: 'glyph-orientation-horizontal',
	glyphOrientationVertical: 'glyph-orientation-vertical',
	glyphRef: 'glyphRef',
	gradientTransform: 'gradientTransform',
	gradientUnits: 'gradientUnits',
	hanging: 'hanging',
	horizAdvX: 'horiz-adv-x',
	horizOriginX: 'horiz-origin-x',
	ideographic: 'ideographic',
	imageRendering: 'image-rendering',
	in: 'in',
	in2: 'in2',
	inlist: 'inlist',
	intercept: 'intercept',
	k: 'k',
	k1: 'k1',
	k2: 'k2',
	k3: 'k3',
	k4: 'k4',
	kernelMatrix: 'kernelMatrix',
	kernelUnitLength: 'kernelUnitLength',
	kerning: 'kerning',
	keyPoints: 'keyPoints',
	keySplines: 'keySplines',
	keyTimes: 'keyTimes',
	lengthAdjust: 'lengthAdjust',
	letterSpacing: 'letter-spacing',
	lightingColor: 'lighting-color',
	limitingConeAngle: 'limitingConeAngle',
	local: 'local',
	markerEnd: 'marker-end',
	markerHeight: 'markerHeight',
	markerMid: 'marker-mid',
	markerStart: 'marker-start',
	markerUnits: 'markerUnits',
	markerWidth: 'markerWidth',
	mask: 'mask',
	maskContentUnits: 'maskContentUnits',
	maskUnits: 'maskUnits',
	mathematical: 'mathematical',
	mode: 'mode',
	numOctaves: 'numOctaves',
	offset: 'offset',
	opacity: 'opacity',
	operator: 'operator',
	order: 'order',
	orient: 'orient',
	orientation: 'orientation',
	origin: 'origin',
	overflow: 'overflow',
	overlinePosition: 'overline-position',
	overlineThickness: 'overline-thickness',
	paintOrder: 'paint-order',
	panose1: 'panose-1',
	pathLength: 'pathLength',
	patternContentUnits: 'patternContentUnits',
	patternTransform: 'patternTransform',
	patternUnits: 'patternUnits',
	pointerEvents: 'pointer-events',
	points: 'points',
	pointsAtX: 'pointsAtX',
	pointsAtY: 'pointsAtY',
	pointsAtZ: 'pointsAtZ',
	prefix: 'prefix',
	preserveAlpha: 'preserveAlpha',
	preserveAspectRatio: 'preserveAspectRatio',
	primitiveUnits: 'primitiveUnits',
	property: 'property',
	r: 'r',
	radius: 'radius',
	refX: 'refX',
	refY: 'refY',
	renderingIntent: 'rendering-intent',
	repeatCount: 'repeatCount',
	repeatDur: 'repeatDur',
	requiredExtensions: 'requiredExtensions',
	requiredFeatures: 'requiredFeatures',
	restart: 'restart',
	result: 'result',
	results: 'results',
	rotate: 'rotate',
	rx: 'rx',
	ry: 'ry',
	scale: 'scale',
	security: 'security',
	seed: 'seed',
	shapeRendering: 'shape-rendering',
	slope: 'slope',
	spacing: 'spacing',
	specularConstant: 'specularConstant',
	specularExponent: 'specularExponent',
	speed: 'speed',
	spreadMethod: 'spreadMethod',
	startOffset: 'startOffset',
	stdDeviation: 'stdDeviation',
	stemh: 'stemh',
	stemv: 'stemv',
	stitchTiles: 'stitchTiles',
	stopColor: 'stop-color',
	stopOpacity: 'stop-opacity',
	strikethroughPosition: 'strikethrough-position',
	strikethroughThickness: 'strikethrough-thickness',
	string: 'string',
	stroke: 'stroke',
	strokeDasharray: 'stroke-dasharray',
	strokeDashoffset: 'stroke-dashoffset',
	strokeLinecap: 'stroke-linecap',
	strokeLinejoin: 'stroke-linejoin',
	strokeMiterlimit: 'stroke-miterlimit',
	strokeOpacity: 'stroke-opacity',
	strokeWidth: 'stroke-width',
	surfaceScale: 'surfaceScale',
	systemLanguage: 'systemLanguage',
	tableValues: 'tableValues',
	targetX: 'targetX',
	targetY: 'targetY',
	textAnchor: 'text-anchor',
	textDecoration: 'text-decoration',
	textLength: 'textLength',
	textRendering: 'text-rendering',
	to: 'to',
	transform: 'transform',
	transformOrigin: 'transform-origin',
	u1: 'u1',
	u2: 'u2',
	underlinePosition: 'underline-position',
	underlineThickness: 'underline-thickness',
	unicode: 'unicode',
	unicodeBidi: 'unicode-bidi',
	unicodeRange: 'unicode-range',
	unitsPerEm: 'units-per-em',
	unselectable: 'unselectable',
	vAlphabetic: 'v-alphabetic',
	values: 'values',
	vectorEffect: 'vector-effect',
	version: 'version',
	vertAdvY: 'vert-adv-y',
	vertOriginX: 'vert-origin-x',
	vertOriginY: 'vert-origin-y',
	vHanging: 'v-hanging',
	vIdeographic: 'v-ideographic',
	viewBox: 'viewBox',
	viewTarget: 'viewTarget',
	visibility: 'visibility',
	vMathematical: 'v-mathematical',
	vocab: 'vocab',
	widths: 'widths',
	wordSpacing: 'word-spacing',
	writingMode: 'writing-mode',
	x: 'x',
	x1: 'x1',
	x2: 'x2',
	xChannelSelector: 'xChannelSelector',
	xHeight: 'x-height',
	xlinkActuate: 'xlink:actuate',
	xlinkArcrole: 'xlink:arcrole',
	xlinkHref: 'xlink:href',
	xlinkRole: 'xlink:role',
	xlinkShow: 'xlink:show',
	xlinkTitle: 'xlink:title',
	xlinkType: 'xlink:type',
	xmlBase: 'xml:base',
	xmlLang: 'xml:lang',
	xmlns: 'xmlns',
	xmlnsXlink: 'xmlns:xlink',
	xmlSpace: 'xml:space',
	y: 'y',
	y1: 'y1',
	y2: 'y1',
	yChannelSelector: 'yChannelSelector',
	z: 'z',
	zoomAndPan: 'zoomAndPan',

	/**
	 * PerformanceElementTiming API
	 *
	 * @experimental
	 * @see https://wicg.github.io/element-timing/#sec-modifications-DOM
	 * @see https://wicg.github.io/element-timing/#sec-elements-exposed
	 */
	elementTiming: 'elementtiming',

	/**
	 * IFrame credentialless
	 *
	 * @experimental
	 * @warning No specification found
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/credentialless
	 */
	credentialless: 'credentialless',
};

const list = Object.entries(idlContentMap);

export function searchIDLAttribute(name: string) {
	const camelizedName = camelize(name);
	const [idlPropName, contentAttrName] =
		(/^on[a-z]/.test(name) && [name.toLowerCase(), name.toLowerCase()]) ||
		list.find(
			([idlPropName, contentAttrName]) =>
				idlPropName.toLowerCase() === camelizedName.toLowerCase() ||
				contentAttrName.toLowerCase() === name.toLowerCase() ||
				hyphenize(idlPropName) === name.toLowerCase(),
		) ||
		[];
	return {
		idlPropName,
		contentAttrName,
	};
}

function camelize(str: string) {
	return str.replace(/[:-][a-z]/g, $0 => $0[1].toUpperCase());
}

function hyphenize(str: string) {
	return str.replace(/[A-Z]/g, $0 => `-${$0.toLowerCase()}`);
}
