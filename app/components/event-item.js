/* globals md5 */

import Ember from 'ember';

import Constants from 'wedding-gallery/constants';


export default Ember.Component.extend({
  editMode: false,
  challenge: '',

  actions: {
    showChallenge(event) {
      this.set('editMode', true);
    },

    cancel(){
      this.set('editMode', false);
    },

    access() {
      const token = localStorage.getItem('api_token');
      const challenge = this.challenge;

      let hashed_challenge = md5(token + "$" + challenge);

      let auth_user_data = { hashed_challenge: hashed_challenge }
      let auth_user_url = Constants.SERVER_URL + 'api/authenticate_user_for_event/' + this.item.id;

      let that = this;
      Ember.$.ajax({
        url: auth_user_url,
        method: "post",
        contentType: 'application/json',
        data: JSON.stringify(auth_user_data),
        beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Token ' + token); },
      }).then(function(response) {
        that.attrs.transitionToGallery();
      });
    },
  },

});
