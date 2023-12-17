const express = require('express');
const pool = require('./database');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());

const secret = "5b33a934-9cf2-11ee-b740-67bd61ed9b39";
function jwtauth(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) {
        res.status(401).json("token not found");
    }

    try {
        const user = jwt.verify(token, secret);
        next();
    } catch (error) {
        res.status(401).json("invalid token");
    }
}

// Get the posts in the database 
app.get('/api/posts', jwtauth, async (req, res) => {
    try {
        console.log("get posts request received");
        const posts = await pool.query(
            "SELECT * FROM posttable"
        );
        res.json(posts.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// Incrementing the number of likes of a post
app.put('/api/posts/increment-likes/:id', jwtauth, async (req, res) => {
    try {
      const { id } = req.params; 
  
      // Update the likes in the database
      const updateLikesQuery = `
        UPDATE posttable
        SET likes = likes + 1
        WHERE id = $1
        RETURNING *`;
  
      const updatedPost = await pool.query(updateLikesQuery, [id]);
  
      res.json(updatedPost.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
});

// Adding a post to the database
app.post('/api/posts', jwtauth, async (req, res) => {
    try {
        console.log("a post request has arrived");
        const post = req.body;
        const newpost = await pool.query(
            "INSERT INTO posttable(date, content_type, text_content, likes) values ($1, $2, $3, $4)    RETURNING*", [post.date, "text", post.body, 0]
        );
        res.json(newpost);
    } catch (err) {
        console.error(err.message);
    }
});

// Registering a user
app.post("/api/signup", async (req, res) => {
    try {
        console.log("a signup request has arrived");

        const email = req.body.email;

        const hash = bcrypt.hashSync(req.body.password, 10);

        const query = "SELECT * FROM usertable WHERE email = $1";
        const users = await pool.query(query, [req.body.email]);

        if(users.rows.length != 0) {
            res.json({error: "Email already registered."});
            return;
        }

        const insertQuery = "INSERT INTO usertable(email, hash) values($1, $2)";
        await pool.query(insertQuery, [req.body.email, hash]);

        const token = jwt.sign({email}, secret, {expiresIn: "1h"});
        res.json({token});
    } catch (err) {
        console.error(err.message);
    }
});

// User login
app.post("/api/login", async (req, res) => {
    try {
        console.log("a login request has arrived");

        const email = req.body.email;

        const hash = bcrypt.hashSync(req.body.password, 10);

        const query = "SELECT * FROM usertable WHERE email = $1";
        const users = await pool.query(query, [req.body.email]);

        if(users.rows.length == 0) {
            res.json({error: "User does not exist."});
            return;
        }

        if(!bcrypt.compareSync(req.body.password, users.rows[0].hash)) {
            res.json({error: "Wrong password."});
            return;
        }

        const token = jwt.sign({email}, secret, {expiresIn: "1h"});
        res.json({token});
    } catch (err) {
        console.error(err.message);
    }
});

// Deleting all posts from the database 
app.delete('/api/posts', jwtauth, async (req, res) => {
    try {
        console.log("a delete request has arrived");
        const deleteAll = await pool.query(
            "DELETE FROM posttable RETURNING*"
        );
        res.json(deleteAll);
    } catch (err) {
        console.error(err.message);
    }
})

// Get a specific post
app.get('/api/posts/:id', jwtauth, async(req, res) => {
    try {
        console.log("get a post with route parameter  request has arrived");
        const { id } = req.params;
        const posts = await pool.query(
            "SELECT * FROM posttable WHERE id = $1", [id]
        );
        res.json(posts.rows[0]);
        
    } catch (err) {
        console.error(err.message);
    }
}); 

// Update a specific post
app.put('/api/posts/:id', jwtauth, async(req, res) => {
    try {
        const { id } = req.params;
        const post = req.body;
        console.log("update request has arrived");
        const updatepost = await pool.query(
            "UPDATE posttable SET text_content = $2 WHERE id = $1", [id, post.text_content]
        );
        res.json(updatepost);
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a specific post
app.delete('/api/posts/:id', jwtauth, async(req, res) => {
    try {
        const { id } = req.params;
        console.log("delete a post request has arrived");
        const deletepost = await pool.query(
            "DELETE FROM posttable WHERE id = $1", [id]
        );
        res.json(deletepost);
    } catch (err) {
        console.error(err.message);
    }
}); 

app.listen(port, () => {
    console.log('listening on port ' + port);
});