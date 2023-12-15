const express = require('express');
const pool = require('./database');
const cors = require('cors');
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());

app.get('/api/posts', async (req, res) => {
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

app.put('/api/posts/increment-likes/:id', async (req, res) => {
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

app.post('/api/posts', async (req, res) => {
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
})

app.delete('/api/posts', async (req, res) => {
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

app.listen(port, () => {
    console.log('listening on port ' + port);
});