const { includes } = require('lodash')

const randomQuote = require('../src')
const quotesFiles = require('../src/assets/quotes.json')

describe('Kaamelott quotes', () => {
  describe('Success cases', () => {
    it('return random quote when asked', async () => {
      const { quotes } = quotesFiles

      const rQuote = await randomQuote()
      expect(includes(quotes, rQuote)).toEqual(true)
    })
  })
})
