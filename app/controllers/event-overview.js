import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    transitionToGallery: function(event_id) {
      this.transitionToRoute('gallery', event_id);
    },
  },
});


