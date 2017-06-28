import Ember from 'ember';
import Constants from 'wedding-gallery/constants';

export default Ember.Route.extend({
  model: function(params) {
      let token = localStorage.getItem('api_token');
      let event_list_url = Constants.SERVER_URL + 'api/photos/';
      event_list_url += '?';
      event_list_url += 'event_id=' + params.event_id;
      event_list_url += '&';
      event_list_url += 'page_size=20';

      return Ember.$.ajax({
        url: event_list_url,
        method: "get",
        contentType: 'application/json',
        beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Token ' + token);},
      });
  },

  activate: function() {
      document.title = "YY's Wedding Gallery";
  },
});
