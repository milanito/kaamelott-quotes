const axios = require('axios')
const cheerio = require('cheerio')
const { replace, shuffle, random, nth, size } = require('lodash')

const quotesFiles = require('./assets/quotes.json')
const { QUOTES_URL } = require('./config')

const getFetchedQuotes = ($) => {
  const quotes = []

  $('.citation').each((_, elem) => {
    const text = $(elem).text()
    quotes.push(replace(text, /\(.*\)[ \n]/g, ''))
  })

  return quotes
}

const fetchQuotes = async () => {
  const { data } = await axios.get(QUOTES_URL)

  const $ = cheerio.load(data)

  return getFetchedQuotes($)
}

const getQuotes = async (withFetch) => {
  if (withFetch) {
    return await fetchQuotes()
  }

  const { quotes } = quotesFiles

  return quotes
}

const getRandomQuote = quotes =>
  nth(shuffle(quotes), random(size(quotes) - 1))

const randomQuote = async (withFetch = false) => {
  const quotes = await getQuotes(withFetch)

  return getRandomQuote(quotes)
}

module.exports = randomQuote
