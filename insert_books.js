// insert_books.js
const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017"; // update if using Atlas

(async () => {
  const client = new MongoClient(uri);
  await client.connect();
  const col = client.db("plp_bookstore").collection("books");

  const books = [
    {
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      published_year: 1949,
      price: 9.99,
      in_stock: true,
      pages: 328,
      publisher: "Secker & Warburg"
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Classic",
      published_year: 1960,
      price: 8.99,
      in_stock: true,
      pages: 281,
      publisher: "J.B. Lippincott & Co."
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic",
      published_year: 1925,
      price: 10.99,
      in_stock: true,
      pages: 180,
      publisher: "Charles Scribner's Sons"
    },
    {
      title: "Brave New World",
      author: "Aldous Huxley",
      genre: "Science Fiction",
      published_year: 1932,
      price: 11.99,
      in_stock: true,
      pages: 268,
      publisher: "Chatto & Windus"
    },
    {
      title: "Moby Dick",
      author: "Herman Melville",
      genre: "Adventure",
      published_year: 1851,
      price: 12.99,
      in_stock: false,
      pages: 635,
      publisher: "Harper & Brothers"
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      published_year: 1813,
      price: 7.99,
      in_stock: true,
      pages: 279,
      publisher: "T. Egerton"
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      published_year: 1937,
      price: 9.49,
      in_stock: true,
      pages: 310,
      publisher: "George Allen & Unwin"
    },
    {
      title: "Fahrenheit 451",
      author: "Ray Bradbury",
      genre: "Dystopian",
      published_year: 1953,
      price: 8.49,
      in_stock: true,
      pages: 194,
      publisher: "Ballantine Books"
    },
    {
      title: "Jane Eyre",
      author: "Charlotte Brontë",
      genre: "Gothic",
      published_year: 1847,
      price: 10.49,
      in_stock: false,
      pages: 500,
      publisher: "Smith, Elder & Co."
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Classic",
      published_year: 1951,
      price: 9.99,
      in_stock: true,
      pages: 214,
      publisher: "Little, Brown and Company"
    },
    // 40 more books generated for demonstration
    ...Array.from({ length: 40 }, (_, i) => ({
      title: `Sample Book ${i + 11}`,
      author: `Author ${i + 11}`,
      genre: ["Fiction", "Non-Fiction", "Mystery", "Sci-Fi", "Biography"][i % 5],
      published_year: 1980 + (i % 40),
      price: 5.99 + (i % 10),
      in_stock: i % 2 === 0,
      pages: 150 + (i * 5),
      publisher: `Publisher ${i + 11}`
    }))
  ];

  const result = await col.insertMany(books);
  console.log(`Inserted ${result.insertedCount} books.`);
  await client.close();
})();