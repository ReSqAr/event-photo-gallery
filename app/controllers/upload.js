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


    actions: {
        upload: function() {
            const token = localStorage.getItem('api_token');

            const upload_data = {  }
            const upload_url = Constants.SERVER_URL + 'api/photo/';

            let that = this;
            Ember.$.ajax({
              url: upload_url,
              method: "post",
              contentType: 'application/json',
              data: JSON.stringify(upload_data),
              beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Token ' + token); },
            }).then(function() {
                that.replaceRoute('gallery', that.get('event_id'));
            }).catch(function() {
                alert("Event password is incorrect.");
            });
        },

        backToGallery: function() {
            this.replaceRoute('gallery', this.get('event_id'));
        }
    },
});


