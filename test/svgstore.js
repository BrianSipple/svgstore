import svgstore from '../src/svgstore';
import test from 'ava';

var doctype = '<?xml version="1.0" encoding="UTF-8"?>' +
	'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ' +
	'"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

test('should set options for its instance', async assert => {
	var store = svgstore();
	assert.truthy(store.options);
	assert.is(store.options.stripInlineStyles, false);
});

test('should allow configurability of options through an options hash', async assert => {
	var store1 = svgstore();
	assert.is({}, store.options);

	var store2 = svgstore({});
	assert.is()

});

test('should create an svg document', async assert => {
	var store = svgstore();
	var svg = store.toString();

	assert.is(svg.slice(0, 5), '<?xml');
});

test('should create an svg element', async assert => {
	var store = svgstore();
	var svg = store.toString({inline: true});

	assert.is(svg.slice(0, 4), '<svg');
});

test('should combine svgs', async assert => {
	var store = svgstore()
		.add('foo', doctype + '<svg viewBox="0 0 100 100"><defs><linear-gradient/></defs><path/></svg>')
		.add('bar', doctype + '<svg viewBox="0 0 200 200"><defs><radial-gradient/></defs><rect/></svg>');

	var expected = doctype +
		'<svg xmlns="http://www.w3.org/2000/svg">' +
		'<defs><linear-gradient/><radial-gradient/></defs>' +
		'<symbol id="foo" viewBox="0 0 100 100"><path/></symbol>' +
		'<symbol id="bar" viewBox="0 0 200 200"><rect/></symbol>' +
		'</svg>';

	assert.is(store.toString(), expected);
});

// test('should remove inline styles when the option to do so is provided', async assert => {
// 	var store = svgstore();
// 	var svgString

// 	assert.is(store.toString())
// });
