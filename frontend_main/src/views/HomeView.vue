<template>
  <div class="home">
    <div class="container">
      <aside id="left-bar"></aside>
      <div class="content-and-buttons">
        <button id="logout" @click="logout"> Logout </button>
        <p v-if="!loggedin()">Log in to see posts</p>
        <div class="content">
          <div v-for="post in posts" :key="post.id">
          <Post :post="post" @incrementLikes="incrementLikes" @editPost="editPost"></Post>
          </div>
        </div>
        <div class="buttons"> 
          <button @click="addPost">Add Post</button> 
          <button @click="deleteAll">Delete All</button>
        </div>
        
      </div>
      <aside id="right-bar"></aside>
    </div>
  </div>
</template>

<script>
import Post from '@/components/Post.vue';

export default {
  name: 'HomeView',
  components: {
    Post,
  },
  data() {
    return {
      posts: [],
    };
  },
  computed: {
  },
  methods: {
    loggedin() {
      return localStorage.getItem("user") != null;
    },
    async incrementLikes(postId) {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/increment-likes/${postId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem("user")
          },
        });

        const updatedPost = await response.json();

        this.posts = this.posts.map((post) => (post.id === updatedPost.id ? updatedPost : post));
      } catch (err) {
        console.log(err.message);
      }
    },
    addPost() {
      this.$router.push('/api/addPost');
    },
    editPost(postId) {
      this.$router.push('/api/apost/'+postId);
    },
    async deleteAll() {
      try {
        const response = await fetch(`http://localhost:3000/api/posts`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem("user")
          },
        })

        if (response.ok) {
          this.posts = [];
          console.log("deleted all posts");
        } else {
          console.log(`Failed to delete posts. Status: ${response.status}`);
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    async fetchPosts() {
      try {
        const response = await fetch('http://localhost:3000/api/posts/', {
          headers: {
            'x-auth-token': localStorage.getItem("user")
          },
        });
        const data = await response.json();

        if (response.ok) {
          this.posts = data;
        } else {
          console.log(`Failed to fetch posts. Status: ${response.status}`);
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/api/login");
    }
  },
  mounted() {
    this.fetchPosts();
    console.log("mounted");
  }
}
</script>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
  .home {
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    height: 90%;
  }

  .container {
      display:flex;
      flex-direction: row;
      height: 100%;
  }

  .content-and-buttons {
    flex: 2;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  aside {
    flex: 1;  
    margin: 0 10px;
    background-color: #3b7097;
    border-radius: 10px;
    height: 100%;
  }

  .content-and-buttons button {
    width: 10%;
    padding: 5px;
    margin: 10px auto 10px auto;
    background-color: #4a8db7;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    bottom: 0;
    margin-top: auto;
  }

  #logout, .buttons {
    flex: 0 0 auto;
  }
  .content {
    flex: 1;
      overflow-y: auto;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

</style>
