# /!\ deprecated /!\

instead just use [this jasmine TAP reporter](https://github.com/substack/testling-jasmine/issues/3)

# testling-jasmine

Run jasmine tests in all the browsers with testling.

# example

```
$ testling-jasmine example/test.js example/test.json
username: substack@gmail.com
password: 
iexplore/9.0:
  mixinTest:should add mixins ....................... 1/1
  mvc plugin:should exist ........................... 1/1
  overrideTest:should let module override mixins .... 1/1

firefox/12.0:
  mixinTest:should add mixins ....................... 1/1
  mvc plugin:should exist ........................... 1/1
  overrideTest:should let module override mixins .... 1/1

total ............................................... 6/6
```

# install

With [npm](http://npmjs.org) do:

```
npm install -g testling-jasmine
```

# license

MIT
