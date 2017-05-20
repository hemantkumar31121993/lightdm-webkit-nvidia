var login = (function (lightdm, $) {
    var selected_user = null;
    var password = null
    var $user = $('#user');
    var $pass = $('#pass');

    // private functions
    var setup_users_list = function () {
        var $list = $user;
        var to_append = null;
        $.each(lightdm.users, function (i) {
            var username = lightdm.users[i].name;
            var dispname = lightdm.users[i].display_name;
            $list.append(
                '<option value="' +
                username +
                '">' +
                dispname +
                '</option>'
            );
        });
		if(lightdm.num_users <= 1) {
			$user.css("background-image", "none");
		}
    };
    var select_user_from_list = function (idx) {
        var idx = idx || 0;

		//console.log("selected user: "+idx);

        find_and_display_user_picture(idx);
		//console.log("lightdm._username: "+lightdm._username);
        if(lightdm._username){
            lightdm.cancel_authentication();
        }

        selected_user = lightdm.users[idx].name;
        if(selected_user !== null) {
            window.start_authentication(selected_user);
        }

        $pass.trigger('focus');
    };
    var find_and_display_user_picture = function (idx) {
        $('.profile-img').attr(
            'src',
            lightdm.users[idx].image
        );
    };

	var remind_wrong_secret = function (idx) {
		var idx = idx || 0;
		select_user_from_list(idx);
		$pass.addClass("incorrect-secret");
		$pass.val('');
		//$pass.select();
	};

    // Functions that lightdm needs
    window.start_authentication = function (username) {
        lightdm.cancel_timed_login();
        lightdm.start_authentication(username);
    };
    window.provide_secret = function () {
        password = $pass.val() || null;

        if(password !== null) {
            lightdm.provide_secret(password);
        }
    };
    window.authentication_complete = function () {
        if (lightdm.is_authenticated) {
            show_prompt('Logged in');
            lightdm.login(
                lightdm.authentication_user,
                lightdm.default_session
            );
        } else {
			remind_wrong_secret(idx_current_user);
			idx_current_user = null;
		}
    };
    // These can be used for user feedback
    window.show_error = function (e) {
        console.log('Error: ' + e);

    };
    window.show_prompt = function (e) {
        console.log('Prompt: ' + e);
    };

	var idx_current_user = null;

    // exposed outside of the closure
    var init = function () {
        $(function () {
            setup_users_list();
            select_user_from_list();

            $user.on('change', function (e) {
                e.preventDefault();
                idx_current_user = e.currentTarget.selectedIndex;
                select_user_from_list(idx_current_user);
				$pass.removeClass("incorrect-secret");
				$pass.val('');
            });

            $('form').on('submit', function (e) {
                e.preventDefault();
                if($pass.val() !== '') {
					window.provide_secret();
					/*if(lightdm.is_authenticated !== true) {
						remind_wrong_secret(idx);
					}*/
				}
            });
        });
    };

    return {
        init: init
    };
} (lightdm, jQuery));

var assert = {
	assertCaller : {caller: false, object: false}, /* 1: shutdown, 2: restart */
	shutdownAssert:"<div id='assert-block'><div class='confirm' onclick='javascript: assert.confirmShutdown()'>Confirm Shutdown</div><div class='deny' onclick='javascript: assert.denyAction()'>Deny</div></div>",
	
	restartAssert:"<div id='assert-block'><div class='confirm' onclick='javascript: assert.confirmRestart()'>Confirm Restart</div><div class='deny' onclick='javascript: assert.denyAction()'>Deny</div></div>",
	
	shutdown : function (o) {
		if(this.assertCaller.caller) {
			this.assertCaller.object.removeClass("active");
			$("#assert-block").remove();
			
			if(this.assertCaller.caller == 1) {
				this.assertCaller.caller = false;
				this.assertCaller.object = false;
				//console.log("switch off the shutdown button");
			}
			else {
				this.assertCaller.caller = 1;
				this.assertCaller.object = $(o);
				$(o).addClass("active");
				$('body').append(this.shutdownAssert);
				$("#assert-block").css({bottom: $(o).height(), left: $(o).offset().left});
			}
		}
		else {
			$("#assert-block").remove();
			this.assertCaller.caller = 1;
			this.assertCaller.object = $(o);
			$(o).addClass("active");
			$('body').append(this.shutdownAssert);
			$("#assert-block").css({bottom: $(o).height(), left: $(o).offset().left});
		}
	},
	
	restart : function (o) {
		if(this.assertCaller.caller) {
			this.assertCaller.object.removeClass("active");
			$("#assert-block").remove();
			
			if(this.assertCaller.caller == 2) {
				this.assertCaller.caller = false;
				this.assertCaller.object = false;
				//console.log("switch off the restart button");
			}
			else {
				this.assertCaller.caller = 2;
				this.assertCaller.object = $(o);
				$(o).addClass("active");
				$('body').append(this.restartAssert);
				$("#assert-block").css({bottom: $(o).height(), left: $(o).offset().left});
			}
		}
		else {
			$("#assert-block").remove();
			this.assertCaller.caller = 2;
			this.assertCaller.object = $(o);
			$(o).addClass("active");
			$('body').append(this.restartAssert);
			$("#assert-block").css({bottom: $(o).height(), left: $(o).offset().left});
		}
	},

	confirmShutdown: function() {
		lightdm.shutdown();
	},

	confirmRestart: function() {
		lightdm.restart();
	},

	denyAction: function() {
		$('#assert-block').remove();
		this.assertCaller.object.removeClass("active");
		this.assertCaller.caller = false;
		this.assertCaller.object = false;
	}
};

login.init();
