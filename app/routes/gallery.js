import Ember from 'ember';
import Constants from 'wedding-gallery/constants';

export default Ember.Route.extend({
    activate: function() {
        document.title = 'Photo Gallery'
    },

    beforeModel: function() {
      let token = localStorage.getItem("api_token");
      if( !( typeof token === 'string' && token.length > 3 ) ) {
        // we are in trouble!
        this.transitionTo('/');
      }
    },

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
        const event_metadata_url = Constants.SERVER_URL + 'api/single-event-metadata/' + this.event_id;
        let that = this;

        Ember.$.ajax({
          url: event_metadata_url,
          method: "get",
          contentType: 'application/json',
          beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Token ' + token); },
        }).then(function(response){
            if( response.id != that.event_id || !response.has_access ){
              // we are in trouble!
              that.transitionTo('event-auth',that.event_id);
            }
            that.controller.set('title', response.name);
            document.title = response.name;
            that.controller.set('icon', response.icon);
        });
    },
});
