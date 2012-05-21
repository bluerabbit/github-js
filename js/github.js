var GitHub = function () {
};

GitHub.prototype = {
    gists:function (id, callback) {
        $.ajax("https://api.github.com/gists/" + id).success(function (json) {
            callback(json);
        });
    }
};