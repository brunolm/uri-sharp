import { assert } from 'chai';

import parseUri from '../src/index';

describe('uri', () => {
  it('should parse about:blank?search=csharp#hash=net&ok=1', () => {
    const uriText = 'about:blank?search=csharp#hash=net&ok=1';
    const uri = parseUri(uriText);

    assert.deepEqual(uri, {
      absolutePath: 'blank',
      absoluteUri: uriText,
      authority: '',
      hash: {
        hash: 'net',
        ok: '1',
      },
      hashString: '#hash=net&ok=1',
      host: '',
      hostNameType: 'unknown',
      isDefaultPort: true,
      originalString: uriText,
      pathAndQuery: 'blank?search=csharp',
      port: -1,
      query: {
        search: 'csharp',
      },
      queryString: '?search=csharp',
      scheme: 'about',
    });
  });


  it('should parse http://www.codingwise.com/blog/?search=csharp#hash=net&ok=1', () => {
    const uriText = 'http://www.codingwise.com/blog/?search=csharp#hash=net&ok=1';
    const uri = parseUri(uriText);

    assert.deepEqual(uri, {
      absolutePath: '/blog/',
      absoluteUri: uriText,
      authority: 'www.codingwise.com',
      hash: {
        hash: 'net',
        ok: '1',
      },
      hashString: '#hash=net&ok=1',
      host: 'www.codingwise.com',
      hostNameType: 'dns',
      isDefaultPort: true,
      originalString: uriText,
      pathAndQuery: '/blog/?search=csharp',
      port: 80,
      query: {
        search: 'csharp',
      },
      queryString: '?search=csharp',
      scheme: 'http',
    });
  });

  it('should parse http://www.codingwise.com:8080/', () => {
    const uriText = 'http://www.codingwise.com:8080/';
    const uri = parseUri(uriText);

    assert.deepEqual(uri, {
      absolutePath: '/',
      absoluteUri: uriText,
      authority: 'www.codingwise.com:8080',
      hashString: '',
      hash: { },
      host: 'www.codingwise.com',
      hostNameType: 'dns',
      isDefaultPort: false,
      originalString: uriText,
      pathAndQuery: '/',
      port: 8080,
      query: { },
      queryString: '',
      scheme: 'http',
    });
  });
});
