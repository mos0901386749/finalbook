const deleteBook = async (isbn) => {
  if (isbn) {
    try {
      const book = await fetch(
        "https://us-central1-webservices-314bf.cloudfunctions.net/bookstore/api/v1/books/" + isbn,
        {
          method: "DELETE",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then(() => {
          alert("Book ID " + isbn + " deleted !!");
          location.reload();
        });
    } catch (error) {
      alert("Book ID : " + isbn + " not found");
    }
  } else {
    alert("Book ID is missing");
  }
};



const addBook = (book) => {
  const item = document.createElement("div");
  item.className = "card";
  item.style = "max-width:20rem";
  const card = `
  <img class="card-img-top"
  src="${book.thumbnailUrl}"
  alt="card image" />
  <div class="card-body">
      <h5 class="card-title">${book.title}</h5>
      <p class="card-text">${book.isbn}</p>
      <p class="card-text">${book.shortDescription}</p>
      <p class="card-text">${book.authors}</p>
      <a href ="#" class ="btn btn-danger col-xs-2" onclick="deleteBook(${book.isbn})">Delete</a>
               <a href ="edit.html?isbn=${book.isbn}" class ="btn btn-warning col-xs-2">Edit</a>
  </div>
    `;
  item.innerHTML = card;
  const bookResult = document.querySelector(".book");
  bookResult.appendChild(item);
};
const searchBook = async (event) => {
  const keyword = event.target.value;
  if (event.key == "Enter" && keyword != "") {
    const allBook = await fetch("https://us-central1-webservices-314bf.cloudfunctions.net/bookstore/api/v1/books", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credential: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    console.log(allBook);
    let obj = allBook.filter(
      (o) => o.title.includes(keyword) || o.longDescription.includes(keyword)
    );
    console.log(obj);
    obj.forEach((element) => {
      addBook(element);
    });
  }
};

const main = () => {
  const inputElement = document.querySelector(".search");
  inputElement.addEventListener("keydown", searchBook);
};



main();
