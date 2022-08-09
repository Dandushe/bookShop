'use strict'
console.log('Hi im a book');

function onInit() {
    renderBooks()
}

function renderBooks() {
    const books = getBooksForDisplay()
    var strHTMLs = books.map((book) =>
        `<tr>
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>$${book.price}</td>
        
        <td><button class="btn read" onclick=" onRenderModal('${book.id}')">Read</button>
            <button class="btn update" onclick="onUpdateBook('${book.id}')">Update</button>
            <button class="btn remove" onclick="onRemoveBook('${book.id}')">Remove</button>
        </td>
     </tr>`
    )

    document.querySelector('.books-table').innerHTML = strHTMLs.join('')
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onUpdateBook(bookId) {
    console.log('up', bookId);
    // var book = getBookById(bookId)
    // const newPrice = +prompt('Update the Book pice', book.price)
    // if (newPrice && book.price !== newPrice) {
    //     console.log('newPrice', newPrice);
    //     updateBook(bookId, newPrice)
    //     renderBooks()
    // }

    // var book = getBookById(bookId)
    const newPrice = +prompt('Update the Book pice')
    console.log('newPrice', newPrice);
    var book = updateBook(bookId, newPrice)
    if (!book) alert('please insert again')
    renderBooks()
}

function onAddBook() {
    const title = prompt('Enter a Book Title')
    const price = +prompt('Enter a Book pice')
    if (title === null || price === 0) return
    console.log('title:', title, 'price:', price)
    addBook(title, price)
    renderBooks()
}

function onSetFilterBy(filterBy) {
    // console.log('con b filterBy',filterBy);
    filterBy = setBookFilter(filterBy)
    // console.log('con A filterBy',filterBy);
    renderBooks()
}

// function onReadBookClick(bookId) {
//     var book = getBookById(bookId)
//     console.log('book::', book);

//     const elModal = document.querySelector('.modal')
//     elModal.querySelector('h2').innerText = book.title
//     elModal.querySelector('img').src = book.imgUrl
//     elModal.querySelector('span').innerText = `$${book.price}`
//     elModal.querySelector('p').innerText = book.desc
//     elModal.classList.add('open')
// }

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}




function onRenderModal(bookId) {
    var book = getBookById(bookId)
    const strHTML = `
    <div class="modal-content">
    <h2>${book.title}</h2>
    <img src="${book.imgUrl}">
    <span class="price">$${book.price}</span>
    <h5>Description</h5>
    <p>${book.desc}</p>
    <button onclick="onSetRate('${book.id}',1)">+</button><input type="number" value="${book.rate}" readonly></input><button onclick="onSetRate('${book.id}',-1)">-</button>
    <button onclick="onCloseModal()">Close</button>
    </div>
    `
    const elModal = document.querySelector('.modal')
    elModal.innerHTML = strHTML
    elModal.classList.add('open')
}

function onSetRate(bookId,diff) {
    console.log('bookId:',bookId, 'diff:',diff);
    // var book = updateBook(bookId, newPrice,diff)
    var book = setRate(bookId,diff)
    if (!book) return
    onRenderModal(book.id)
    // renderBooks()
}



{/* <td><button class="btn read" onclick=" onReadBookClick('${book.id}')">Read</button> */}

{/* <div class="modal-content">
<img src="">
<h2></h2>
<span class="price"></span>

<span class="fa fa-star checked" onclick="onRateClick()"></span>
<span class="fa fa-star checked" onclick="onRateClick()"></span>
<span class="fa fa-star" onclick="onRateClick()"></span>
<span class="fa fa-star" onclick="onRateClick()"></span>
<span class="fa fa-star" onclick="onRateClick()"></span>

<h5>Description</h5>
<p></p>

<button onclick="onCloseModal()">Close</button>
</div> */}













// function onRateClick() {
//     console.log('star');
//     //    const elStar= document.querySelectorAll('.fa .fa-star')
//     const elStar = document.querySelector('.fa.fa-star')
//     console.log(elStar);
//     //    elStar.classList.add('checked')
//     elStar.classList.toggle('checked')
// }