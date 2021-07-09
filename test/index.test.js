const fs = require('fs')
const path = require('path')
// eslint-disable-next-line
const pug = require('pug')
// eslint-disable-next-line
const faker = require('faker')
const axios = require('axios')
const { includes } = require('lodash')

const randomQuote = require('../src')
const quotesFiles = require('../src/assets/quotes.json')

const wikifile = path.resolve(__dirname, 'assets', 'wiki.pug')

jest.mock('axios')

describe('Kaamelott quotes', () => {
  describe('Success cases', () => {
    it('return random quote when asked without fetching', async () => {
      const { quotes } = quotesFiles

      const rQuote = await randomQuote()
      expect(includes(quotes, rQuote)).toEqual(true)
    })

    it('return random quote when asked with fetching', async () => {
      const quote = faker.lorem.sentence()
      const pugFile = await fs.promises.readFile(wikifile, 'utf8')

      axios.get.mockImplementation(() => ({
        data: pug.render(pugFile, { quote })
      }))

      const rQuote = await randomQuote(true)
      expect(rQuote).toEqual(quote)
    })
  })
})
