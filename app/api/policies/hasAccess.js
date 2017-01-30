
module.exports = (req, res, next) => {

    // User is allowed, proceed to the next policy, 
    // or if this is the last policy, the controller

    var method = req.method.toLowerCase() === 'get' ? 'read' : 'write';
    var apiKey = req.headers.apikey;

    if (apiKey) {

        var accessKey = _.find(sails.config.apiKeys, (key) => key.key == apiKey);

        if (accessKey) {

            switch(req.options.controller) { 
                case 'mvr':
                    var accessSet = _.find(accessKey.accessPrivillage[method], (acc) => acc.table == 'mvr');
                    if (accessSet) return next();
                    break;
                case 'autplus':
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
