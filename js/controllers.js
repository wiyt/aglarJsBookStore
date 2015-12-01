bookstore.controller('deflistCtrl', function($rootScope, getJson) {
    var promise = getJson.books();
    promise.then(function(date) {
        $rootScope.books = date;
    }, function() {
        console.log("失败");
    })
});

bookstore.controller('bookDetail', function($scope, $rootScope, $stateParams, getJson) {
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

});

bookstore.controller('editCtrl', function($scope, $rootScope, $stateParams) {
    var bookList = $rootScope.books;
    getBookDetail(bookID, bookList);
});


function getBookDetail(bookID, bookList) {
    for (var i = 0; i < bookList.length; i++) {
        if (bookID == bookList[i].bookID) {
            $scope.book = bookList[i];
            $scope.bookIntro = bookList[i].intro;
        }
    }
}
