import Ember from 'ember';

export default Ember.Controller.extend({
    lastResponse: Ember.computed('model.photos', function() {
        return this.get('model.photos');
    }),

    photos: Ember.computed('model.photos', function() {
        return this.get('model.photos.results');
    }),

    hasMore: Ember.computed('lastResponse', function() {
        return this.get('lastResponse.next');
    }),

    title: Ember.computed('model.event', function() {
        return this.get('model.event.name');
    }),

    icon: Ember.computed('model.event', function() {
        return this.get('model.event.icon');
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
                    that.set("photos", that.get("photos").concat(response.results) );
                    that.set("lastResponse", response);
                });
            }
        },

        upload: function(){
            this.transitionToRoute('upload', this.get("model.event.id"));
        },
    },
});
