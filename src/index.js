const { shuffle, random, nth, size } = require('lodash')

const quotesFiles = require('./assets/quotes.json')

const randomQuote = async () => {
  const { quotes } = quotesFiles

  return nth(shuffle(quotes), random(size(quotes)))
}

module.exports = randomQuote
