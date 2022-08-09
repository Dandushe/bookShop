'use strict'
const STORAGE_KEY = 'bookDB'
var gBooks

var gFilterBy = {
    maxPrice: 0,
    minRate: 0
}

_createBooks()

function getBooksForDisplay() {
    // var books = gBooks.filter(book => book.maxPrice.includes(gFilterBy.maxPrice))
    var books = gBooks.filter(book => book.price <= gFilterBy.maxPrice &&
        book.rate >= gFilterBy.minRate)
    return books
}


function setBookFilter(filterBy = {}) {
    // gFilterBy = { ...gFilterBy, ...filterBy }

    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    console.log('service setBookFilter:', 'filterBy:', filterBy);
    return gFilterBy
}

function updateBook(bookId, newPrice, diff) {
    const book = getBookById(bookId)
    // if(book.rate === 0 && diff === -1 || book.rate === 10 && diff === -1) return
    if (!newPrice || book.price === newPrice) return
    book.price = newPrice
    // book.rate = diff
    _saveBooksToStorage()
    return book
}

function setRate(bookId, diff) {
    const book = getBookById(bookId)
    if(book.rate === 0 && diff === -1 || book.rate === 10 && diff === 1) return
    book.rate += diff
    console.log(book.rate);
    _saveBooksToStorage()
    return book
}

function addBook(title, price) {
    const book = _createBook(title, price)
    gBooks.unshift(book)
    _saveBooksToStorage()
    return book
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)

    // gBooks = gBooks.filter(book => book.id !== bookId)

    _saveBooksToStorage()
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)

    if (!books || !books.length) {
        books = [
            _createBook('JavaScript-1', 10, 1),
            _createBook('JavaScript-2', 20, 8),
            _createBook('JavaScript-2', 40, 9),
            _createBook('JavaScript-2', 60, 2),
            _createBook('JavaScript-3', 100, 5)
        ]

    }

    gBooks = books
    _saveBooksToStorage()
}

function _createBook(title, price, rate) {
    return {
        id: makeId(),
        title,
        price,
        imgUrl: 'images/bookjs.jpeg',
        desc: makeLorem(),
        rate
    }
}

function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}
