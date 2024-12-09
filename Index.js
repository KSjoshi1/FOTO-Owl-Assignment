const express = require("express");
const path = require("path");

const { open }= require("sqlite3");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "goodreads.db");

let db = null;

const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename:dbPath,
            driver: sqlite3.Database,
        });
        app.listen(3000, () => {
            console.log("Server is Running at http://localhost:3000");
        });
    } catch (e) {
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    };
    initializeDBAndServer();

    app.get("books/", async (request, response) => {
        const getBoosQuery = `
        SELECT *
        FROM book
        ORDER BY book_id;
        `;
        const bookArray = await db.all(getBooksQuery);
        response.send(bookArray);
    });
    //GET BOOK API
    app.get("/books/:bookId", async (request, response) => {
        const { bookId } = request.params;
        const getBookQuery = `
        SELECT *
        FROM book
        WHERE book_id = ${bookId};`;

        const book = await db.get(getBookQuery);

        response.send(book);
    })

    //Update Book API
    app.put("/books/:bookId", (request, response) => {
        const { bookId } = request.params;
        const bookDetails = request.body;

        const {
            title,
            authorId,
            rating,
            ratingCount,
            reviewCount,
            description,
            pages,
            dateDfPublication,
            editionLanguage,
            price,
            onlineStores,
        } = bookDetails;
        const updateBookQuery = `
        UPDATE
        book
        SET
        title='${title}',
        author_id=${authorId},
        rating=${rating},
        rating_count=${ratingCount},
        review_count=${reviewCount},
        description='${description}',
        pages=${pages},
        date_of_publication='${dateDfPublication}',
        edition_language='${editionLanguage}',
        price= ${price},
        online_stores='${onlineStores}'
        WHERE
        book_id = ${bookId};`;
    })
}