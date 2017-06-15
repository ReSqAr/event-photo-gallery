import Ember from 'ember';

export default Ember.Controller.extend({
  results: Ember.computed('model', function() {
    return this.get('model');
  }),

  hasNext: Ember.computed('results', function() {
    return this.get('results.next');
  }),

  hasPrevious: Ember.computed('results', function() {
    return this.get('results.previous');
  }),

  actions: {
    next: function() {
      const nextURL = this.get('results.next');
      if (nextURL) {
        let that = this;
        Ember.$.getJSON(nextURL).then(function(ret) {
          that.set("results",ret);
        });
      }
    },
    previous: function() {
      const previousURL = this.get('results.previous');
      if (previousURL) {
        let that = this;
        Ember.$.getJSON(previousURL).then(function(ret) {
          that.set("results",ret);
        });
      }
    },
  }
});
