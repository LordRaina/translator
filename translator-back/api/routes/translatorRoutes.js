'use strict';

module.exports = function(app) {
  var translator = require('../controllers/translatorController');

  app.route('/translate')
    .get(translator.translate);
};
