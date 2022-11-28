import { enableFetchMocks } from 'jest-fetch-mock'
import { FetchHtmlPartial } from './../fetch-html-partial'
enableFetchMocks()

describe.skip('fetch partials HTML files test suites', () => {
  const articleTemplate = `
  <article>
    <h2>{{title}}</h2>
    <aside>
      <img src="{{thumbnail.url}}">
    </aside>
    <a href="{{link}}"></a>
    <p>Auteur: {{source.text}}</p>
    <p>Date: {{pubDate}}</p>
    <span id="modal-{{id}}">
    <div class="modal-content">{{description}}</div>
  </article>`

  const basic = `
  <input type="email">
  <input type="password">
  <input type="submit" value="Valider">
  <input type="button" value="Inscription">`

  const signInTemplate = `<form>${basic}</form>`

  const signUpTemplate = `
  <form>
    <input type="text">
    <input type="text">
    <input type="password">
    <input type="number">
    <input type="text">
    <input type="text"/>
    ${basic}
  </form>
  `
  afterEach(() => {
    fetch.resetMocks()
  })

  it('should get article.html content', async () => {
    // Arrange
    fetch.mockResponse(articleTemplate)
    const article = new FetchHtmlPartial()
    // Act
    const data = await article.fetchData('_partials/article.html')
    // Assert
    expect(data).toContain('<article>')
    expect(data).toContain('<aside>')
    expect(data).toContain('Auteur')
    expect(data).toContain('<div class="modal-content">')
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('_partials/article.html')
  })

  it('should get 404 not found', async () => {
    // Arrange
    fetch.mockReject(new Error('404 not found'))
    const article = new FetchHtmlPartial()
    // Act
    const data = await article.fetchData('404.html')
    // Assert
    expect(data).toEqual(new Error('404 not found'))
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('404.html')
  })

  it('should get sign-up.html content', async () => {
    // Arrange
    fetch.mockResponse(signUpTemplate)
    const form = new FetchHtmlPartial()
    // Act
    const data = await form.fetchData('_partials/sign-up.html')
    // Assert
    expect(data).toContain('input type="text"')
    expect(data).toContain('input type="password"')
    expect(data).toContain('input type="number"')
    expect(data).toContain('input type="submit"')
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('_partials/sign-up.html')
  })

  it('should get signIn.html content', async () => {
    // Arrange
    fetch.mockResponse(signInTemplate)
    const form = new FetchHtmlPartial()
    // Act
    const data = await form.fetchData('_partials/sign-in.html')
    // Assert
    expect(data).toContain('input type="password"')
    expect(data).toContain('input type="submit"')
    expect(data).not.toContain('input type="text"')
    expect(data).not.toContain('input type="number"')
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('_partials/sign-in.html')
  })
})
