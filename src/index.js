const axios = require('axios')
const cheerio = require('cheerio')
const { replace, shuffle, random, nth, size } = require('lodash')

const { QUOTES_URL } = require('./config')

const getQuotes = ($) => {
  const quotes = []

  $('.citation').each((_, elem) => {
    const text = $(elem).text()
    quotes.push(replace(text, /\(.*\)[ \n]/g, ''))
  })

  return quotes
}

const randomQuote = async () => {
  const { data } = await axios.get(QUOTES_URL)

  const $ = cheerio.load(data)

  const quotes = getQuotes($)

  return nth(shuffle(quotes), random(size(quotes)))
}

module.exports = randomQuote
