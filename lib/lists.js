/**
 * copyright 2012 Morton Swimmer (and others)
 * and released under the MIT license.
 *
 * List functions to be exported from the design doc.
 */

var templates = require('duality/templates'),
_ = require('underscore');

exports.delegates = function (head, req) {
    start({code: 200, headers: {'Content-Type': 'text/html'}});

    // fetch all the rows
    var row, rows = [];
    while (row = getRow()) {
	row.id = encodeURIComponent(row.id);
        rows.push(row);
    }

    // generate the markup for a list of blog posts
    var content = templates.render('delegates.html', req, {
        rows: rows
    });

    return {title: 'Delegates', content: content};
};
