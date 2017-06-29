import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        access: function(item) {
            if( item.has_access ){
                // we have already access to this event
                this.transitionToRoute('gallery', item.id);
            } else {
                // we have to ask for access
                this.transitionToRoute('event-auth', item.id);
            }
        },
    },
});
