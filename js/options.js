var Options = function (values, storageKey) {
    this._storageKey = storageKey || 'options';
    values = values || {
        notifications:[], // [{user, user_icon, type(issue/commit), repository, title, link, subject, body}]
        unread_count:0,
        appVersion:'0.0.0.0',
        schemaVersion: 1
    };

    // migration
    // **
    values.unread_count = 0;

    var self = this;
    Object.keys(values).forEach(function (key) {
        self[key] = values[key];
    });
    this.save();
};
Options.prototype = {
    save:function () {
        localStorage[this._storageKey] =
            JSON.stringify(this, function (key, value) {
                if (key.indexOf('_') != 0) {
                    return value;
                }
            });
    },
    reset:function () {
        localStorage.removeItem(this._storageKey);
    }
};

/**
 * @param {String} storageKey ストレージキー.
 * @return {Options} options.
 */
Options.load = function (storageKey) {
    storageKey = storageKey || 'options';
    if (localStorage.hasOwnProperty(storageKey)) {
        return new Options(JSON.parse(localStorage[storageKey]), storageKey);
    }
    return new Options(null, storageKey);
};
