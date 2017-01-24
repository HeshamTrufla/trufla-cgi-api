
module.exports = (req, res, next) => {

    // User is allowed, proceed to the next policy, 
    // or if this is the last policy, the controller

    var method = req.method.toLowerCase() === 'get' ? 'read' : 'write';
    var apiKey = req.headers['apiKey'];

    if (apiKey) {
        var accessKey = _.find(sails.apiKeys, ['key', apiKey]);
        if (accessKey) {
            switch(req.target.controller) {
            case 'MVRController':
                var accessSet = _.find(accessKey.accessPrivillage[method], ['table', 'MVR']);
                if (accessSet) return next();
                break;
            case 'AutoPlusController':
                var accessSet = _.find(accessKey.accessPrivillage[method], ['table', 'autoPlus']);
                if (accessSet) return next();
                break;
            }
        }
    }

    // User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    return res.forbidden('You are not permitted to perform this action.');
};
