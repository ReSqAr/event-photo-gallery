import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['col-md-3','col-sm-6', 'col-xs-12'],

  truncatedComment: Ember.computed('item.comment', function() {
        const comment = this.get('item.comment');
        if( comment.length > 70 ) {
            return comment.slice(0,70).trim() + '…';
        } else {
            return comment;
        }
    }),

    actions: {
        liked() {
            this.set('item.likes', this.get('item.likes') + 1);
            event.stopPropagation();
        },
    },

});
