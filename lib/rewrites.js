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

    // Show delegate
    {from: '/delegate/:id', to: '_show/delegate/:id'},

    //  add a delegate
    {from: '/add_delegate', to: '_update/add_delegate', method: 'POST'},
    {from: '/add_delegate', to: '_show/add_delegate'},

    // Change a delegate
    {from: '/change_delegate/:id', to: '_update/change_delegate/:id', method: 'POST'},
    {from: '/change_delegate/:id', to: '_show/change_delegate/:id'},

    // Delete a delegate
    {from: '/delete/:id', to: '_update/del_delegate/:id', method: 'POST'},
    {from: '/del_delegate/:id', to: '_show/del_delegate/:id'},

    // Undelete the just deleted delegate
    {from: '/undel_delegate/:id', to: '_update/undel_delegate/:id', method: 'POST'},
    // from here we just go back to the delegate page

    // List variations for Delegates
    {from: '/delegates', to: '_list/delegates/by_lastname'},
    {from: '/by_lastname', to: '_list/delegates/by_lastname'},
    {from: '/by_firstname', to: '_list/delegates/by_firstname'},
    {from: '/speakers', to: '_list/delegates/speakers'},
    {from: '/non_speakers', to: '_list/delegates/non_speakers'},
    {from: '/crew', to: '_list/delegates/crew'},
    {from: '/email', to: '_list/delegates/by_email'},
    {from: '/speakers_email', to: '_list/delegates/by_speakers_email'},
    {from: '/non_speakers_email', to: '_list/delegates/by_non_speakers_email'},

    // display a time slot
//    {from: '/time_slot/:id', to: '_show/time_slot/:id'},

    // add a time slot
//    {from: '/add_time_slot', to: '_update/add_time_slot', method: 'POST'},
//    {from: '/add_time_slot', to: '_show/add_time_slot'},

    // change a time slot
//    {from: '/change_time_slot/:id', to: '_update/change_time_slot/:id', method: 'POST'},
//    {from: '/change_time_slot/:id', to: '_show/change_time_slot/:id'},

    // delete a time slot
//    {from: '/del_time_slot/:id', to: '_update/del_time_slot/:id', method: 'POST'},

    // Show badge
    {from: '/badge/:id', to: '_show/badge/:id'},

    {from: '*', to: '_show/not_found'}
];
