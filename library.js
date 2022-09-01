const searchBook = () => {
  const searchField = document.getElementById("input-field");
  const searchValue = searchField.value;
  console.log(searchValue);
  fetch(`https://openlibrary.org/search.json?q=${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      displaySearchResult(data.docs);
    });
};

const resultContainer = document.getElementById("search-result");
const displaySearchResult = (book) => {
  // console.log(book);
  book.forEach((singleBook) => {
    const {
      title,
      edition_count,
      publish_date,
      number_of_pages_median,
      author_name,
    } = singleBook;
    const bookCard = document.createElement("div");
    bookCard.classList.add("col");
    bookCard.innerHTML = `
      <div class="card shadow-lg">
        <div class="card-body">
          <h5 class="card-title">Book Title: ${title}</h5>
          <p class="card-text">Edition Count: ${edition_count[0]}</p>
          <p class="card-text">Publish Date: ${publish_date}</p>
          <p class="card-text">Number of Pages: ${number_of_pages_median}</p>
          <p class="card-text">Author: ${author_name}</p>
      </div>
    `;
    resultContainer.appendChild(bookCard);
  });
};
