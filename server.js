/*jshint node:true*/
'use strict';

const version = '1.1.1';
const port = 8080;

const http = require('http');

http
    .createServer((request, response) => {
        console.log(request.url);

        if (request.url.match(/\/ats\/.*/)) {
            if (request.url.match(/\/tokens$/)) {
                response.end('');
            } else if (request.url.match(/\/verify/)) {
                let body = '';
                request.on('data', (data) => body += data);
                request.on('end', () => {
                    if (body && ~body.indexOf('invalid')) {
                        response.end('{"valid": false, "claims": null}');
                    } else {
                        const timeFrom = new Date().getTime();
                        const timeTo = new Date(timeFrom + 3600000).getTime();
                        response.end('{"valid": true,"claims": {"nbf": ' + timeFrom + ',"iss": "KBC","exp": ' + timeTo + ',"iat": ' + timeFrom + ',"deviceToken": "cuCh_Z5EGRg:APA91bH3MSMMyaLT6wWH-r2qfmCc-uaUBXSiLqMwana0qQ7zxDwIEo_J3sK0TxdCDmGzWkl9xpuR0Um6wGFYtsf4jc8Zn75tkDzQUf2JpWG1NruMEWSnYST_qtnUvM1Qv2M0i1IRVFQ_"}}');
                    }
                });
            }
        } else if (request.url.match(/\/version/)) {
            response.end(version);
        } else {
            response.end(request.body);
        }
    })
    .listen(port, (error) => {
        if (error) {
            return console.log('Error', error);
        }

        console.log(`Server is listening on ${port}`);
    });