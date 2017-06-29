import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        access() {
            this.attrs.access();
        },
    },
});
