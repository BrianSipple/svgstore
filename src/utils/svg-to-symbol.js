'use strict';

var cheerio = require('cheerio');

var TEMPLATE_SYMBOL = '<symbol/>';

var ATTRIBUTE_ID = 'id';
var ATTRIBUTE_VIEW_BOX = 'viewBox';

/**
 * Utility for cloning an <svg/> as a <symbol/> within
 * the composition of svgstore output.
 *
 * @param {string} id The id to be applied to the symbol tag
 * @param {string} selectionObject A cheerio-aware object created from selecting the content of an SVG within a loaded file.
 * @param {object} options for parsing the svg content
 * @returns {object} symbol The final cheerio-aware object created by cloning the SVG contents
 * @see <a href="https://github.com/cheeriojs/cheerio">The Cheerio Project</a>
 */
function svgToSymbol(id, selectionObject, options) {
	var symbol = cheerio(TEMPLATE_SYMBOL);

	symbol.attr(ATTRIBUTE_ID, id);
	symbol.attr(ATTRIBUTE_VIEW_BOX, selectionObject.attr(ATTRIBUTE_VIEW_BOX));

	_processChildNodes(symbol, options);

	symbol.append(selectionObject.contents());

	return symbol;
}


function _processChildNodes(symbol, options) {
	var attributesToStrip = Array.isArray(options.stripAttributes) ? options.stripAttributes : [];

	symbol('*').each(function (idx, elem) {
		_stripAttributes(elem, attributesToStrip);
	});
}

function _stripAttributes(symbol, attributesToStrip) {
	debugger;

	for (var i = 0; i < attributesToStrip.length; i++) {

	}
}

module.exports = svgToSymbol;
