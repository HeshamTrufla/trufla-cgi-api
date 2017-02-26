module.exports = (req, res, next) => {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller

  var method = req.method.toLowerCase() === 'get' ? 'read' : 'write';
  var apiKey = req.headers['api_key'];

  if (apiKey) {

    var accessKey = _.find(sails.config.apiKeys, (key) => key.key == apiKey);

    if (accessKey) {
      req.apiKey = accessKey;
      switch (req.options.controller) {
        case 'mvr':
          var accessSet = _.find(accessKey.accessPrivillage[method], (access) => access.table == 'mvr');
          if (accessSet) return next();
          break;
        case 'autoplus':
          var accessSet = _.find(accessKey.accessPrivillage[method], (access) => access.table == 'autoplus');
          if (accessSet) return next();
          break;
      }
    }
  }

  // User is not allowed

  else {
    return res.forbidden(ResHandlerService.errorObject('INVALID_ACCESS_KEY', true));
  }
};
