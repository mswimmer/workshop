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
var settings = require('settings/root');

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
});

duality_events.on('afterResponse', function(x,y) {
    db.current().getView(settings.name, "c_all", function(err, data) {
	if (data.rows.length > 0)
	    $("#all_count").html("<span title=\"Number of participante without the crew\" class=\"tooltip\">Delegates: " + data.rows[0].value + "</span>");
    });
    db.current().getView(settings.name, "c_non_speakers", function(err, data) {
	if (data.rows.length > 0)
	    $("#non_speaker_count").html("<span title=\"Number of non-speakers delegates\" class=\"tooltip\">Non-speakers: " + data.rows[0].value + "</span>");
    });
    db.current().getView(settings.name, "c_speakers", function(err, data) {
	if (data.rows.length > 0)
	    $("#speaker_count").html("<span title=\"Number of speakers\" class=\"tooltip\">Speakers: " + data.rows[0].value + "</span>");
    });
    db.current().getView(settings.name, "c_lightning_speakers", function(err, data) {
	if (data.rows.length > 0)
	    $("#lighting_speaker_count").html("<span title=\"Number of lightning speakers (included in the other counts if appropriate)\" class=\"tooltip\">L-Speakers: " + data.rows[0].value + "</span>");
    });
    db.current().getView(settings.name, "c_crew", function(err, data) {
	if (data.rows.length > 0)
	    $("#crew_count").html("<span title=\"Number of crew not included in delegate count\" class=\"tooltip\">Crew: " + data.rows[0].value + "</span>");
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
