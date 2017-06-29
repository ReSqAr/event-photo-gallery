import Ember from 'ember';
import InViewportMixin from 'ember-in-viewport';

export default Ember.Component.extend(InViewportMixin, {
    didEnterViewport : function() {
        //console.log('entered');
        //call the onLoadMore property to invoke the passed in action
        this.attrs.loadMore();
    },

    actions: {
        loadMore() {
            //call the onLoadMore property to invoke the passed in action
            this.attrs.loadMore();
        },
    },
});
