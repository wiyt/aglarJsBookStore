bookstore.factory('getJson', function($http, $q) {
    return {
        books: function() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'books.json'
            }).then(function successCallback(response) {
                var books = response.data.books;
                deferred.resolve(books);
            }, function errorCallback(response) {
                deferred.reject('get books.json error!');
            });
            return deferred.promise;
        }
    }
});

