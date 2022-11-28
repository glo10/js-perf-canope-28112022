import { Storing } from './storing'

describe('Client storage test suites', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    jest.clearAllMocks()
  })

  describe('localStorage test suites', () => {
    const city = { name: 'paris', latitude: '1', longitude: '2' }

    it('should save last name to localStorage', () => {
      // Arrange
      const storage = new Storing()
      // Act
      storage.saveToLocalStorage('lastname', 'tshimini')
      // Assert
      expect(localStorage.setItem).toHaveBeenLastCalledWith('lastname', 'tshimini')
      expect(localStorage.__STORE__.lastname).toBe('tshimini')
    })

    it('should save first name to localStorage', () => {
      // Arrange
      const storage = new Storing()
      // Act
      storage.saveToLocalStorage('firstname', 'glodie')
      // Assert
      expect(localStorage.setItem).toHaveBeenLastCalledWith('firstname', 'glodie')
      expect(localStorage.__STORE__.firstname).toBe('glodie')
    })

    it('should save email to localStorage', () => {
      // Arrange
      const storage = new Storing()
      // Act
      storage.saveToLocalStorage('email', 'contact@tshimini.fr')
      // Assert
      expect(localStorage.setItem).toHaveBeenLastCalledWith('email', 'contact@tshimini.fr')
      expect(localStorage.__STORE__.email).toBe('contact@tshimini.fr')
    })

    it('should save a string', () => {
      // Arrange
      const store = new Storing()
      // Act
      store.saveToLocalStorage('hello', 'world')
      // Assert
      expect(localStorage.setItem).toHaveBeenCalledWith('hello', 'world')
      expect(localStorage.__STORE__.hello).toEqual('world')
    })

    it('should save city object with his name, latitude and longitude as string', () => {
      // Arrange
      const store = new Storing()
      // Act
      store.saveToLocalStorage('city', city)
      // Assert
      const result = JSON.stringify(city)
      expect(localStorage.setItem).toHaveBeenCalledWith('city', result)
      expect(localStorage.__STORE__.city).toEqual(result)
    })
  })

  describe('sessionStorage test suites', () => {
    it('should save country in sessionStorage', () => {
      // Arrange
      const store = new Storing()
      // Act
      store.saveToSessionStorage('country', 'cameroun')
      // Assert
      expect(sessionStorage.setItem).toHaveBeenCalledWith('country', 'cameroun')
      expect(sessionStorage.__STORE__.country).toEqual('cameroun')
    })
  })

  describe('Save to cookie test suites', () => {
    beforeEach(() => {
      Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'status=active',
        configurable: true
      })
    })

    it('should save age to cookie', () => {
      // Arrange
      const storage = new Storing()
      // Act
      storage.saveToCookie('age', '30')
      // Assert
      expect(document.cookie.split('age=')[1]).toEqual('30;sameSite=Lax;secure;')
    })
  })
})
