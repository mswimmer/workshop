/**
 * copyright 2012 Morton Swimmer (and others)
 * and released under the MIT license.
 *
 * Rewrite settings to be exported from the design doc
 */

module.exports = [
    {from: '/static/*', to: 'static/*'},
    {from: '/', to: '_show/start'},

    // Login
    {from: '/login', to: '_update/login', method: 'POST'},
    {from: '/login', to: '_show/login'},
    {from: '/loginok', to: '_show/loginok'},

    // Logout
    {from: '/logout', to: '_update/logout'},
    {from: '/logoutok', to: '_show/logoutok'},

    //  add a delegate
    {from: '/add_delegate', to: '_update/add_delegate', method: 'POST'},
    {from: '/add_delegate', to: '_show/add_delegate'},

    // Delete a phrase
    {from: '/delete/:id', to: '_update/del_delegate/:id', method: 'POST'},

    // List all Delegates
    {from: '/delegates', to: '_list/delegates/by_lastname'},
    {from: '/by_lastname', to: '_list/delegates/by_lastname'},
    {from: '/by_firstname', to: '_list/delegates/by_firstname'},
    {from: '/speakers', to: '_list/delegates/speakers'},
    {from: '/non_speakers', to: '_list/delegates/non_speakers'},
    {from: '/crew', to: '_list/delegates/crew'},
    {from: '/email', to: '_list/delegates/by_email'},

    // Show delegate
    {from: '/:id', to: '_show/delegate/:id'},

    // Show badge
    {from: '/badge/:id', to: '_show/badge/:id'},

    // Change a delegate
    {from: '/change_delegate/:id', to: '_update/change_delegate/:id', method: 'POST'},
    {from: '/change_delegate/:id', to: '_show/change_delegate/:id'},

    {from: '*', to: '_show/not_found'}
];
