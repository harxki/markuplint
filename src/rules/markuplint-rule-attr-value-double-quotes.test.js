import test from 'ava';
import * as markuplint from '../../lib/';
import CustomRule from '../../lib/rules/markuplint-rule-attr-value-double-quotes';

const rule = new CustomRule();

test('lower case', async t => {
	const r = await markuplint.verify(
		`
		<div data-attr="value" data-Attr='db' data-attR=tr>
			lorem
			<p>ipsam</p>
		</div>
		`,
		{
			rules: {
				"attr-value-double-quotes": true,
			},
		},
		[rule]
	);
	t.deepEqual(r, [
		{
			level: 'error',
			message: 'Attribute value is must quote on double',
			line: 2,
			col: 25,
			raw: 'data-Attr=\'db\'',
		},
		{
			level: 'error',
			message: 'Attribute value is must quote on double',
			line: 2,
			col: 40,
			raw: 'data-attR=tr',
		}
	]);
});

test('noop', t => t.pass());
