const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const API_ROOT = 'http://new.whoer.net';

app.post('/proxy', function (req, res) {
    const { method, url, body } = req.body;
    const reqBody = body ? { data: body } : null;
    const requestConfig = {
        method: method,
        url: API_ROOT + url,
        ...reqBody,
        auth: {
            username: 'test123',
            password: 'supersecret'
        },
        headers: {
            'Accept-Language': req.headers["accept-language"]
        }
    };
    axios(requestConfig).then((r)=>{res.send(r.data)});
});

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});

