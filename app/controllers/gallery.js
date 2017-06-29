import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['sort_order'],
    sort_order: 'uploaded',

    is_sort_order_upload: Ember.computed('sort_order', function() {
        return this.get('sort_order') != "created" && this.get('sort_order') != "likes";
    }),
    is_sort_order_created: Ember.computed('sort_order', function() {
        return this.get('sort_order') == "created";
    }),
    is_sort_order_likes: Ember.computed('sort_order', function() {
        return this.get('sort_order') == "likes";
    }),


    lastResponse: Ember.computed('model.photos', 'additionalResponse', function() {
        if( this.get('additionalResponse') ){
            return this.get('additionalResponse');
        } else {
            return this.get('model.photos');
        }
    }),

    additionalResponse: null,

    photos: Ember.computed('model.photos', 'accumulatedAdditionalPhotos', function() {
        return this.get('model.photos.results').concat(this.get("accumulatedAdditionalPhotos"));
    }),

    accumulatedAdditionalPhotos: [],

    hasMore: Ember.computed('lastResponse', function() {
        return this.get('lastResponse.next');
    }),

    title: Ember.computed('model.event', function() {
        return this.get('model.event.name');
    }),

    icon: Ember.computed('model.event', function() {
        return this.get('model.event.icon');
    }),

    event_id: Ember.computed('model.event', function() {
        return this.get('model.event.id');
    }),


    actions: {
        more: function() {
            const nextURL = this.get('lastResponse.next');
            const token = localStorage.getItem('api_token');

            if (nextURL) {
                let that = this;

                Ember.$.ajax({
                  url: nextURL,
                  method: "get",
                  contentType: 'application/json',
                  beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Token ' + token); },
                }).then(function(response) {
                    that.set("accumulatedAdditionalPhotos", that.get("accumulatedAdditionalPhotos").concat(response.results) );
                    that.set("additionalResponse", response);
                });
            }
        },

        upload: function(){
            this.transitionToRoute('upload', this.get("event_id"));
        },
    },
});
