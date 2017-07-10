import Ember from 'ember';
import Constants from 'wedding-gallery/constants';


export default Ember.Route.extend({
  activate: function() {
      document.title = "Photo Gallery: Event List";
  },

  beforeModel: function() {
      let token = localStorage.getItem("api_token");
      if( !( typeof token === 'string' && token.length > 3 ) ) {
          // we are in trouble!
          this.transitionTo('/');
      }
  },

  model: function() {
      let token = localStorage.getItem('api_token');
      let event_list_url = Constants.SERVER_URL + 'api/events-metadata/';

      return Ember.$.ajax({
        url: event_list_url,
        method: "get",
        contentType: 'application/json',
        beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Token ' + token); },
      }).catch(function(error) {
          if(error.status == 403){
              alert("Authenification problem, resetting user.");
              localStorage.setItem("api_token", '');
              this.transitionTo('/');
              return;
          }
          // other errors are handled elsewhere
          throw error;
      });
  },

});
