import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
      return Ember.$.getJSON('https://hochzeit.yhjz.de/api/visiblephotos/?page_size=48');
  },

  activate: function() {
      document.title = "YY's Wedding Gallery";
  },


});
