class Book {
  isDisplayed = false;
  id = getRandomInt(1000);
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? "Finished" : "Unfinished";
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "Finished" : "Unfinished"
    }`;
  }
}

let myLibrary = [
  new Book("Pinocchio", "Carlo Collodi", 95, true),
  new Book("Don Quixote", "Miguel de Cervantes", 324, true),
  new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 343, true),
  new Book("Lord of the Rings", "J.R.R. Tolkien", 380, false),
  new Book("Alice's Adventures in Wonderland", "Lewis Carroll", 285, false),
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read ? "Finished" : "Unfinished";
//   this.isDisplayed = false;
//   this.id = getRandomInt(1000);
// }

// Book.prototype.info = function () {
//   return `${this.title} by ${this.author}, ${this.pages} pages, ${
//     this.read ? "Finished" : "Unfinished"
//   }`;
// };

function showLibrary() {
  const table = document.getElementById("table");

  myLibrary.forEach((book) => {
    if (book.isDisplayed) return; // don't display a book that's already displayed

    book.isDisplayed = true;
    const removeBookIcon = '<i class="fas fa-minus-circle"></i>';
    const readStatusButton = "<button>Toggle</button>";

    // Create elements for book attributes and row within the table
    const title = document.createElement("td");
    const author = document.createElement("td");
    const pages = document.createElement("td");
    const read = document.createElement("td");
    const toggleReadStatusBtn = document.createElement("td");
    const removeBookBtn = document.createElement("td");
    const bookRow = document.createElement("tr");

    // Add content for each element
    title.appendChild(document.createTextNode(book.title));
    author.appendChild(document.createTextNode(book.author));
    pages.appendChild(document.createTextNode(book.pages));
    read.appendChild(document.createTextNode(book.read));
    read.id = `book-${book.id}-read-status`;
    toggleReadStatusBtn.innerHTML = readStatusButton;
    removeBookBtn.innerHTML = removeBookIcon;
    bookRow.id = book.id;

    // add event listeners
    removeBookBtn.addEventListener("click", () =>
      removeBookFromLibrary(book.id)
    );

    toggleReadStatusBtn.addEventListener("click", () =>
      changeReadStatus(read.id)
    );

    // Append book attributes to row
    bookRow.append(
      title,
      author,
      pages,
      read,
      toggleReadStatusBtn,
      removeBookBtn
    );

    // Append row to table
    table.appendChild(bookRow);
  });
}

function addBookToLibrary() {
  // Get user entered book data
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked
    ? "Finished"
    : "Unfinished";

  // Create a new book with user data
  const newBook = new Book(title, author, pages, read);

  // Clear user inputs
  clearInputs();

  // Add book to library
  myLibrary.push(newBook);

  // Update library
  showLibrary();
}

function removeBookFromLibrary(id) {
  myLibrary = myLibrary.filter((book) => book.id !== id);

  const bookRow = document.getElementById(id);
  removeAllChildNodes(bookRow);
}

function clearInputs() {
  document.getElementById("title").value = null;
  document.getElementById("author").value = null;
  document.getElementById("pages").value = null;
  document.getElementById("read").checked = null;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function changeReadStatus(readID) {
  const read = document.getElementById(readID);
  read.innerText = read.innerText === "Finished" ? "Unfinished" : "Finished";
}

showLibrary();

const addBookBtn = document.getElementById("add-book");
addBookBtn.addEventListener("click", addBookToLibrary);
