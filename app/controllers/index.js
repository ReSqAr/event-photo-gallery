import Ember from 'ember';
import EmberValidations from 'ember-validations';

import Constants from 'wedding-gallery/constants';

export default Ember.Controller.extend(EmberValidations, {
    username: '',

    validations: {
        username: {
            length: { minimum: 3, maximum: 32}
        }
    },


    actions: {
        signUp: function() {
            let that = this;
            const username = this.get('username');

            let create_user_data = { "name": username }
            let create_user_url = Constants.SERVER_URL + 'api/create-user/';

            Ember.$.ajax({
              url: create_user_url,
              method: "post",
              contentType: 'application/json',
              data: JSON.stringify(create_user_data)
            }).then(function(response) {
                let token = response.token;
                if(token){
                    localStorage.setItem("api_token", token);
                    that.replaceRoute("event-overview");
                }
            });
        },
    },
});
