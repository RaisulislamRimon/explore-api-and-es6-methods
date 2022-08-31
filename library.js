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

const displaySearchResult = (book) => {
  console.log(book);
};
