const https = require("https"),
http = require("http"),
utils = require("../helpers/utils");

module.exports.fetchDataAndProcess = ()=>{

    let wordsCount = {};
    return new Promise((resolve,reject)=>{
        //get the text from the url
        http.get(global.config.documentFetchUrl, (resp) => {
            let data = '';
            console.log("Data Fetch Started.");
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                //update the count
                chunk.toString().replace(/[\W_]+/g," ").split(" ").forEach(word=>{
                    if(wordsCount[word]){
                        wordsCount[word]++;
                    }
                    else{
                        wordsCount[word] = 1;
                    }
                })
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                console.log("Data Fetch Ended")
                //sort the data
                const wordsCountSorted = utils.sortByValue(wordsCount);
                fetchDetailsURL = [];
                //get the top 10 words
                for(let i=1;i<=10;i++){
                    fetchDetailsURL.push(getContent(`${global.config.getWordDetailsUrl}?key=${global.config.getWordAPIKey}&lang=en-en&text=${wordsCountSorted[wordsCountSorted.length-i][1]}`));
                }
                //fetch the mean and pos from loopup api
                Promise.all(fetchDetailsURL)
                .then(data=>{
                    let responseObj=[]
                    data.forEach(item=>{
                        const details = item.def[0];
                        responseObj.push({
                            count: wordsCount[details.text],
                            pos: details.pos || "",
                            syn: details.syn ||""

                        })
                    })
                    return resolve(responseObj);
                })
                .catch(error=>{
                    return reject(error);
                });
               

            });
            }).on("error", (err) => {
                //return the error
                return reject(err);
            });
    });
    


}

const getContent = function(url) {
    console.log("Lookup Url: "+url);
    // return new pending promise
    return new Promise((resolve, reject) => {
      // select http or https module, depending on reqested url
      const lib = url.startsWith('https') ? require('https') : require('http');
      const request = lib.get(url, (response) => {
        // handle http errors
        if (response.statusCode < 200 || response.statusCode > 299) {
           reject(new Error('Failed to load page, status code: ' + response.statusCode));
         }
        // temporary data holder
        const body = [];
        // on every content chunk, push it to the data array
        response.on('data', (chunk) => body.push(chunk));
        // we are done, resolve promise with those joined chunks
        response.on('end', () => resolve(JSON.parse(body.join(''))));
      });
      // handle connection errors of the request
      request.on('error', (err) => reject(err))
      })
  };
