<template>
    <div class="post" @click="editPost(post.id)">
      <ul class="post-header">
        <li>
          <img :src="post.profile_picture || '/img/no-profile-picture-icon.png'" alt="img" />
        </li>
        <li> 
            {{ post.author_name }}
        </li>
        <li style="float: right">{{ formatDate(post.date) }}</li>
      </ul>
      
      <div class="post-content">
        <img v-if="post.content_type === 'image' || post.content_type === 'mixed'" :src="post.image_content" alt="image" />
        <p v-if="post.content_type === 'text' || post.content_type === 'mixed'">{{ post.text_content }}</p>
      </div>
  
      <ul class="post-footer">
        <!-- <li style="float: left">
          <button class="likeBtn" @click="incrementLikes(post.id)"><img src="/img/like-icon.png" alt="like" /></button>
        </li>
        <li>
            {{ post.likes }} Likes
        </li> -->
      </ul>
    </div>
  </template>
  
<script>
    export default {    
        props: {
            post: Object,
        },
        methods: {
            formatDate(inputDate) {
            const parts = inputDate.split('-');
            const year = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10);
            const day = parseInt(parts[2], 10);

            const date = new Date(year, month - 1, day);

            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

            const formattedDate = monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();

            return formattedDate;
            },
            incrementLikes(postId) {
                this.$emit('incrementLikes', postId); // send the increment likes event to home view
            },
            editPost(postId) {
                this.$emit('editPost', postId); // send the increment likes event to home view
            }
        },
        };
</script>

<style scoped>
    .post {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    padding: 10px;
    background-color: white;
    border-radius: 10px;
    margin: 5px 0;
    padding-bottom: 20px;
    }

    ul.post-header, ul.post-footer {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;   
    }

    ul.post-header li {
        height: 78px;
        padding: 14px 0px;
        text-decoration: none;
        font-size: 20px;
        float: left;
        display: flex;
        align-items: center;
    }   

    ul.post-header li>img {
        width: 50px;
        height: 50px;
        margin-right: 5px;
    }

    .post div p {
        position: relative;
        width: 100%;
        overflow: visible;
        padding: 0 20px;
        font-size: 24px;
        text-align: justify;
    }

    .post div img {
        display: block;
        padding: 0 20px;
        max-width: 70%;
        max-height: 400px;
    }

    ul.post-footer li {
        position: relative;
        float: right;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 20px;
    }

    ul.post-footer li img {
        width: 25px;
        height: 25px;
    }
    .likeBtn {
        background: none;
        border: none;
        display: block;
    }
    .likeBtn:hover {
        cursor: pointer;
    }
</style>
