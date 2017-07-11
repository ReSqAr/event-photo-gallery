import Ember from 'ember';

import Constants from 'wedding-gallery/constants';

export default Ember.Component.extend({
  classNames: ['col-md-3', 'col-sm-4', 'col-xs-12'],

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
            event.stopPropagation();

            if( this.get('item.liked_by_current_user') ){
                this.set('item.liked_by_current_user', false);
                this.set('item.likes', this.get('item.likes') - 1);
            } else {
                this.set('item.liked_by_current_user', true);
                this.set('item.likes', this.get('item.likes') + 1);
            }

            let that = this;
            const token = localStorage.getItem('api_token');
            const like_photo_url = Constants.SERVER_URL + 'api/like-photo/';
            const like_photo_data = {
                photo_id : this.get('item.id'),
                like: this.get('item.liked_by_current_user'),
            }

            Ember.$.ajax({
              url: like_photo_url,
              method: "post",
              contentType: 'application/json',
              data: JSON.stringify(like_photo_data),
              beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Token ' + token); },
            }).then(function(response) {
                that.set('item.likes', response.likes);
            });
        },
    },

});
