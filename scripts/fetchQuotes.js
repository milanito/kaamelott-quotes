#!/usr/bin/env node

const path = require('path')
const axios = require('axios')
const cheerio = require('cheerio')
const { replace } = require('lodash')
const { outputJSON } = require('fs-extra')

const { QUOTES_URL } = require('../src/config')

const jsonFile = path.resolve(__dirname, '..', 'src', 'assets', 'quotes.json')

const getQuotes = ($) => {
  const quotes = []

  $('.citation').each((_, elem) => {
    const text = $(elem).text()
    quotes.push(replace(text, /\(.*\)[ \n]/g, ''))
  })

  return quotes
}

const start = async () => {
  const { data } = await axios.get(QUOTES_URL)

  const $ = cheerio.load(data)

  const quotes = getQuotes($)

  await outputJSON(jsonFile, { quotes })
}

start()
