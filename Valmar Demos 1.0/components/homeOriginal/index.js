'use strict';

app.home = kendo.observable({
    onShow: function () {},
    afterShow: function () {}
});

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_home
(function (parent) {
    var provider = app.data.probaDeLaNavegacion,
        mode = 'signin',
        registerRedirect = 'home',
        signinRedirect = 'editableListView',
        init = function (error) {
            console.log("init->mode: " + mode);
            if (error) {
                if (error.message) {
                    alert(error.message);
                }
                return false;
            }

            var activeView;
            switch (mode) {
                case 'signin':
                    activeView = '.signin-view';
                    break;
                case 'reset-view':
                    activeView = '.reset-view';
                    break;
                case 'logout-view':
                    activeView = '.logout-view';
                    break;
                default:
                    activeView = '.signup-view';
                    break;
            }

            // var activeView = mode === 'signin' ? '.signin-view' : '.signup-view';
            if (provider.setup && provider.setup.offlineStorage && !app.isOnline()) {
                $('.offline').show().siblings().hide();
                // alert("offline");
            } else {
                $(activeView).show().siblings().hide();
                // alert("activeView");
            }
        },
        successHandler = function (data) {
            console.log("successHandler->mode: " + mode);
            var redirect = mode === 'signin' ? signinRedirect : registerRedirect;

            if (data && data.result) {
                app.user = data.result;
                setTimeout(function () {
                    mode == "logout-view" ? init() : app.mobileApp.navigate('components/' + redirect + '/view.html');
                    app.mobileApp.navigate('components/' + redirect + '/view.html');
                }, 0);
            } else {
                init();
            }
        },
        homeModel = kendo.observable({
            displayName: '',
            email: '',
            password: '',
            validateData: function (data) {
                console.log("validateData->mode: " + mode);
                if (!data.email) {
                    alert('Missing email');
                    return false;
                }

                if (!data.password && mode != "reset-view") {
                    alert('Missing password');
                    return false;
                }

                return true;
            },
            signin: function () {
                console.log("signin->mode: " + mode);
                var model = homeModel,
                    email = model.email.toLowerCase(),
                    password = model.password;

                if (!model.validateData(model)) {
                    return false;
                }
                provider.Users.login(email, password, successHandler, init);
            },
            register: function () {
                console.log("register->mode: " + mode);
                var model = homeModel,
                    email = model.email.toLowerCase(),
                    password = model.password,
                    displayName = model.displayName,
                    attrs = {
                        Email: email,
                        DisplayName: displayName
                    };

                if (!model.validateData(model)) {
                    return false;
                }

                provider.Users.register(email, password, attrs, successHandler, init);
            },
            logout: function () {
                // console.log("logout->mode: " + mode);
                // mode = "signin";
                // $('#signin-form')[0].reset();
                // console.log(app.user.IsVerified);
                // provider.Users.login("", "", "", "");
                // console.log(app.user.IsVerified);

                provider.authentication.logout(function () {
                    alert("Logout successful!");
                }, function (err) {
                    alert("Failed to logout: " + err.message);
                });
                mode = "signin";
                init();
            },
            reset: function () {
                // console.log("reset->mode: " + mode);
                // var model = homeModel,
                //     email = model.email.toLowerCase(),
                //     password = "pass",
                //     displayName = "name",
                //     attrs = {
                //         Email: email,
                //         DisplayName: displayName
                //     };

                // if (!model.validateData(model)) {
                //     return false;
                // }
                // console.log(provider.setup.apiKey);
                // $.ajax({
                //     type: "POST",
                //     url: "https://api.everlive.com/v1/" + provider.setup.apiKey + "/Users/resetpassword",
                //     contentType: "application/json",
                //     data: JSON.stringify({
                //         Email: this.email
                //     }),
                //     success: function () {
                //         navigator.notification.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
                //         // window.location.href = "#login";
                //         mode = 'signin';
                //         init();
                //     },
                //     error: function () {
                //         navigator.notification.alert("Unfortunately, an error occurred resetting your password.")
                //     }
                // });

                var username = $("#emailReset").val(); // the actual Username
                var user = {
                    Username: username
                };
                provider.Users.resetPassword(user, function () {
                    mode = "signin";
                    init();
                    alert("Se envió la solicitud a su correo electrónico");
                }, function (err) {
                    alert("Failed to request a password reset email: " + err.message);
                })

            },
            toggleView: function () {
                console.log("toggleView->mode: " + mode);
                mode = mode === 'signin' ? 'register' : 'signin';
                init();
            },
            toggleReset: function () {
                console.log("toggleReset->mode: " + mode);
                mode = 'reset-view';
                init();
            }
        });

    parent.set('homeModel', homeModel);
    parent.set('afterShow', function () {
        // app.user.IsVerified==true?mode="logout-view":mode="logout-view";
        app.user ? mode = "logout-view" : mode = "signin";
        provider.Users.currentUser().then(successHandler, init);
    });

    
})(app.home);
// START_CUSTOM_CODE_homeModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_homeModel