import toggleLoader from "./loader.js";

const  getData = (url = '') => { 
    return new Promise(function(resolve,reject){
        var req = new XMLHttpRequest();
        req.open('GET',url);
        req.onload = function() {
            if (req.status == 200)  {
                resolve(req.response);
            }else {
                reject(Error('promise error with ' + req.status));
            }
        };
        req.onerror = function(err) {
            reject(Error('Network Error with '+url+': ' + err));
        };
        req.onreadystatechange = function(m) {
            toggleLoader(false);
        };
        req.send();
    });
}

export const getJSON = async (url) => {
    var data = {};
    var string = null;
    try {
      string = await getData(url);
    }catch (e) {
      console.log('error: ' + e);
    }

    try { 
        data = JSON.parse(string);
    }catch (e) {
       console.log('parse error: ' + e);
    }
    return data;
}

export default getJSON;