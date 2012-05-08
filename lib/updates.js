/**
 * copyright 2012 Morton Swimmer (and others)
 * and released under the MIT license.
 *
 * Update functions to be exported from the design doc.
 */
var templates = require('duality/templates');
var forms = require('couchtypes/forms');
var utils = require('duality/utils');
var db = require('db');
var session = require('session');
var types = require('./types');

// a login is performed
exports.login = function (doc, req) {
    // bind login type to form
    var form = new forms.Form(types.login, null, {});

    // parse the request data and check validation and permission functions
    form.validate(req);	

    // log the user in
    if (form.values.user && form.values.pass) {
	session.login(form.values.user, form.values.pass, function (err) {});
    }

    // redirect user to loginok page
    return [null, utils.redirect(req, '/loginok')];
};

// a logout is performed
exports.logout = function (doc, req) {
    // log the user out
    session.logout();
    
    // redirect user to logoutok page
    return [null, utils.redirect(req, '/logoutok')];
};

// a delegate should be changed
exports.del_delegate = function (doc, req) {
    doc.deleted = true;
    
    db.current().saveDoc(doc, function (err, resp) {});
    return [null, utils.redirect(req, '/del_delegate/'+ encodeURIComponent(doc._id))];
};

// a delegate should be changed
exports.undel_delegate = function (doc, req) {
    doc.deleted = false;
    
    db.current().saveDoc(doc, function (err, resp) {});
    return [null, utils.redirect(req, '/delegate/'+ encodeURIComponent(doc._id))];
};

// a delegate should be added
exports.add_delegate = function (doc, req) {
    // bind delegate type to form
    var form = new forms.Form(types.delegate, null, {
        exclude: ['timestamp', 'orig_id', 'deleted', 'print_count']
    });

    // parse the request data and check validation and permission functions
    form.validate(req);

    if (form.isValid()) {
        // the form is valid, save the document and redirect to the new page
        return [form.values, utils.redirect(req, '/delegate/' + encodeURIComponent(form.values._id))];
    } else {
        // the form is not valid, so render it again with error messages
        var content = templates.render('add_delegate.html', req, {
            form_title: 'Add new delegate',
            form: form.toHTML(req)
        });
        // return null as the first argument so the document isn't saved
        return [
	    null, 
	    {
		content: content, 
		title: 'Add new delegate'
	    }
	];
    }
};

// a delegate should be changed
exports.change_delegate = function (doc, req) {
    // bind delegate type to form
    var form = new forms.Form(types.delegate, doc, {
        exclude: ['timestamp', 'orig_id', 'deleted', 'print_count']
    });
    
    // parse the request data and check validation and permission functions
    form.validate(req);

    if (form.isValid()) {
        // the form is valid, save the document and redirect to the changed page
        return [form.values, 
		utils.redirect(req, '/delegate/' + encodeURIComponent(form.values._id))];
    } else {
        // the form is not valid, so render it again with error messages
        var content = templates.render('change_delegate.html', req, {
            form_title: 'Change delegate',
            form: form.toHTML(req)
        });
        // return null as the first argument so the document isn't saved
        return [null, {content: content, title: 'Change delegate'}];
    }
};

// a time_slot should be added
/*exports.add_time_slot = function (doc, req) {
    // bind time_slot type to form
    var form = new forms.Form(types.time_slot, null, {
        exclude: ['created']
    });

    // parse the request data and check validation and permission functions
    form.validate(req);

    if (form.isValid()) {
        // the form is valid, save the document and redirect to the new page
        return [form.values, utils.redirect(req, '/' + encodeURIComponent(form.values._id))];
    } else {
        // the form is not valid, so render it again with error messages
        var content = templates.render('add_time_slot.html', req, {
            form_title: 'Add new time slot',
            form: form.toHTML(req)
        });
        // return null as the first argument so the document isn't saved
        return [
	    null, 
	    {
		content: content, 
		title: 'Add new time slot'
	    }
	];
    }
};
*/