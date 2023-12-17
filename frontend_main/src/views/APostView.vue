<template>
  <div class="a-post">
    <div class="a-post-box">
      <h1>A Post</h1>
      <div class="a-post-container">
        <label for="body">Body: </label>
        <input name="body" type="text" id="body" required v-model="post.body" />
      </div>
      <button @click="updatePost" class="updatePost">Update Post</button>
      <button @click="deletePost" class="deletePost">Delete Post</button>
    </div>
  </div>
</template>


<script>
export default {
  name: "APost",
  data() {
    return {
      post: {
        id: "",
        title: "",
        body: "",
        urllink: "",
      },
    };
  },
  methods: {
    fetchAPost(id) {
      // fetch one post with the specied id (id)
      fetch(`http://localhost:3000/api/posts/${id}`)
        .then((response) => response.json())
        .then((data) => (this.post = data))
        .catch((err) => console.log(err.message));
    },
    updatePost() {
      // using Fetch - put method - updates a specific post based on the passed id and the specified body
      var data = {
        text_content: this.post.body
      }
      fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          console.log(response.data);
          //this.$router.push("/apost/" + this.post.id);
          // We are using the router instance of this element to navigate to a different URL location
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deletePost() {
      // using Fetch - delete method - delets a specific post based on the passed id
      fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          console.log(response.data);
          // We are using the router instance of this element to navigate to a different URL location
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    // call fetchAPost() when this element mounts, and pass to it a route parameter  (id)
    // Route parameters (this.$route.params.id) are named URL segments that are used to capture the values specified at their 
    // position in the URL. The captured values are populated in the req.params object, with the name 
    // of the route parameter specified in the path as their respective keys
    this.fetchAPost(this.$route.params.id);
  },
};
</script>

<style scoped>
    .a-post {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        height: 90%;
    }

    .a-post-box {
        background-color: #3b7097;
        text-align: center;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        color: white;
    }

    .a-post-container {
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

    #body {
    margin-bottom: 10px;
    font-size: 20px;
    padding-bottom: 80px;
    }

    button {
    background-color: #4a8db7;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
    margin-left: 10px;
    margin-right: 10px;
    }

</style>