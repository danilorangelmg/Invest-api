let server = require('../Server.js')
let version = require('../../util/Version')
let validator = require('validator')
let controller = require('../../controller/CrawlersController')

let apiName = "/crawlerApi"

server.get(apiName, function (req, res) {
    res.contentType('text/plain');
    res.end('CrawlerApi');
});

server.get(apiName + "/" + version.V1 + "/getValueById/:id", function (req, res) {
    res.contentType('application/json');
    let id = validator.trim(validator.escape(req.params.id));
    controller.requestValueByCode(id).then(r => res.json(r)).catch(function (error) {
        res.status(500).json(error)
    })

})

server.get(apiName + "/" + version.V1 + "/search/:param", function (req, res) {
    res.contentType('application/json');
    let param = validator.trim(validator.escape(req.params.param));
    controller.searchBy(param).then(r => res.json(r)).catch(function (error) {
       //todo ajustar objeto e mensagem de erro
        res.status(500).json(error)
    })
    // controller.searchBy(res, param)
});

