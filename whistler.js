var request = require('request');
var ical = require('ical');
var http = require('http');
var express = require('express');

var url = 'http://juneworkweekwhistler2015.sched.org/all.ics';

var events = [];

function update() {
  console.log('updating schedule...');
  ical.fromURL(
    url, {},
    function(err, data) {
      if (err) { console.error('nope'); return err; }
      var newEvents = [];
      var once = true;
      for (var q in data) {
        var event = data[q];
        if (once) {
          once = false;
          console.log(Object.keys(event));
        }
        newEvents.push({
          name: event.summary,
          location: event.location.split(',')[0],
          startTime: Date.parse(event.start),
          endTime: Date.parse(event.end),
          description: event.description,
          categories: event.categories
        });
      }
      events = newEvents;
      console.log('found ' + events.length + ' events');
    }
  );
}

setInterval(update, 60 * 1000);

update();

var app = express();
app.set('port', (process.env.PORT || 8000));
app.use(express.static(__dirname + '/static'));
var server = http.createServer(app);

app.get('/', function(req, res) {
  res.redirect('/index.html');
});

app.get('/update', function(req, res) {
  res.json(events);
});

server.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

