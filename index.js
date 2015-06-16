var app = require('gcal-conf-free-api').app;

app.use('/', require('express').static(path.join(__dirname, 'public')));

var server = app.listen(Number(process.env.PORT || config.get('ics.port')), function() {
  console.log('NODE_ENV=%s http://%s:%d', app.settings.env, server.address().address, server.address().port);
});
