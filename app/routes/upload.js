import Ember from 'ember';

import Constants from 'wedding-gallery/constants';


export default Ember.Route.extend({
    beforeModel: function() {
        const token = localStorage.getItem("api_token");
        if( !( typeof token === 'string' && token.length > 3 ) ) {
            // we are in trouble!
            this.transitionTo('/');
        }
    },

    model: function(params) {
        const token = localStorage.getItem('api_token');
        const event_metadata_url = Constants.SERVER_URL + 'api/single-event-metadata/' + params.event_id;

        return Ember.$.ajax({
          url: event_metadata_url,
          method: "get",
          contentType: 'application/json',
          beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Token ' + token);},
        });
    },

    afterModel: function(model) {
        if( !model.has_access ){
          // we are in trouble!
           this.transitionTo('event-auth', model.id);
        }

        document.title = model.name + " - Upload";
    },
});
