import Ember from 'ember';
import Constants from 'wedding-gallery/constants';

export default Ember.Route.extend({
  model: function(params) {
      let token = localStorage.getItem('api_token');
      let photo_list_url = Constants.SERVER_URL + 'api/photos/';
      photo_list_url += '?';
      photo_list_url += 'event_id=' + params.event_id;
      photo_list_url += '&';
      photo_list_url += 'page_size=20';
      photo_list_url += '&';
      photo_list_url += 'only_visible=true';

      this.set('event_id',params.event_id)

      return Ember.$.ajax({
        url: photo_list_url,
        method: "get",
        contentType: 'application/json',
        beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Token ' + token);},
      });
  },

  afterModel: function() {
      const token = localStorage.getItem('api_token');
      const event_list_url = Constants.SERVER_URL + 'api/events-metadata/';
      let that = this;

      Ember.$.ajax({
        url: event_list_url,
        method: "get",
        contentType: 'application/json',
        beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Token ' + token); },
      }).then(function(response){
        for(var i = 0; i < response.length; i++){
          if( response[i].id == that.event_id ){
            that.controller.set('title', response[i].name);
            document.title = response[i].name;
            that.controller.set('icon', response[i].icon);
            return;
          }
        }
      });

  },


  activate: function() {
      document.title = 'Photo Gallery'
  },
});
