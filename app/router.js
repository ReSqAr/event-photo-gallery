import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('gallery', { path: '/gallery/:event_id' });
  this.route('event-overview');
});

export default Router;
