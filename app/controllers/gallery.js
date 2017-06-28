import Ember from 'ember';

export default Ember.Controller.extend({
  response: Ember.computed('model', function() {
    return this.get('model');
  }),

  title: 'Photo List',

  photos: Ember.computed('response', function() {
    return this.get('response.results');
  }),

  hasMore: Ember.computed('response', function() {
    return this.get('response.next');
  }),


  actions: {
    more: function() {
      const nextURL = this.get('response.next');
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
          that.set("response",response);
        });
      }
    },
  },
});
