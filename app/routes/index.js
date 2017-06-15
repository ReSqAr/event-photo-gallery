import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
      return Ember.$.getJSON('https://hochzeit.yhjz.de/api/visiblephotos/');
  },
});
