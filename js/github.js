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
                var title = $(item).find('.title').text().replace(/\n/g, '').trim().split(' ');
                title = $.map(title, function (v) { if( v.length > 0){ return v; }}).join(' ');
                items.push({user:$(item).find('.title a:first').text(),
                            userIcon:$(item).find('.gravatar img').attr('src'),
                            type:$(item).find('.title span:first').text(),
                            repository:$(item).find('.title a:last').text(),
                            title:title,
                            link:$message.find('a.subject').attr('href'),
                            subject:$message.find('a.subject').text(),
                            body:$message.find('a.body').text()});
                console.log(items);
            });
            callback({unread_count:count, items:items});
        });
    }
};