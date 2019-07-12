const fs         = require("fs");
var request      = require("request");
const superagent = require("superagent");
const cheerio    = require("cheerio");
var getBingImg = function() {
    superagent
    .get('https://cn.bing.com/?ensearch=2&FORM=BEHPTB')
    .end((error, response) => {
        var $ = cheerio.load(response.text);
        var imageUrl = 'https://cn.bing.com' + $('style').html().replace(/.*#bgDiv{\s*opacity:\s*1;background-image:url\(/g,'').replace(/\); }.hp_sw_logo.*/g,'')
        request.get(imageUrl).pipe(fs.createWriteStream('./img/'+new Date().getTime()+'.jfif'));
    });
}
getBingImg();