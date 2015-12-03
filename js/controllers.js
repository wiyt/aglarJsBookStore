bookstore.controller('searchCtrl', function($scope) {
    $scope.keyword = '';
    $scope.title = '重磅推荐';
    $scope.keywordChange = function() {
        if ($scope.keyword !== '') {
            $scope.title = '搜索结果';
        } else {
            $scope.title = '重磅推荐';
        }
    }
})

bookstore.controller('listCtrl', function($scope, $rootScope, getJson) {
    if ($rootScope.books) {

    } else {
        var promise = getJson.books();
        promise.then(function(date) {
            $rootScope.books = date;
        }, function() {
            console.log("失败");
        })
    }
    $scope.del = function(bookID) {
        for (var i = 0; i < $rootScope.books.length; i++) {
            if (bookID == $rootScope.books[i].bookID) {
                $rootScope.books.splice(i, 1);
                break;
            }
        }
    }
});

bookstore.controller('formCtrl', function($scope, $rootScope, $state, $stateParams, $http) {
    var bookList = $rootScope.books;
    var bookIndex = 0;
    $http({
        method: 'GET',
        url: 'publish.json'
    }).then(function successCallback(response) {
        $scope.publishs = response.data.publishs;
        console.log(response.data.publishs);
    }, function errorCallback(response) {
        console.log('get publish.json error!');
    });
    $scope.book = {};
    if ($stateParams.bookID) {
        var bookId = $stateParams.bookID;
        for (bookIndex; bookIndex < bookList.length; bookIndex++) {
            if (bookId == bookList[bookIndex].bookID) {
                $scope.book = cloneObj(bookList[bookIndex]);
                break;
            }
        }
        $scope.submit = function() {
            bookList[bookIndex] = $scope.book;
            $state.go('index');
        }
    } else {
        $scope.submit = function() {
            $scope.book.bookID = bookList.length + 1;
            bookList.push($scope.book);
            $state.go('index');
        }
    }
    $scope.cancel = function() {
        $state.go('index');
    }

    function cloneObj(oldObj) { //复制对象方法
        if (typeof(oldObj) != 'object') return oldObj;
        if (oldObj == null) return oldObj;
        var newObj = new Object();
        for (var i in oldObj)
            newObj[i] = cloneObj(oldObj[i]);
        return newObj;
    }
});

bookstore.controller('bookDetailCtrl', function($scope, $rootScope, $stateParams, getJson) {
    var bookID = $stateParams.bookID;
    var bookList = [];
    if ($rootScope.books) {
        bookList = $rootScope.books;
        getBookDetail(bookID, bookList)
    } else {
        var promise = getJson.books();
        promise.then(function(date) {
            bookList = date;
            getBookDetail(bookID, bookList);
        }, function() {
            console.log("失败");
        })
    }

    function getBookDetail(bookID, bookList) {
        for (var i = 0; i < bookList.length; i++) {
            if (bookID == bookList[i].bookID) {
                $scope.book = bookList[i];
                $scope.bookIntro = bookList[i].intro;
            }
        }
    }

});


bookstore.controller('mainCtrl', function($scope, $rootScope) {
    $rootScope.isShow = true;
    $scope.change = function() {
        $rootScope.isShow = !$rootScope.isShow;
    }
});
