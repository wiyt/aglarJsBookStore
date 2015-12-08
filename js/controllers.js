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

bookstore.controller('listCtrl', ['$scope', 'getJsonService', function($scope, getJsonService) {
    getJsonService.get('books.json')
        .then(
            function(response) {
                $scope.books = response.data.books;
            },
            function(response) {
                console.log('获取books.json失败！');
            });
}]);

bookstore.controller('formCtrl', function($scope, $state, $stateParams, getJsonService) {
    var bookList = [];
    $scope.book = {};
    var bookIndex = 0;
    getJsonService.get('books.json')
        .then(
            function(response) {
                bookList = response.data.books;

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
            },
            function(response) {
                console.log('获取books.json失败！');
            });
    getJsonService.get('publish.json')
        .then(
            function(response) {
                $scope.publishs = response.data.publishs;
            },
            function(response) {
                console.log('get publish.json error!');
            });

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

bookstore.controller('bookDetailCtrl', function($scope, $stateParams, getJsonService) {
    var bookID = $stateParams.bookID;
    var bookList = [];
    getJsonService.get('books.json')
        .then(
            function(response) {
                bookList = response.data.books;
                getBookDetail(bookID, bookList);
            },
            function(response) {
                console.log("失败");
            });

    function getBookDetail(bookID, bookList) {
        for (var i = 0; i < bookList.length; i++) {
            if (bookID == bookList[i].bookID) {
                $scope.book = bookList[i];
                $scope.bookIntro = bookList[i].intro;
            }
        }
    }

});


bookstore.controller('mainCtrl', function($scope) {
    $scope.isShow = true;
    $scope.change = function() {
        $scope.isShow = !$scope.isShow;
        console.log($scope.isShow);
    }
});
