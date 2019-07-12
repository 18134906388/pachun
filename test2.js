const http       = require("http");
const path       = require("path");
const url        = require("url");
const fs         = require("fs");

const superagent = require("superagent");
const cheerio    = require("cheerio");
var result = [];
var getPage = function(i) {
    superagent
    .get('https://www.zhipin.com/c101190100-p100999/?page='+i+'&ka=page-'+i)
    .end((error, response) => {
        var $ = cheerio.load(response.text);
        $('.job-box .job-list ul .job-primary').each((index, element) => {
            $(element).html();
            var company = unescape($(element).find(".company-text .name").html().replace(/&#x/g,'%u').replace(/;/g,'').replace(/.*">*/,"").replace(/<.*/,""));
            var monny = $(element).find(".red").html();
            result.push({
                '公司': company,
                '薪资': monny
            });
        });
        console.log(result);
        fs.writeFile("test.json",JSON.stringify(result),'utf-8',(error) => {
            
        });
    });
}
for (let i = 1;i < 100 ;i ++){
    getPage(i);
}