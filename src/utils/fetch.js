import 'isomorphic-unfetch';
import config from '../configs';
let baseUrl = config.apiPrefix;
// let baseUrl = 'http://localhost:8008';
// let baseUrl = '';

export default async(url = '', data = {}, type = 'POST', method = 'fetch') => {
    type = type.toUpperCase();
    if(!/http/.test(url)){
        url = baseUrl + url;
    }
    console.log(data);
    if (type == 'GET') {
        let dataStr = ''; //数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
    }

    if (window.fetch && method == 'fetch') {
        let requestConfig = {
            method: type,
            mode: 'cors',
            redirect: 'follow',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        }

        if (type == 'POST') {
            // let searchParams = Object.keys(data).map((key) => {
            //     return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
            // }).join('&');

            var formData  = new FormData();

            for(var name in data) {
                formData.append(name, data[name]);
            }

            Object.defineProperty(requestConfig, 'body', {
                value: formData,
            })
        }

        try {
            const response = await fetch(url, requestConfig);
            const responseJson = await response.json();
            return responseJson
        } catch (error) {
            throw new Error(error)
        }
    } else {
        return new Promise((resolve, reject) => {
            let requestObj;
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            }

            let sendData = '';
            if (type == 'POST') {
                sendData = JSON.stringify(data);
            }

            requestObj.open(type, url, true);
            requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            requestObj.send(sendData);

            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj)
                    } else {
                        reject(requestObj)
                    }
                }
            }
        }).catch((err)=>{ console.log(err) })
    }
}
