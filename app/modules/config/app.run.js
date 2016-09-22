function AppRun($window, AppConstants) {
  'ngInject';

  $window.fbAsyncInit = function() {
    // Executed when the SDK is loaded
    FB.init({
      appId: AppConstants.facebookAppId,
      channelUrl: '',
      status: true,
      cookie: true,
      xfbml: true
    });
  };

  (function(d){
    // load the Facebook javascript SDK

    var js,
      id = 'facebook-jssdk',
      ref = d.getElementsByTagName('script')[0];

    if (d.getElementById(id)) {
      return;
    }

    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";

    ref.parentNode.insertBefore(js, ref);

  }(document));
}

export default AppRun;
