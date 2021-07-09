const fs = require('fs')
const path = require('path')
// eslint-disable-next-line
const pug = require('pug')
// eslint-disable-next-line
const faker = require('faker')
const axios = require('axios')
const randomQuote = require('../src')

const wikifile = path.resolve(__dirname, 'assets', 'wiki.pug')

jest.mock('axios')

describe('Kaamelott quotes', () => {
  describe('Success cases', () => {
    it('return random quote when asked', async () => {
      const quote = faker.lorem.sentence()
      const pugFile = await fs.promises.readFile(wikifile, 'utf8')

      axios.get.mockImplementation(() => ({
        data: pug.render(pugFile, { quote })
      }))

      const rQuote = await randomQuote()
      expect(rQuote).toEqual(quote)
      console.log(quote)
    })
  })
})
