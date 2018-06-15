import axios from 'axios';

const env = process.env.NODE_ENV;
const API_ROOT = 'http://new.whoer.net';
const PROXY_ROOT = env === 'production' ? 'http://31.31.201.7:3001/proxy' : 'http://localhost:3001/proxy';

const responseBody = res =>res.data;
const reqConfig = () => {
    const lang = window.localStorage.getItem('language') || navigator.language || 'en';
    return { headers: { 'Accept-Language': lang } }
}

const proxy = (method, url, body) => axios.post(PROXY_ROOT, { url: url, method: method, body: body }, reqConfig()).then(responseBody);

const Langs = {
    list: () =>
        axios.get(API_ROOT + '/v2/languages').then(responseBody),
    lexicon: (lang) =>
        axios.get(API_ROOT + '/v2/lexicon', reqConfig()).then(responseBody)
};

const Translations = {

    add: (name, snippet) =>
        proxy('POST', '/v2/translation', { name: name, snippet: snippet }),

    id: (id) =>
        proxy('GET', '/v2/translation/' + id),

    update: (id, snippet) =>
        proxy('PUT', '/v2/translation/' + id, { snippet: snippet }),

    remove: (id) =>
        proxy('DELETE', '/v2/translation/' + id),

    get: (offset, limit) =>
        proxy('GET', '/v2/translations?limit='+ (limit || 50) +'&offset=' + (offset || 0))
};

export default {
    Langs,
    Translations
};