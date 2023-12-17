<template>
    <div class="add-post">
      <div class="add-post-box">
        <h1>Add Post</h1>
        <div class="container">
            <label for="postBody">Body</label>
            <textarea id="postBody" required v-model="post.body" rows="4"></textarea>
        </div>
        <button @click="addPost">Add</button>
      </div>
    </div>
  </template>
  
<script>
  export default {
    data() {
      return {
        post: {
            body: ""
        },      
      };
    },
    methods: {
        todayFormatted() {
            const today = new Date();

            const year = today.getFullYear(); 
            const month = today.getMonth() + 1; 
            const day = today.getDate(); 

            // Format the date as a string (e.g., "YYYY-MM-DD")
            const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
            return formattedDate;
        },
        addPost() {
            var data = {
                date: this.todayFormatted(), // pass in today's date
                body: this.post.body
            };
            fetch(`http://localhost:3000/api/posts`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem("user")
                },
                body: JSON.stringify(data),
            })
            .then(() => {
                console.log('Adding post:', this.postBody);
                this.$router.push("/");
            })
            .catch((err) => console.log(err.message));
        }
    }
  };
</script>
  
<style scoped>
    .add-post {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        height: 90%;
    }
    
    .add-post-box {
        background-color: #3b7097;
        text-align: center;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        color: white;
    }

    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }
    h1 {
        font-size: 30px;
    }

    label {
        font-size: 20px;
        font-weight: bold;
        margin-right: 20px;
    }

    textarea {
    margin-bottom: 10px;
    font-size: 20px;
    }

    button {
    background-color: #4a8db7;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
    }
</style>
  
