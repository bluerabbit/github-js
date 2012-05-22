module('GitHub.js', {
	setup: function() {
        this.github = new GitHub();
	},
	teardown: function() {
	}
});

test('gists', function() {
    this.github.gists(1, function (json) {
        console.log(json);
        ok(json != null);
    });
});

test('notifications', function() {
    this.github.notifications(function (hash) {
        console.log(hash);
        ok(hash != null);
    });
});

