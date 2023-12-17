<template>
  <div class="home">
    <div class="container">
      <aside id="left-bar"></aside>
      <div class="content-and-buttons">
        <button id="logout" @click="logout"> Logout </button>
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
    logout() {
      fetch("http://localhost:3000/auth/logout", {
          credentials: 'include', //  Don't forget to specify this if you need cookies
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log('jwt removed');
        //console.log('jwt removed:' + auth.authenticated());
        this.$router.push("/api/login");
        //location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error logout");
      });
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
