# uri-sharp

Install

```
npm i -S uri-sharp
```

TypeScript definitions included.

## Example

```js
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
```
