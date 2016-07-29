function AppRun(AppConstants, $rootScope, $window) {
  'ngInject';

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.setPageTitle(toState.title);
  });

  // Helper method for setting the page's title
  $rootScope.setPageTitle = (title) => {
    $rootScope.pageTitle = '';
    if (title) {
      $rootScope.pageTitle += title;
      $rootScope.pageTitle += ' \u2014 ';
    }
    $rootScope.pageTitle += AppConstants.appName;
  };

  $window.fbAsyncInit = function() {
    // Executed when the SDK is loaded
    FB.init({
      appId: '743407799109108',
      /*
       Adding a Channel File improves the performance
       of the javascript SDK, by addressing issues
       with cross-domain communication in certain browsers.
       */
      channelUrl: 'app/channel.html',
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
