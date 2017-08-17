var express = require('express');
var hbs = require('express-hbs');
var app = express();
var fortune = require('./lib/fortune.js');

app.set('port', process.env.PORT || 3000);

app.engine('hbs', hbs.express4({
    defaultLayout: __dirname + '/views/layouts/main'
}));

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('home');
});

app.get('/about', function(req, res){
    var fortune = require('./lib/fortune.js');
    res.render('about', { fortune: fortune.getFortune() });
});

app.use(function (req, res) {
    res.status('404');
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status('500');
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + 
        app.get('port') + '; press Ctrl+C to terminate');
}); 