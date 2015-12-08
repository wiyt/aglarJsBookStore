bookstore.directive('myBookbox', function() {
    return {
        restrict: 'EA',
        templateUrl: 'templates/bookBox.html',
        replace: true,
        scope: true,
        link: function($scope, iElement, iAttrs) {
            $scope.del = function(bookID) {
                for (var i = 0; i < $scope.books.length; i++) {
                    if (bookID == $scope.books[i].bookID) {
                        $scope.books.splice(i, 1);
                        break;
                    }
                }
            }
        }
    };
});
bookstore.directive('myBooklist', function() {
    return {
        restrict: 'EA',
        templateUrl: 'templates/booklist.html',
        replace: true,
        scope: true,
        link: function($scope, iElement, iAttrs) {
            $scope.del = function(bookID) {
                for (var i = 0; i < $scope.books.length; i++) {
                    if (bookID == $scope.books[i].bookID) {
                        $scope.books.splice(i, 1);
                        break;
                    }
                }
            }
        }
    };
});
