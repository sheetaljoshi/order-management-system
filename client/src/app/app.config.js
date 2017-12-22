export default function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('greeting', {
            url: '/',
            component: 'greeting'
        });

    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/');
}

