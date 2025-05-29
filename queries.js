// queries.js
// Comprehensive MongoDB queries for PLP Bookstore Assignment
// Tasks: Basic CRUD, Advanced Queries, Aggregation Pipelines, Indexing & Explain

const { MongoClient } = require("mongodb");

// TODO: Update URI if using Atlas
const uri = "mongodb://localhost:27017";
const dbName = "plp_bookstore";
const collName = "books";

(async function runAllTasks() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    console.log("🗄️  Connected to MongoDB");
    const db = client.db(dbName);
    const books = db.collection(collName);

    // ===== Task 2: Basic CRUD Operations =====
    console.log("\n=== Task 2: Basic CRUD Operations ===");

    // 2.1 Find all books in a specific genre
    console.log("\n2.1. Find all 'Fantasy' books:");
    console.log(await books.find({ genre: "Fantasy" }).toArray());

    // 2.2 Find books published after a certain year
    console.log("\n2.2. Books published after 2000:");
    console.log(await books.find({ published_year: { $gt: 2000 } }).toArray());

    // 2.3 Find books by a specific author
    console.log("\n2.3. Books by 'George Orwell':");
    console.log(await books.find({ author: "George Orwell" }).toArray());

    // 2.4 Update the price of a specific book
    console.log("\n2.4. Update price of '1984' to 12.99:");
    const updateResult = await books.updateOne(
      { title: "1984" },
      { $set: { price: 12.99 } }
    );
    console.log("Modified count:", updateResult.modifiedCount);

    // 2.5 Delete a book by its title
    console.log("\n2.5. Delete book titled 'Some Old Title':");
    const deleteResult = await books.deleteOne({ title: "Some Old Title" });
    console.log("Deleted count:", deleteResult.deletedCount);

    // ===== Task 3: Advanced Queries =====
    console.log("\n=== Task 3: Advanced Queries ===");

    // 3.1 In-stock and published after 2010
    console.log("\n3.1. In-stock & published after 2010 (project title, author, price):");
    console.log(
      await books
        .find({ in_stock: true, published_year: { $gt: 2010 } })
        .project({ title: 1, author: 1, price: 1, _id: 0 })
        .toArray()
    );

    // 3.2 Sorting by price ascending
    console.log("\n3.2. Books sorted by price ascending (first 5):");
    console.log(
      await books
        .find()
        .sort({ price: 1 })
        .limit(5)
        .toArray()
    );

    // 3.3 Sorting by price descending
    console.log("\n3.3. Books sorted by price descending (first 5):");
    console.log(
      await books
        .find()
        .sort({ price: -1 })
        .limit(5)
        .toArray()
    );

    // 3.4 Pagination: page 2 (books 6-10) sorted by price ascending
    console.log("\n3.4. Pagination (page 2), 5 per page, price asc:");
    const page = 2;
    const perPage = 5;
    console.log(
      await books
        .find()
        .sort({ price: 1 })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .toArray()
    );

    // ===== Task 4: Aggregation Pipeline =====
    console.log("\n=== Task 4: Aggregation Pipeline ===");

    // 4.1 Average price of books by genre
    console.log("\n4.1. Average price by genre:");
    console.log(
      await books
        .aggregate([
          { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } },
          { $project: { genre: "$_id", avgPrice: 1, _id: 0 } }
        ])
        .toArray()
    );

    // 4.2 Author with the most books
    console.log("\n4.2. Author with the most books:");
    console.log(
      await books
        .aggregate([
          { $group: { _id: "$author", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 1 },
          { $project: { author: "$_id", bookCount: "$count", _id: 0 } }
        ])
        .toArray()
    );

    // 4.3 Group books by publication decade and count
    console.log("\n4.3. Count books by decade:");
    console.log(
      await books
        .aggregate([
          {
            $bucket: {
              groupBy: "$published_year",
              boundaries: [1900, 1950, 2000, 2050],
              default: "Other",
              output: { count: { $sum: 1 } }
            }
          }
        ])
        .toArray()
    );

    // ===== Task 5: Indexing & Performance Analysis =====
    console.log("\n=== Task 5: Indexing & Performance Analysis ===");

    // 5.1 Create index on title
    console.log("\n5.1. Creating index on 'title':");
    console.log(await books.createIndex({ title: 1 }));

    // 5.2 Create compound index on author & published_year
    console.log("\n5.2. Creating compound index on 'author' and 'published_year':");
    console.log(await books.createIndex({ author: 1, published_year: -1 }));

    // 5.3 Explain a query before and after hint
    console.log("\n5.3. Explain find({ title: '1984' }) without hint:");
    console.dir(
      await books.find({ title: "1984" }).explain("executionStats"),
      { depth: null }
    );
    console.log("\n5.3. Explain find({ title: '1984' }) with hint title_1:");
    console.dir(
      await books.find({ title: "1984" }).hint({ title: 1 }).explain("executionStats"),
      { depth: null }
    );

    console.log("\n🚀 All tasks complete.");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    console.log("🔒 Connection closed.");
  }
})();
