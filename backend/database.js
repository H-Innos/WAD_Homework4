
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
    ('Mari Maasikas', NULL, '2023-01-01', 'text', 'first post ', NULL, 0),
    ('John Doe', NULL, '2023-01-02', 'image', NULL, '/img/testpilt1.png', 0),
    ('Jane Smith', NULL, '2023-01-03', 'text', 'another post', NULL, 0),
    ('Bob Johnson', NULL, '2023-01-04', 'mixed', 'text under picture', '/img/testpilt2.jpg', 0),
    ('Alice Brown', NULL, '2023-01-05', 'text', 'one last post', NULL, 0);
`;

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
const initializeDatabase = async () => {
    try {
        await pool.connect();
        const createResult = await execute(createPostTableQuery);
        
        const tableName = "posttable";
        const hasData = await checkTableData(tableName);
    
        if (hasData) {
            console.log(`The table ${tableName} contains data.`);
        } else {
            console.log(`The table ${tableName} is empty, adding intial data.`);
            await execute(intializePostTableQuery);
        }
    } finally { 

    }
};
    
    
initializeDatabase().then(() => {
    console.log('Database initialization completed.');
});

module.exports = pool;
