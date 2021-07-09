# kaamelott-quotes

This projet is used to fetch [kaamelott](https://en.wikipedia.org/wiki/Kaamelott) quotes

## Usage

To use this package, just install it

```
$ npm i kaamelott-quotes
// or with yarn
$ yarn add kaamelott-quotes
```

and then use it like this

```
const randomQuote = require('kaamelott-quotes')

const start = async () => {
  const quote = await randomQuote()

  // Use the quote
}

start()
```

## Credit

The quotes are fetched from [WikiQuote](https://fr.wikiquote.org/wiki/Kaamelott)
