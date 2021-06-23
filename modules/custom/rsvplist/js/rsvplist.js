/**
 * @file
 * Contains JS function for rsvplist form
 */

(function ($, Drupal, drupalSettings) {
    'use strict';
    Drupal.behaviors.rsvplist_datalayer = {
        attach: function (context, settings) {
            $('document').ready(
                function () {
                    $("#edit-submit").once('rsvplist_datalayer').click(function () {
                        alert("Handler for .click() called.");
                        dataLayer.push({ 'event': 'click', "YA ALLAH": "HELP ME", email: $('#edit-email').val() })
                        console.log(dataLayer);
                        return;
                    });
                }
            )

        }
    };
})(jQuery, Drupal, drupalSettings);
