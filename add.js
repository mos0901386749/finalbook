const add = async () => {
  const title = document.querySelector("#title").value;
  const isbn = document.querySelector("#isbn").value;
  const pageCount = document.querySelector("#pageCount").value;
  const publishedDate = document.querySelector("#publishedDate").value;
  const thumbnailUrl = document.querySelector("#thumbnailUrl").value;
  const shortDescription = document.querySelector("#shortDescription").value;
  const longDescription = document.querySelector("#longDescription").value;
  const status = document.querySelector("#Status").value;
  const authors = document.querySelector("#Authors").value;
  const categories = document.querySelector("#Categories").value;
  //console.log(id ,name ,type ,image );
  if (title && isbn && pageCount && publishedDate && thumbnailUrl && shortDescription && longDescription && status && authors && categories) {
    try {
      const param = {
        title: title,
        isbn: isbn,
        pageCount: pageCount,
        publishedDate: publishedDate,
        thumbnailUrl: thumbnailUrl,
        shortDescription: shortDescription,
        longDescription: longDescription,
        status: status,
        authors: authors,
        categories: categories,
      };
      const book = await fetch("https://us-central1-webservices-314bf.cloudfunctions.net/bookstore/api/v1/books", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
      })
        .then((response) => response.json())
        .then(() => {
          alert(`Book id: ${isbn} is inserted`);
        });
    } catch (error) {
      alert("Cannot insert new book");
    }
  } else {
    alert("All fields are requires");
  }
};

const edit = async () =>{
  
}