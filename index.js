var express = require('express');
var app = express();
var googleTrends = require('google-trends-api');

var googleTrendsPassthrough = function(method) {
    return function(req, res) {
        googleTrends[method](req.query).then((response) => {
            res.type("json").send(response);
        }).catch((response) => {
            res.status(500).json(response);
        });
    }
}

app.get('/interest-over-time', googleTrendsPassthrough('interestOverTime'));
app.get('/interest-by-region', googleTrendsPassthrough('interestByRegion'));
app.get('/related-queries', googleTrendsPassthrough('relatedQueries'));
app.get('/related-topics', googleTrendsPassthrough('relatedTopics'));

app.listen(8045);