# PLP Bookstore Assignment

This repository contains the MongoDB-based PLP Bookstore assignment. It demonstrates MongoDB setup, CRUD operations, advanced queries, aggregation pipelines, and indexing.

## 📋 Prerequisites

* **Node.js** (v14+)
* **MongoDB Community Edition** installed locally **OR** a MongoDB Atlas free-tier cluster
* **VS Code** (optional, but recommended) with the **MongoDB for VS Code** extension

## 🗂️ Project Structure

```
plp_bookstore/
├── insert_books.js    # Script to insert sample book documents
├── queries.js         # Script containing MongoDB queries for each task
├── README.md          # This file
├── .gitignore         # Ignored files (node_modules/, .env)
└── package.json       # Project metadata and dependencies
```

## ⚙️ Setup & Installation

1. **Clone this repository** (or create a new folder):

   ```bash
   git clone <repo-url> plp_bookstore
   cd plp_bookstore
   ```

2. **Initialize Node.js project** (if not already initialized):

   ```bash
   npm init -y
   ```

3. **Install dependencies**:

   ```bash
   npm install mongodb
   ```

4. **Configure MongoDB connection**:

   * For **local** MongoDB, use:

     ```js
     const uri = "mongodb://localhost:27017";
     ```
   * For **Atlas**, replace with your connection string:

     ```js
     const uri = "mongodb+srv://<username>:<password>@cluster0.abcd.mongodb.net";
     ```

## 🚀 Running the Scripts

### 1. Insert Sample Books

Run the script to insert at least 10 book documents into the `plp_bookstore.books` collection:

```bash
node insert_books.js
```

### 2. Execute Queries

Run the queries script to perform CRUD operations, advanced queries, aggregation, and indexing:

```bash
node queries.js
```

## 📈 Viewing Data

You can view your data and indexes using **MongoDB Compass** or the **Atlas UI**. Please include a screenshot of your `books` collection and sample documents in Compass or Atlas in your submission.

## 📸 Screenshots

### Collections

![Collections](./screenshots/collections.png)

### Indexes

![Indexes](./screenshots/indexes.png)

### Sample Data

![Sample Data](./screenshots/sample_data.png)

## 📝 Submission

* Ensure that `insert_books.js` and `queries.js` are complete and working.
* Include the Compass/Atlas screenshots in this `README.md` (use Markdown image syntax).
* Commit and push your changes to your GitHub repository.

---


