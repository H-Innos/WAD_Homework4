
const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "",   // insert your password
    database: "",     // insert your database name 
    host: "localhost",
    port: "5432"
});

const execute = async(query) => {
    try {
        await pool.connect(); // gets connection
        await pool.query(query); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

// Query for creating the post table 
const createPostTableQuery = `
    CREATE TABLE IF NOT EXISTS "posttable" (
        "id" SERIAL PRIMARY KEY,
        "author_name" VARCHAR(255),
        "profile_picture" VARCHAR(255),
        "date" DATE NOT NULL,
        "content_type" VARCHAR(10) NOT NULL,
        "text_content" VARCHAR(1000),
        "image_content" VARCHAR(1000),
        "likes" INTEGER NOT NULL
    )`;

// Query for creating the user table 
const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
        "id" SERIAL PRIMARY KEY,
        "email" VARCHAR(255) NOT NULL,
        "password" VARCHAR(255) NOT NULL
    )`;

// Query for creating initial posts
const intializePostTableQuery = `
    INSERT INTO "posttable" (
        "author_name",
        "profile_picture",
        "date",
        "content_type",
        "text_content",
        "image_content",
        "likes"
    ) VALUES
    (NULL, NULL, '2023-01-01', 'text', 'first post ', NULL, 0),
    (NULL, NULL, '2023-01-02', 'text', 'another post', NULL, 0),
    (NULL, NULL, '2023-01-04', 'text', 'one last post', NULL, 0),
    (NULL, NULL, '2023-01-03', 'mixed', 'text under picture', '/img/testpilt2.jpg', 0);
`;
//I

// Checks whether the table is empty
const checkTableData = async (tableName) => {
    try {
        const query = `SELECT COUNT(*) AS row_count FROM ${tableName}`;
        const result = await pool.query(query);

        if (result.rows.length > 0) {
            const rowCount = parseInt(result.rows[0].row_count, 10);
            return rowCount > 0;
        } else {
            return false; // Assuming no rows means no data
        }
    } catch (error) {
        console.error('Error checking table data:', error.stack);
        return false;
    }
};

// Initialize the database with initial data
const initializeDatabase = async () => {
    try {
        await pool.connect();
        await execute(createPostTableQuery); // create the posts table if it doesn't exist
        await execute(createUserTableQuery); // create the users table if it doesn't exist
        
        const tableName = "posttable";
        const hasData = await checkTableData(tableName); // check if the table is empty
    
        if (hasData) {
            console.log(`The table ${tableName} contains data.`);
        } else {
            console.log(`The table ${tableName} is empty, adding intial data.`);
            await execute(intializePostTableQuery); // if the table is empty, fill it with initial data
        }
    } finally { 

    }
};
    
// Initialize database     
initializeDatabase().then(() => {
    console.log('Database initialization completed.');
});

module.exports = pool;
