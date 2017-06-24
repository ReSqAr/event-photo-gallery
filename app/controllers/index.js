import Ember from 'ember';

export default Ember.Controller.extend({
  response: Ember.computed('model', function() {
    return this.get('model');
  }),

  photos: Ember.computed('response', function() {
    return this.get('response.results');
  }),

  hasMore: Ember.computed('response', function() {
    return this.get('response.next');
  }),


  actions: {
    more: function() {
      const nextURL = this.get('response.next');
      if (nextURL) {
        let that = this;
        Ember.$.getJSON(nextURL).then(function(response) {
          that.set("photos", that.get("photos").concat(response.results) );
          that.set("response",response);
        });
      }
    },
  }
});
