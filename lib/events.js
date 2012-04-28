/**
 * copyright 2012 Morton Swimmer (and others)
 * and released under the MIT license.
 *
 * Bindings to Kanso events
 */

var duality_events = require('duality/events');
var session = require('session');
var templates = require('duality/templates');
var db = require('db');

var design_doc = "workshop";

/**
 * The init method fires when the app is initially loaded from a page rendered
 * by CouchDB.
 */

/**
 * events.on('init', function () {
 *     // app initialization code goes here...
 * });
 */


/**
 * The sessionChange event fires when the app is first loaded and the user's
 * session information becomes available. It is also fired whenever a change
 * to the user's session is detected, for example after logging in or out.
 */

/**
 * events.on('sessionChange', function (userCtx, req) {
 *     // session change handling code goes here...
 * });
 */

session.on('change', function (userCtx, req) {
    if (userCtx.name) {
	$("#session-menu").html("<div id=\"logged-in\">Logged in as " + userCtx.name + "</div>");
    } else {
	$("#session-menu").html("<div id=\"not-logged-in\">Not logged in</div>");
    }
//    db.current().getView(design_doc, "c_all", function(err, data) {
//	if (data.rows.length > 0)
//	    $("#all_count").html("Delegates: " + data.rows[0].value);
//    });
//    db.current().getView(design_doc, "c_non_speakers", function(err, data) {
//	if (data.rows.length > 0)
//	    $("#non_speaker_count").html("Non-speakers: " + data.rows[0].value);
//    });
//    db.current().getView(design_doc, "c_speakers", function(err, data) {
//	if (data.rows.length > 0)
//	    $("#speaker_count").html("<div>Speakers: " + data.rows[0].value + "</div>");
//    });
});

duality_events.on('afterResponse', function(x,y) {
    //TODO it seems wrong to hard code the design doc here
    db.current().getView(design_doc, "c_all", function(err, data) {
	if (data.rows.length > 0)
	    $("#all_count").html("Delegates: " + data.rows[0].value);
    });
    db.current().getView(design_doc, "c_non_speakers", function(err, data) {
	if (data.rows.length > 0)
	    $("#non_speaker_count").html("Non-speakers: " + data.rows[0].value);
    });
    db.current().getView(design_doc, "c_speakers", function(err, data) {
	if (data.rows.length > 0)
	    $("#speaker_count").html("Speakers: " + data.rows[0].value);
    });
});

duality_events.on("sessionChange", function(userCtx, req) {
    return $("#session-menu").html(templates.render("session-menu.html", req, {
	userCtx: userCtx
    }));
});

/**
 * The updateFailure event fires when an update function returns a document as
 * the first part of an array, but the client-side request to update the
 * document fails.
 */

duality_events.on('updateFailure', function (err, info, req, res, doc) {
    alert(err.message || err.toString());
});
