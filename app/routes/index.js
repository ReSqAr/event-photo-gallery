import Ember from 'ember';


export default Ember.Route.extend({
  beforeModel() {
    let token = localStorage.getItem("api_token");
    if( typeof token === 'string' && token.length > 3 ) {
      this.replaceWith('event-overview'); // Implicitly aborts the on-going transition.
    }
  }
});
