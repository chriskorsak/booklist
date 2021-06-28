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
    <td><a href="#">X</a></td>
  `
  bookListTable.appendChild(tr);
}

//clear form inputs
UI.prototype.clearForm = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';

}

document.getElementById('book-form').addEventListener('submit', function(e) {
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  
  //create new book object
  const book = new Book(title, author, isbn);
  //create new ui object so you can use its prototype methods
  const ui = new UI();
  //add book to table list
  ui.addBookToList(book);
  // clear out form inputs
  ui.clearForm();

  e.preventDefault();
});