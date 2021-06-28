//book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor, only created for using its prototype methods
function UI() {

}

//UI prototype methods

//add book to list
UI.prototype.addBookToList = function(book) {
  //get table book list
  const bookListTable = document.getElementById('book-list');

  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class='delete'>X</a></td>
  `
  bookListTable.appendChild(tr);
}

//clear form inputs
UI.prototype.clearForm = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

//show alert message box
UI.prototype.showAlert = function(message, cssClass) {
  //select form element
  const form = document.getElementById('book-form');
  //select div eight columns (parent element for insert before)
  const div8 = document.querySelector('.eight', '.columns')
  //create alert div
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(message));
  div.classList = `${cssClass}`;
  //insert alert div into div.eight.columns, before form
  div8.insertBefore(div, form);
  setTimeout(function() {
    div.remove();
  }, 3000)
}

UI.prototype.deleteBook = function(target) {
  if (target.classList.contains('delete')) {
    target.parentElement.parentElement.remove();
  }
}

//local storage constructor. only created for using its prototype methods
function Store() {

}

//Store prototype methods
Store.prototype.getBooks = function() {
  let books;
  if (!localStorage.getItem('books')) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  return books;
}

Store.prototype.displayBooks = function() {
  const books = Store.prototype.getBooks();
  books.forEach(function(book) {
    const ui = new UI();
    ui.addBookToList(book);
  })
}

Store.prototype.addBook = function(book) {
  const books = Store.prototype.getBooks();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

Store.prototype.removeBook = function(isbn) {
  const books = Store.prototype.getBooks();
  books.forEach(function(book, index) {
    if (book.isbn === isbn) {
      books.splice(index, 1);
    }
  })
  localStorage.setItem('books', JSON.stringify(books));
}

//dom content loaded runs displayBooks() object method to populate list on page load
document.addEventListener('DOMContentLoaded', function() {
  const store = new Store();
  store.displayBooks();
});

//submit form
document.getElementById('book-form').addEventListener('submit', function(e) {
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  
  //create new book object
  const book = new Book(title, author, isbn);
  ////instantiate new ui object to use its prototype methods
  const ui = new UI();

  //validate form input values
  if (title === '' || author === '' || isbn === '') {
    //show error alert
    ui.showAlert('You didn\'t fill out all fields', 'error');
  } else {
    //add book to table list
    ui.addBookToList(book);

    //add book to local storage
    //instantiate new Store object to use its object methods
    const store = new Store();
    store.addBook(book);

    //show success alert
    ui.showAlert('Your book has been added!', 'success');
    // clear out form inputs
    ui.clearForm();
  }
  e.preventDefault();
});

//delete book from table list
document.getElementById('book-list').addEventListener('click', function(e) {
    //instantiate new ui object
    const ui = new UI();
    ui.deleteBook(e.target);
    //remove from local storage
    //target the isbn for a unique id
    const store = new Store();
    store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    //show delete alert
    ui.showAlert('Book deleted!', 'success');
    //prevent default link behavior (target)
    e.preventDefault();
  });
