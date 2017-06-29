import Ember from 'ember';
import EmberValidations from 'ember-validations';

import Constants from 'wedding-gallery/constants';


export default Ember.Controller.extend(EmberValidations, {
    title: Ember.computed('model', function() {
        return this.get('model.name');
    }),

    icon: Ember.computed('model', function() {
        return this.get('model.icon');
    }),

    event_id: Ember.computed('model', function() {
        return this.get('model.id');
    }),

    comment: '',
    file: '',


    actions: {
        upload: function() {
            const token = localStorage.getItem('api_token');

            const form_files = Ember.$('#file-field')[0].files;
            const comment = this.comment;
            const event_id = this.get('event_id');

            if( form_files.length < 1 ) {
                alert("Please select a file.");
                return;
            }

            this.set('file','');
            this.set('comment','');

            for( let i = 0; i < form_files.length; i++ ) {
              const form_file = form_files[i];
              const upload_url = Constants.SERVER_URL + 'api/photos/';
              let upload_form = new FormData();
              upload_form.append("event", event_id);
              upload_form.append("comment", comment);
              upload_form.append("hash_md5", "!IGNORE!");
              upload_form.append("visible", true);
              upload_form.append("photo", form_file);

              let that = this;
              Ember.$.ajax({
                url: upload_url,
                method: "post",
                cache: false,
                contentType: false,
                processData: false,
                data: upload_form,
                beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Token ' + token); },
              }).then(function() {
                /* success message? */
              }).catch(function() {
                  alert("Upload failed for " + form_file.name + ".");
              });
            }
        },

        backToGallery: function() {
            this.replaceRoute('gallery', this.get('event_id'));
        }
    },
});


