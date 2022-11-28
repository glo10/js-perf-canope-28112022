import { enableFetchMocks } from 'jest-fetch-mock'
import Annoucement, { render } from './../announcement'
import userEvent from '@testing-library/user-event'
enableFetchMocks()

jest.mock('../announcement', () => {
  //Mock the default export and named export 'foo'
  const origin = jest.requireActual('../announcement');
  return {
    __esModule: true,
    ...origin,
    render: jest.fn(() => `
    <article>
      <h3>title</h3/>
      <img src="http://feed.com/img.png"]/>
      <div class="modal-content">description</div>
      <a href="http://feed.com/article1"]>lien</a>
      <p>Auteur: glodie</p>
      <span>Date: 2022-09-17</span>
    </article>
    `),
  }
})

describe('Annoucement test suites', () => {
  const results = [
    {
      id: '0',
      title: 'title',
      description: 'description',
      link: 'http://feed.com/article1',
      thumbnail: {
        url: 'http://feed.com/img.png'
      },
      pubDate: '2022-09-17',
      source: {
        text: 'glodie'
      }
    }
  ]

  const articleTemplate = `
  <article>
    <h2>{{title}}</h2>
    <aside>
      <img src="{{thumbnail.url}}">
    </aside>
    <a href="{{link}}"></a>
    <p>Auteur: {{author}}</p>
    <p>Date: {{pubDate}}</p>
    <span id="modal-{{id}}">
    <div class="modal-content">{{description}}</div>
  </article>`

  describe('Mock getItems() test suites', () => {
    const news = new Annoucement('filename', 'url')
    afterEach(() => {
      fetch.resetMocks()
    })

    it('should get news items', async () => {
    // Arrange
      const articles = JSON.stringify(results)
      fetch.mockResponse(`{"rss":{"channel":{"item":${articles}}}}`)

      const items = await news.getItems()
      // Assert
      expect(items).toEqual(results)
    })

    it('should don\'t have news', async () => {
      // Arrange
      fetch.mockResponse('{"rss":{"channel":{"item":[]}}}')
      // Act
      const items = await news.getItems()
      // Assert
      expect(items).toEqual([])
    })

    it('should get server error', async () => {
      // arrange
      fetch.mockResponse('{}')
      // Assert
      await news.getItems().catch((err) => {
        expect(err).toEqual(new Error('Server error'))
      })
    })
  })

  describe('Render test suites', () => {
    it('should display items on html article template file', async () => {
      // Arrange
      document.body.innerHTML = render()
      // Act
      const body = document.querySelector('body')
      // Assert
      expect(body).toContainHTML('<h3>title</h3>')
      expect(document.querySelector('img[src="http://feed.com/img.png"]')).toBeInTheDocument()
      expect(body).toContainHTML('<div class="modal-content">description</div>')
      expect(body).toContainHTML('<p>Auteur: glodie</p>')
      expect(document.querySelector('a[href="http://feed.com/article1"]')).toBeInTheDocument()
      expect(body).toContainHTML('Date: 2022-09-17')
    })
  })

  describe('Article HTML template suites', () => {
    const acmt = new Annoucement('filename','url')
    it('should replace flags by data on article HTML template', () => {
      // Arrange
      // Act
      const final = acmt.replaceItem(articleTemplate, results[0])
      // Assert
      expect(final).toContain('<span id="modal-0">')
      expect(final).toContain('<img src="http://feed.com/img.png"')
      expect(final).toContain('<a href="http://feed.com/article1"')
      expect(final).toContain('<h2>title</h2>')
      expect(final).toContain('<div class="modal-content">description</div>')
      expect(final).toContain('2022-09-17')
      expect(final).toContain('Auteur: glodie')
    })

    it('should replace author by creator when author does not exist', () => {
      // Arrange
      const withoutAuthor = results[0]
      delete withoutAuthor.source
      withoutAuthor.creator = 'god'
      // Act
      const final = acmt.replaceItem(articleTemplate, withoutAuthor)
      // Assert
      expect(final).toContain('Auteur: god')
    })
  })

  describe('Modal test suites', () => {
    const news = new Annoucement('filename','url')
    afterEach(() => {
      document.body.innerHTML = ''
    })

    it('should show article modal with description', async () => {
      // Arrange
      document.body.innerHTML = `
      <span id="modal1">open modal</span>
      <div id="desc-modal1" class="modal" style="display:none;">
        here description
      </div>
      `
      news.openModals()
      // Act
      await userEvent.click(document.querySelector('#modal1'))
      // Assert
      const displayValue = window.getComputedStyle(document.querySelector('.modal'), null).getPropertyValue('display')
      expect(displayValue).toEqual('block')
    })

    it('should hide article modal with description', async () => {
      // Arrange
      document.body.innerHTML = `
      <div id="body-modal1" class="modal">
      <span class="close">X</span>
        here description
      </div>
      `
      news.closeModals()
      // Act
      await userEvent.click(document.querySelector('.close'))
      // Assert
      const displayValue = window.getComputedStyle(document.querySelector('.modal'), null).getPropertyValue('display')
      expect(displayValue).toEqual('none')
    })
  })
})
