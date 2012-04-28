/**
 * copyright 2012 Morton Swimmer (and others)
 * and released under the MIT license.
 *
 * Kanso document types to export
 */
var Type = require('couchtypes/types').Type;
var fields = require('couchtypes/fields');
var widgets = require('couchtypes/widgets');
var permissions = require('couchtypes/permissions');

exports.delegate = new Type('delegate', {
    // Only logged in users can add, update or remove a delegate record	
    permissions: {
        add:    permissions.loggedIn(),
        update: permissions.loggedIn(),
        remove: permissions.loggedIn()
    },
    fields : { 
	timestamp: fields.string({required: false}),
	orig_id: fields.string({required: false}),
	salutation: fields.string({required: false}),
	title: fields.string({required: false}),
	firstname: fields.string({
	    widget: widgets.textarea({cols: 40, rows: 1}),
	    required: false
        }),
	lastname: fields.string({
	    widget: widgets.textarea({cols: 40, rows: 1}),
	    required: false
        }),
	badgename: fields.string({
	    widget: widgets.textarea({cols: 40, rows: 1}),
	    required: false
        }),
	email: fields.email({required: false}),
	company: fields.string({
	    widget: widgets.textarea({cols: 40, rows: 1}),
	    required: false
        }),
	department: fields.string({
	    widget: widgets.textarea({cols: 40, rows: 1}),
	    required: false
        }),
	address: fields.string({
	    widget: widgets.textarea({cols: 40, rows: 1}),
	    required: false
        }),
	addressext: fields.string({
	    widget: widgets.textarea({cols: 40, rows: 1}),
	    required: false
        }),
	city: fields.string({
	    widget: widgets.textarea({cols: 40, rows: 1}),
	    required: false
        }),
	zipcode: fields.string({required: false}),
	country: fields.string({required: false}),
	letterofinvitation: fields.boolean({required: false}),
	opt_in: fields.boolean({required: false}),
	fee: fields.number({required: false}),
	due: fields.number({required: false}),
	paid: fields.number({required: false}),
	extra_dinner: fields.number({required: false}),
	extra_vegetarian: fields.boolean({required: false}),
	main_vegetarian: fields.boolean({required: false}),
	payment: fields.string({
	    //values: ['XFER', 'PAYPAL'],
	    required: false
        }),
	shirtsize: fields.string({required: false}),
	telephone: fields.string({required: false}),
	fax: fields.string({required: false}),
	cancellationpolicy_ack: fields.string({
            widget: widgets.textarea({cols: 40, rows: 1}),
	    required: false
        }),
	sunday_drinks: fields.boolean({required: false}),
	weihenstephan_tour: fields.boolean({required: false}),
	notes: fields.string({
            widget: widgets.textarea({cols: 40, rows: 5}),
	    required: false
        }),
	speaker: fields.boolean({required: false}),
	lightning_speaker: fields.boolean({required: false}),
	crew: fields.boolean({required: false}),
	print_count: fields.number({required: false})
    }
});

// a login
exports.login = new Type('login', {
    // we need a username and password to login a user
    fields: {
        user: fields.string(),
        pass: fields.string({
	    widget: widgets.password()
        }) 
    }
});
