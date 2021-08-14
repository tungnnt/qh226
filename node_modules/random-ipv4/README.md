# random-ipv4

> Return a random ipv4 address.

[![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/mock-end/random-ipv4/blob/master/LICENSE)

[![build:?](https://img.shields.io/travis/mock-end/random-ipv4/master.svg?style=flat-square)](https://travis-ci.org/mock-end/random-ipv4)
[![coverage:?](https://img.shields.io/coveralls/mock-end/random-ipv4/master.svg?style=flat-square)](https://coveralls.io/github/mock-end/random-ipv4)


## Install

```
$ npm install --save random-ipv4 
```

## Usage

> For more use-cases see the [tests](https://github.com/mock-end/random-ipv4/blob/master/test/spec/index.js)

```js
var randomIpv4 = require('random-ipv4');

// API
// - randomIpv4(schema[, options]);

randomIpv4();
// => 193.31.235.41

randomIpv4('127.0.{token}.1', {
    token: {
        min: 127,
        max: 255
    }
});
// => 127.0.216.1

randomIpv4('{token1}.{token2}.{token3}.{token4}', {
    token1:{
        min: 127,
        max: 127
    },
    token2:{
        min: 127,
        max: 192
    },
    token3:{
        min: 0,
        max: 200
    }
});
// => 127.188.153.3

```

**Note**:

- `schema` - the ipv4 schema, default `'{token1}.{token2}.{token3}.{token4}'`.
- `options` - options for every **token**, each token has `min` and `max` option, which both are from `0` to `255`.

## Related

- [random-ipv6](https://github.com/mock-end/random-ipv6) - Return a random ipv6 address.
- [random-tld](https://github.com/mock-end/random-tld) - Return a random tld(Top Level Domain).
- [random-domains](https://github.com/mock-end/random-domains) - Return a random domain.
- [random-email](https://github.com/mock-end/random-email) - Return a random email.
- [random-protocol](https://github.com/mock-end/random-protocol) - Return a random protocol.
- [random-hashtag](https://github.com/mock-end/random-tld) - Return a random hashtag.
- [random-uri](https://github.com/mock-end/random-uri.git) - Return a random url.
- [random-avatar](https://github.com/mock-end/random-avatar) - Return a URL to a random avatar from Gravatar.

## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please [create an issue](https://github.com/mock-end/random-ipv4/issues/new).
