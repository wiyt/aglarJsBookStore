bookstore.factory('getJsonService', ['$http', function($http) {
    var getJson = function(path) {
        return $http({
            method: 'GET',
            url: path,
            cache: true //对get请求进行缓存
        });
    };
    return {
        get: function(path) {
            return getJson(path)
        }
    };
}]);
