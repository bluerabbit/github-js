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
            var count = parseInt($html.find("#notifications .unread_count").text()) || 0;
            var items = [];
            $html.find('#inbox .item.unread').each(function (i, item) {
                var $message = $(item).find('.message');
                items.push({user:$(item).find('.title a').text(),
                            link:$message.find('a.subject').attr('href'),
                            subject:$message.find('a.subject').text(),
                            body:$message.find('a.body').text(),
                            icon:$(item).find('.gravatar img').attr('src')});
            });
            callback({unread_count:count, items:items});
        });
    }
};