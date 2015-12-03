var bookstore = angular.module('bookstore', ['ui.router']);

bookstore.run(function($rootScope, $state, $stateParams, getJson) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    var promise = getJson.books();
    promise.then(function(date) {
        $rootScope.books = date;
    }, function() {
        console.log("失败");
    })
});

// filter
bookstore.filter('searchBook', function() {
    return function(bookList, keyword) {
        var reg = new RegExp(keyword);
        var output = [];
        for (var i = 0; i < bookList.length; i++) {
            var book = bookList[i];
            if (reg.test(book.name)) {
                output.push(book);
                continue;
            }
            if (reg.test(book.author)) {
                output.push(book);
                continue;
            }
            if (reg.test(book.category)) {
                output.push(book);
                continue;
            }
            if (reg.test(book.publish)) {
                output.push(book);
                continue;
            }
        }
        return output;
    }
});

// 配置路由
bookstore.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'templates/booksContainer.html'
                },
                'bookList@index': {
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
        .state('add', {
            url: '/addBook',
            views: {
                '': {
                    templateUrl: 'templates/form.html'
                }
            }
        })
        .state('edit', {
            url: '/editBookInfo/{bookID:[0-9]{1,4}}',
            views: {
                '': {
                    templateUrl: 'templates/form.html'
                }
            }
        })
});
