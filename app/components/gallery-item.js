import Ember from 'ember';

export default Ember.Component.extend({
    truncatedComment: Ember.computed('item.comment', function() {
        const comment = this.get('item.comment');
        if( comment.length > 70 ) {
            return comment.slice(0,70).trim() + '…';
        } else {
            return comment;
        }
    }),
});
