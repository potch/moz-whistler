var request = require('request');
var ical = require('ical');

var email = 'mozilla.com_6d7476323632@resource.calendar.google.com';

var url = 'https://www.google.com/calendar/ical/' + encodeURIComponent(email) + '/public/basic.ics?fmt=ifb&date=20150603';

ical.fromURL(
  url, {},
  function(err, data) {
    if (err) { console.error('nope'); return err; }
    for (var q in data) {
      console.log(data[q]);
    }
  }
);
