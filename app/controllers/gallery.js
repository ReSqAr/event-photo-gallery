import Ember from 'ember';

export default Ember.Controller.extend({
    photos: Ember.computed('model', function() {
        return this.get('model.photos.results');
    }),

    hasMore: Ember.computed('photos', function() {
        return this.get('photos.next');
    }),

    title: Ember.computed('photos', function() {
        return this.get('model.event.name');
    }),

    icon: Ember.computed('photos', function() {
        return this.get('model.event.icon');
    }),


    actions: {
        more: function() {
            const nextURL = this.get('photos.next');
            const token = localStorage.getItem('api_token');

            if (nextURL) {
                let that = this;

                Ember.$.ajax({
                  url: nextURL,
                  method: "get",
                  contentType: 'application/json',
                  beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Token ' + token); },
                }).then(function(photos) {
                    that.set("photos", that.get("photos").concat(photos.results) );
                    that.set("photos", photos);
                });
            }
        },

        upload: function(){
            this.transitionToRoute('upload', this.get("model.event.id"));
        },
    },
});
