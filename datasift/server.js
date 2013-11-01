var express = require('express'),
    app = express(),
    util = require('util'),
    elasticsearch = require('elasticsearch');

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

var DataSift = require('./public/js/index.js');

var options = {
    USERNAME: 'bags307',
    API_KEY: '4f0d856fcca4ad71da034f3d430844c3'
};

var ds = new DataSift(options);

var config = {
    _index : 'abhimanyu',
    _type : 'filter_data',
    timeout : 60000
}


console.log(util.inspect(ds));


app.get('/',function(req,res)
{
    res.render('index.html');
});

app.get('dpu-balance',function(req,res)
{
    ds.core.balance(function(err, data) {
        res.send(data);
    });
});

app.get('/dpu-usage',function(req,res)
{
    ds.core.balance(function(err, data) {
        res.send(data);
    });
})

app.post('/checkEcData', function(req, res) {
    console.log("config-->" + util.inspect(config));
    console.log("req -->" + util.inspect(req.body.data));
    es = elasticsearch(config);
    es.search({
        "query": {
            "query_string": {
                "query": req.body.data
            }
        }

    }, function (err, data) {
        console.log('data-->'+ util.inspect(data));
        res.send(data);
    });
})



app.post('/stream',function(req,res)
{
    console.log(req.body.data.hash);
    ds.core.stream(req.body.data.hash, function(err, data) {
        if(err) {
            throw util.inspect(err);
        }
        console.log(data.stream);
        if (data) {
            es = elasticsearch();
            console.log("es -->"+ util.inspect(es));
            es.bulkIndex(config, data.stream, function (err, esdata) {
                console.log('esdata-->'+ util.inspect(esdata));
                res.send(data);
            });
        }

    });
});



app.post('/hash-create',function(req,res)
{
    console.log("hash-create: " + req.body.data);
    ds.core.validate(req.body.data ,function(err, data) {
        if (err) { throw err; }
        ds.core.compile(req.body.data ,function(err, data) {
            console.log("stream compiled: " + util.inspect(data));
            if (err) { throw err; }
            res.send(data);

        });
    });
});

//Port server is on. Defaulted to 8080.
app.listen(8080);
console.log('Stripe demo server is up and running!');