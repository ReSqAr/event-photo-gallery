import Ember from 'ember';
import Constants from 'wedding-gallery/constants';

export default Ember.Route.extend({
    activate: function() {
        document.title = 'Photo Gallery'
    },

    queryParams: {
        sort_order: {
            refreshModel: true // refresh when sort order changes
        }
    },

    beforeModel: function(transition) {
        if( "api_token" in transition.queryParams ){
            const token = transition.queryParams.api_token;
            if( token.length > 3 )
                localStorage.setItem("api_token", token);
        }


        let token = localStorage.getItem("api_token");
        if( !( typeof token === 'string' && token.length > 3 ) ) {
              // we are in trouble!
              this.transitionTo('/');
        }
    },

    model: function(params) {
        this.set('event_id', params.event_id)

        const token = localStorage.getItem('api_token');
        let photo_list_url = Constants.SERVER_URL + 'api/photos/';
        photo_list_url += '?';
        photo_list_url += 'event_id=' + params.event_id;
        photo_list_url += '&';
        photo_list_url += 'page_size=20';
        photo_list_url += '&';
        photo_list_url += 'only_visible=true'
        photo_list_url += '&';
        photo_list_url += 'sort_order=' + params.sort_order;

        const event_metadata_url = Constants.SERVER_URL + 'api/single-event-metadata/' + params.event_id;

        return Ember.RSVP.hash({
            'photos': Ember.$.ajax({
                  url: photo_list_url,
                  method: "get",
                  contentType: 'application/json',
                  beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Token ' + token);},
                }),
            'event':  Ember.$.ajax({
                  url: event_metadata_url,
                  method: "get",
                  contentType: 'application/json',
                  beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Token ' + token); },
                })
        });
    },

    afterModel: function(model) {
        const event = model.event;
        if( !event || event.id != this.event_id || !event.has_access ){
            // we are in trouble!
            this.transitionTo('event-auth', this.event_id);
        }

        document.title = event.name;
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        controller.set('additionalResponse', null);
        controller.set('accumulatedAdditionalPhotos', []);
    },

});
