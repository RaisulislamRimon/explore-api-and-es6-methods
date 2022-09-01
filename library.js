const searchBook = (item) => {
  const searchField = document.getElementById("input-field");
  const searchValue = searchField.value;
  console.log(searchValue);
  // fetch(`https://openlibrary.org/search.json?q=${searchValue}`)
  fetch(`https://openlibrary.org/search.json?q=${item}`)
    .then((response) => response.json())
    .then((data) => {
      displaySearchResult(data.docs);
    });
};

const resultContainer = document.getElementById("search-result");
const displaySearchResult = (book) => {
  resultContainer.innerHTML = "";
  // console.log(book);
  book.forEach((singleBook) => {
    const {
      title,
      edition_count,
      publish_date,
      number_of_pages_median,
      author_name,
      cover_i,
      author_key,
    } = singleBook;
    const undefined = "undefined";
    const img = `https://covers.openlibrary.org/b/id/${cover_i}-S.jpg`;
    const img1 = `https://covers.openlibrary.org/b/id/${undefined}-S.jpg`;

    const bookCard = document.createElement("div");
    bookCard.classList.add("col");
    bookCard.innerHTML = `
      <div class="card shadow-lg">
        <div class="card-header">
          <img src="${
            img === img1
              ? "https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg"
              : img
          }" alt="" class="img-fluid">
        </div>
        <div class="card-body">
          
          <h5 class="card-title">Book Title: ${
            title === "undefined" || title === "Undefined" ? "not found" : title
          }</h5>
          <p class="card-text">Edition Count: ${edition_count}</p>
          <p class="card-text">Publish Date: ${publish_date[0]}</p>
          <p class="card-text">Number of Pages: ${
            number_of_pages_median ? number_of_pages_median : "not found"
          }</p>
          <p class="card-text">Author: ${author_name[0]}</p>
      </div>
      <div class="card-footer">
          <button class="btn btn-success" onclick="loadAuthorDetails('${
            author_key[0]
          }')"  data-bs-toggle="modal" data-bs-target="#exampleModal">
            Author details
          </button>
      </div>
      </div>
    `;
    resultContainer.appendChild(bookCard);
  });
};

const loadAuthorDetails = (authorKey) => {
  fetch(`https://openlibrary.org/authors/${authorKey}.json`)
    .then((response) => response.json())
    .then((data) => {
      displayAuthorDetails(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const authorDetails = document.getElementById("author-details");
const displayAuthorDetails = (author) => {
  const { name, birth_date, bio, works } = author;
  authorDetails.innerHTML = "";
  document.getElementById(
    "exampleModalLabel"
  ).innerText = `Author Name: ${name}`;
  document.getElementById("modal-birth-date").innerText = `Birth Date: ${
    // how to solve birth_date issue
    birth_date.length !== 0 ? birth_date : "not found"
  }`;
  document.getElementById(
    "modal-author-works"
  ).innerText = `Works: ${works.length}`;
  document.getElementById("modal-author-bio").innerText = `Bio: ${bio}`;

  authorDetails.appendChild(authorDiv);
};

searchBook("helloworld");
