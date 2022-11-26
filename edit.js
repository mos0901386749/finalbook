const init = async () => {
    let params = new URL(document.location).searchParams;
    const isbn = params.get("isbn");
    if (isbn) {
        try {
            const book = await fetch(
                "https://us-central1-webservices-314bf.cloudfunctions.net/bookstore/api/v1/books/" + isbn, {
                    method: "GET",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => response.json());
            console.log(book);
            document.querySelector("#title").value = book.title;
            document.querySelector("#isbn").value = book.isbn;
            document.querySelector("#pageCount").value = book.pageCount;
            document.querySelector("#publishedDate").value = book.publishedDate;
            document.querySelector("#thumbnailUrl").value = book.thumbnailUrl;
            document.querySelector("#shortDescription").value = book.shortDescription;
            document.querySelector("#longDescription").value = book.longDescription;
            document.querySelector("#Status").value = book.status;
            document.querySelector("#Authors").value = book.authors;
            document.querySelector("#Categories").value = book.categories;
        } catch (error) {
            console.log(error);
        }
    } else {
        alert("Book ID is missing, please enter Book");
    }
};

const edit = async () => {
    const isbn = document.querySelector("#isbn").value;
    if (isbn) {
        const title = document.querySelector("#title").value;
        const pageCount = document.querySelector("#pageCount").value;
        const publishedDate = document.querySelector("#publishedDate").value;
        const thumbnailUrl = document.querySelector("#thumbnailUrl").value;
        const shortDescription = document.querySelector("#shortDescription").value;
        const longDescription = document.querySelector("#longDescription").value;
        const status = document.querySelector("#Status").value;
        const authors = document.querySelector("#Authors").value;
        const categories = document.querySelector("#Categories").value;
        const param = {
            Title: title,
            pageCount: pageCount,
            publishedDate: publishedDate,
            thumbnailUrl: thumbnailUrl,
            shortDescription: shortDescription,
            longDescription: longDescription,
            Status: status,
            Authors: authors,
            Categories: categories,
        };
        try {
            const book = await fetch(
                    "https://us-central1-webservices-314bf.cloudfunctions.net/bookstore/api/v1/books/" + isbn, 
                    {
                        method: "PUT",
                        mode: "cors",
                        cache: "no-cache",
                        credentials: "same-origin",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(param),
                    }
                )
                .then((response) => response.json())
                .then(() => {
                    alert(`Book id ${isbn} is updated !`);
                });
        } catch (error) {
            console.log(error);
        }
    } else {
        alert("Book Id is missing");
    }
};