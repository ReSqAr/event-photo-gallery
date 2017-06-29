import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('event-overview');
  this.route('event-auth', { path: '/event-auth/:event_id' });
  this.route('gallery', { path: '/gallery/:event_id' });
});

export default Router;
