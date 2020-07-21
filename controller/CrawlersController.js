let request = require('../datasource/network/request')
let cheerio = require('cheerio');

exports.requestValueByCode = async function (id) {
    return await new Promise(((resolve, reject) => {
        request.getHtml('https://www.google.com/search?' +
            'safe=active&client=safari&sxsrf=' +
            'ALeKk02TgwV8-D0rnoroJ3YttOtdzAmQsQ%3A1585841159993&' +
            'source=hp&ei=BwSGXsGbOpey5OUPgaGMmAw&q=+' +
            id +
            '&oq=+' +
            id +
            '&gs_lcp=CgZwc3ktYWIQAzIMCCMQJxCdAhBGEPoBMgUIABCDATICCAAyAggAMgII' +
            'ADICCAAyBQgAEIMBMgIIADICCAAyAggAOgcIIxDqAhAnOgQIIxAnOgcIABCDARBDOgQIABBD' +
            'UNACWKsQYIMWaAJwAHgAgAHtAogB-QOSAQcwLjEuMC4xmAEAoAEBoAECqgEHZ3dzLXdperAB' +
            'Cg&sclient=psy-ab&ved=0ahUKEwiBu4nYhsroAhUXGbkGHYEQA8MQ4dUDCAk&uact=5', function (resp) {

            try {
                const $ = cheerio.load(cheerio.load(resp).html())
                let json = Object()
                let body = $('body').find('div').toArray()
                json.name = body.filter(element => $(element).attr('class') === 'BNeawe deIvCb AP7Wnd')[0].childNodes[0].data
                json.value = parseFloat(body.filter(element => $(element).attr('class') === 'BNeawe iBp4i AP7Wnd')[1]
                    .childNodes[0].data.toString().replace(",", "."))
                json.code = id.toUpperCase()
                resolve(json)
            } catch (e) {
                reject(getErrorMessage("Não encontrado"))
            }
        });
    }))
}

exports.searchBy = async function (value) {
    return await new Promise(((resolve, reject) => {
        request.getHtml('https://www.google.com/complete/search?' +
            'client=finance-immersive&hl=pt-BR&gl=us&gs_rn=64&' +
            'gs_ri=finance-immersive&ds=finance&cp=6&gs_id=4b&' +
            'q=' +
            value +
            '&callback=google.sbox.p50&gs_gbg=uJG6Z33SuHH619WF3i5X', function (html) {

            try {
                let resultReplace = html.toString().replace("google.sbox.p50 && google.sbox.p50(", "")
                let jsonResponse = JSON.parse(resultReplace.substr(0, resultReplace.length - 1))
                let filterItems = jsonResponse[1].filter(item => (item.length > 2 && item[3].c != null))

                let result = Object()
                result.items = []
                filterItems.forEach(function (item, index) {
                    let searchItem = item[3]
                    let obj = Object()
                    obj.description = searchItem.c
                    obj.code = searchItem.t
                    result.items[index] = obj
                })

                resolve(result)
            } catch (e) {
                reject(getErrorMessage("Não encontrado"))
            }
        })
    }))
}

function getErrorMessage(errorMessage) {
  return {code: 1, message: errorMessage}
}