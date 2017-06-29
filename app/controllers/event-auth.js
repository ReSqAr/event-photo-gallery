/* globals md5 */

import Ember from 'ember';

import Constants from 'wedding-gallery/constants';


export default Ember.Controller.extend({
    title: Ember.computed('model', function() {
        return this.get('model.name');
    }),

    icon: Ember.computed('model', function() {
        return this.get('model.icon');
    }),

    event_id: Ember.computed('model', function() {
        return this.get('model.id');
    }),

    challenge: '',

    actions: {
        access: function() {
            const token = localStorage.getItem('api_token');
            const challenge = this.challenge;

            const hashed_challenge = md5(token + "$" + challenge.trim().toLowerCase());

            const auth_user_data = { hashed_challenge: hashed_challenge }
            const auth_user_url = Constants.SERVER_URL + 'api/authenticate_user_for_event/' + this.get('event_id');

            let that = this;
            Ember.$.ajax({
              url: auth_user_url,
              method: "post",
              contentType: 'application/json',
              data: JSON.stringify(auth_user_data),
              beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Token ' + token); },
            }).then(function() {
                that.replaceRoute('gallery', that.get('event_id'));
            }).catch(function() {
                alert("Event password is incorrect.");
            });
        },

        cancel: function() {
            this.transitionToRoute('event-overview');
        }
    },
});


