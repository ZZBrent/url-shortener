var cool = require('cool-ascii-faces');
var express = require('express');
var googl = require('goo.gl');
var url;

var app = express();

googl.setKey('AIzaSyBBIqXKddRBN44YkuO8S8OxZGKQbQBTSgo');
googl.getKey();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', function (request, response) {

    response.render('pages/index');

});

app.get('/:url', function (request, response) {
    googl.shorten(request.params.url)
        .then(function (shortUrl) {
            if (shortUrl != 'https://goo.gl/cdKQ') {
                console.log(shortUrl);
                url = shortUrl;
                response.render('pages/url_changer', {
                    finalURL: url
                });
            }
        })
        .catch(function (err) {
            console.error(err.message);
        });
    });


app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});