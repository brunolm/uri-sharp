"use strict";
function parseUri(uriString) {
    var tokens;
    if (/^\w+[:]\/\//.test(uriString)) {
        tokens = uriString.match(/([^:]+):\/\/([^\/]+)([^?#]+)([^#]*)([\S\s]*)/);
        return {
            absolutePath: tokens[3],
            absoluteUri: uriString,
            authority: tokens[2],
            hash: getParams(tokens[5]),
            hashString: tokens[5],
            host: tokens[2].match(/[^:]+/)[0],
            hostNameType: 'dns',
            isDefaultPort: isDefaultPort(tokens[1], (tokens[2].match(/(?:)\d+/) || [])[0]),
            originalString: uriString,
            pathAndQuery: "" + tokens[3] + tokens[4],
            port: getPort(tokens[1], (tokens[2].match(/(?:)(\d+)/) || [])[0]),
            query: getParams(tokens[4]),
            queryString: tokens[4],
            scheme: tokens[1],
        };
    }
    tokens = uriString.match(/([^:]+)[:]([^?#]+)([^#]*)([\S\s]*)/);
    return {
        absolutePath: tokens[2],
        absoluteUri: uriString,
        authority: '',
        hash: getParams(tokens[4]),
        hashString: tokens[4],
        host: '',
        hostNameType: 'unknown',
        isDefaultPort: true,
        originalString: uriString,
        pathAndQuery: "" + tokens[2] + tokens[3],
        port: getPort(tokens[1], (tokens[2].match(/(?:)(\d+)/) || [])[0]),
        query: getParams(tokens[3]),
        queryString: tokens[3],
        scheme: tokens[1],
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseUri;
;
var getParams = function (query) {
    if (!query) {
        return {};
    }
    return (/^[?#]/.test(query) ? query.slice(1) : query)
        .split('&')
        .reduce(function (params, param) {
        var _a = param.split('='), key = _a[0], value = _a[1];
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
        return params;
    }, {});
};
var isDefaultPort = function (scheme, portToken) {
    if (typeof portToken === 'undefined') {
        return true;
    }
    return +portToken === getPort(scheme, undefined);
};
var getPort = function (scheme, portToken) {
    if (typeof portToken !== 'undefined') {
        return +portToken;
    }
    switch (("" + scheme).toLowerCase()) {
        case 'ws':
        case 'http':
            return 80;
        case 'wss':
        case 'https':
            return 443;
        case 'ssh':
        case 'ssh+git':
            return 22;
        case 'git':
            return 9418;
        case 'ftp':
            return 21;
        case 'gopher':
            return 70;
        case 'imap':
            return 143;
        case 'irc':
            return 194;
        case 'ldap':
            return 389;
        case 'pop3':
            return 110;
        case 'sftp':
            return 115;
        case 'smtp':
            return 25;
        case 'telnet':
            return 23;
    }
    return -1;
};
//# sourceMappingURL=index.js.map