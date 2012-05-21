var GitHub = function () {
};

GitHub.prototype = {
    gists:function (id, callback) {
        $.ajax("https://api.github.com/gists/" + id).success(function (json) {
            callback(json);
        });
    },
    notifications:function (callback) {
        $.ajax("https://github.com/inbox/notifications").success(function (html) {
            var $html = $(html);
            var countElement = $html.find("##notifications .unread_count");
            var count = countElement.text();
            console.log("count:" + count);
            callback(count);
        });
    }
};