'use strict';

var cheerio = require('cheerio');
var merge = require('merge');

var svgToSymbol = require('./utils/svg-to-symbol');

// var ATTRIBUTE_ID = 'id';
// var ATTRIBUTE_VIEW_BOX = 'viewBox';

var SELECTOR_DEFS = 'defs';
var SELECTOR_SVG = 'svg';

var TEMPLATE_SVG = '<svg xmlns="http://www.w3.org/2000/svg"><defs/></svg>';
// var TEMPLATE_SYMBOL = '<symbol/>';
var TEMPLATE_DOCTYPE = '<?xml version="1.0" encoding="UTF-8"?>' +
	'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ' +
	'"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

var DEFAULT_OPTIONS = {
    stripAttributes: false
};

function load(text) {
	return cheerio.load(text, {xmlMode: true});
}

function svgstore(options) {
	debugger;
    var optionsForInstance = options || {};
    optionsForInstance = merge({}, DEFAULT_OPTIONS, optionsForInstance);

	var parent = load(TEMPLATE_SVG);
	var parentSvg = parent(SELECTOR_SVG);
	var parentDefs = parent(SELECTOR_DEFS);

	return {
		element: parent,
        options: optionsForInstance,

		add: function (id, file, optionsForFile) {
			debugger;
			optionsForFile = optionsForFile || {};
			optionsForFile = merge({}, optionsForInstance, optionsForFile);

			debugger;
			var child = load(file);
			var childSvg = child(SELECTOR_SVG);
			var childDefs = child(SELECTOR_DEFS);

			// merge <defs/>
			parentDefs.append(childDefs.contents());
			childDefs.remove();

			// var symbol = child(TEMPLATE_SYMBOL);

			// // clone <svg/> as <symbol/>
			// symbol.attr(ATTRIBUTE_ID, id);
			// symbol.attr(ATTRIBUTE_VIEW_BOX, childSvg.attr(ATTRIBUTE_VIEW_BOX));
			// symbol.append(childSvg.contents());

			var symbol = svgToSymbol(id, childSvg, optionsForFile);


			// append <symbol/>
			parentSvg.append(symbol);

			return this;
		},

		toString: function (options) {
			var xml = parent.xml();
			var inline = options && options.inline;

			if (!inline) {
				return TEMPLATE_DOCTYPE + xml;
			}

			return xml;
		}
	};
}

module.exports = svgstore;
