var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
  request({
     uri: 'https://api.kawalcovid19.id/v1/api/case/summary',
    headers: {
      Origin: 'https://kawalcovid19.id'
    }
  }).pipe(res);
});

module.exports = router;