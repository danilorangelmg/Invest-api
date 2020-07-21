let request = require("request");

exports.get = function (service, callback) {
    request.get(service,
        function (err, response, body) {
            if (!err) {
                let resultsObj = JSON.parse(body);
                callback(resultsObj);
            }
        });
};

exports.getHtml = function (service, callback, error) {
    request.get(service,
        function (err, response, body) {
            if (!err) {
                callback(body);
            }
        });
};