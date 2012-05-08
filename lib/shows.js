/**
 * copyright 2012 Morton Swimmer (and others)
 * and released under the MIT license.
 *
 * Show functions to be exported from the design doc.
 */

var templates = require('duality/templates');
var forms = require('couchtypes/forms');
var types = require('./types');

// Show the start page
exports.start = function (doc, req) {
    return {
	title: 'Home',
	content: templates.render('start.html', req, {
	    nav: 'Home'
	})
    };
};

// Show add a delegate form
exports.add_delegate = function (doc, req) {
    // New form
    var form = new forms.Form(types.delegate, null, {
        exclude: ['timestamp', 'orig_id', 'deleted', 'print_count']
    });

    // render the markup for a add form
    var content = templates.render('add_delegate.html', req, {
        form_title: 'Add new delegate',
	form: form.toHTML(req)
    });

    // return the title and the rendered form
    return {
	title: 'Add new delegate',
	content: content
    };
};

// Show change a delegate form
exports.change_delegate = function (doc, req) {
    var cid = encodeURIComponent(doc._id);
    doc._id = cid;
    // New form populated with values from the doc that should be changed
    var form = new forms.Form(types.delegate, doc, {
    	exclude: ['timestamp']
    });

    // render the markup for a change form
    var content = templates.render('change_delegate.html', req, {
    	form_title: 'Change delegate',
	form: form.toHTML(req)
    });
	
    // return the title and the rendered form
    return {
	title: 'Change delegate',
	content: content
    };
};

exports.del_delegate = function (doc, req) {
    return {
	title: 'Deletion of ' + doc.lastname + ", " + doc.firstname + ' performed',
	content: templates.render('del_delegate.html', req, doc)
    };
};

// Show one delegate
exports.delegate = function (doc, req) {
    return {
        title: doc.lastname + ", " + doc.firstname,
        content: templates.render('delegate.html', req, doc)
    };
};

// Show one badge
exports.badge = function (doc, req) {
    if (!doc.badgename)
	doc.badgename = doc.firstname + " " + doc.lastname

    return {
        title: doc.badgename,
        content: templates.render('badge.html', req, doc)
    };
};

// Show the loginok page
exports.loginok = function (doc, req) {
    return {
	title: 'Login performed',
	content: templates.render('loginok.html', req, {})
    };
};

// Show the logoutok page
exports.logoutok = function (doc, req) {
    return {
	title: 'Logout performed',
	content: templates.render('logoutok.html', req, {})
    };
};

// Show login form
exports.login = function (doc, req) {
    // New form
    var form = new forms.Form(types.login, null, {});
    
    // render the markup for a login form
    var content = templates.render('login.html', req, {
        form_title: 'Login',
	form: form.toHTML(req)
    });

    // return the title and the rendered form
    return {
	title: 'Login',
	content: content
    };
};

/*exports.time_slot = function(doc, req) {

    var form = new forms.Form(types.time_slot, null, {});

    var content = templates.render('time_slot.html', req, {
        form_title: 'Time Slot',
	form: form.toHTML(req)
    });

    // return the title and the rendered form
    return {
	title: 'Time slot',
	content: content
    };
};
*/
exports.not_found = function (doc, req) {
    return {
        title: '404 - Not Found',
        content: templates.render('404.html', req, {})
    };
};

