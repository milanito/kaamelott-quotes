import fs from 'fs'
// eslint-disable-next-line
import pug from 'pug'
import path from 'path'
// eslint-disable-next-line
import faker from 'faker'
import axios from 'axios'
import { includes } from 'lodash'

import randomQuote from '../src'
import quotesFiles from '../src/assets/quotes.json'

jest.mock('axios')

const wikifile = path.resolve(__dirname, 'assets', 'wiki.pug')

const mockedAxios = axios as jest.Mocked<typeof axios>

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

      mockedAxios.get.mockImplementation((): Promise<any> => new Promise((resolve, reject) => {
        try {
          const data: string = pug.render(pugFile, { quote })

          return resolve({
            data
          })
        } catch (err) {
          return reject(err)
        }
      }))

      const rQuote = await randomQuote(true)
      expect(rQuote).toEqual(quote)
    })
  })
})
