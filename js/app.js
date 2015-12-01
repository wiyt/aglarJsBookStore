var bookstore = angular.module('bookstore', ['ui.router']);

bookstore.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

// 配置路由
bookstore.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'templates/deflist.html'
                }
            }
        })
        .state('detail', {
            url: '/bookID/{bookID:[0-9]{1,4}}',
            views: {
                '': {
                    templateUrl: 'templates/bookdetail.html'
                }
            }
        })
        .state('add',{
            url: '/addBook',
            views: {
                '': {
                    templateUrl: 'templates/form.html'
                }
            }
        })
        .state('edit',{
            url: '/editBookInfo/{bookID:[0-9]{1,4}}',
            views: {
                '':{
                    templateUrl: 'templates/form.html'
                }
            }
        })
});
