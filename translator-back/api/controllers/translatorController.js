'use strict';
const axios = require('axios');
const api = 'https://api.mymemory.translated.net';

exports.translate = function(req, res) {
  const text = req.query.text;
  const source = req.query.source;
  const target = req.query.target;
  if (text && source && target) {
    axios.get(`${api}/get?q=${encodeURI(text)}&langpair=${source}|${target}`)
      .then(response => {
        if (response.data.responseStatus == 200) {
          res.json({translatedText: response.data.responseData.translatedText});
        } else {
          res.status(400).send();
        }
      })
      .catch(error => {
        console.log(error);
        res.send(error);
      });
  }
  else {
    const error = {
      ...!text && {text: 'missing text parameter'},
      ...!source && {source: 'missing source language parameter'},
      ...!target && {target: 'missing target language parameter'}
    };
    res.status(400).send(error);
  }
};
