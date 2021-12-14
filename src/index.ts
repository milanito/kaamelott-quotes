import axios from 'axios'
import cheerio, { load } from 'cheerio'
import { replace, shuffle, random, nth, size } from 'lodash'

import quotesFiles from './assets/quotes.json'
import { QUOTES_URL } from './config'

type CheerioAPI = ReturnType<typeof load>

const getFetchedQuotes = ($: CheerioAPI): string[] => {
  const quotes: string[] = []

  $('.citation').each((_: number, elem: Element) => {
    const text = $(elem).text()

    quotes.push(replace(text, /\(.*\)[ \n]/g, ''))
  })

  return quotes
}

const fetchQuotes = async (): Promise<string[]> => {
  const { data } = await axios.get(QUOTES_URL)

  const $ = cheerio.load(data)

  return getFetchedQuotes($)
}

const getQuotes = async (withFetch: boolean): Promise<string[]> => {
  if (withFetch) {
    return await fetchQuotes()
  }

  const { quotes } = quotesFiles

  return quotes
}

const getRandomQuote = (quotes: string[]): string =>
  nth(shuffle(quotes), random(size(quotes) - 1)) ?? ''

const randomQuote = async (withFetch: boolean = false): Promise<string> => {
  const quotes = await getQuotes(withFetch)

  return getRandomQuote(quotes)
}

export default randomQuote
