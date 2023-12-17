<template>
    <header>
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/api/signUp">Sign Up</router-link>
            <router-link to="/api/login">Login</router-link>
            <router-link to="/api/contactUs">Contact us</router-link>
        </nav>
        <img class="icon" src="/img/no-profile-picture-icon.png" alt="icon">
    </header>
</template>
  
<script>
  export default {
    name: 'Header'
  };
</script>
  
<style scoped>
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #3b7097;
    }

    .navbar {
        list-style-type: none;
        overflow: hidden;
        height: 100%;
        padding-left: 10px;
    }

    li.navitem {
        position: relative;
        padding: 14px 16px;
        font-size: 20px;
        text-align: center;
        color:white;
    }

    li.navitem:hover {
        background-color: #111;
    }

    li.navitem>a {
        display: block;
        color: white;
        text-decoration: none;
    }

    .icon {
        width: 49px;
        height: 49px;
    }
    
    @media (max-width: 800px) {
        header{
            justify-content: center; 
        }
    }

    nav {
      padding: 30px;
    }

    nav a {
      text-decoration: none;
      font-weight: bold;
      color: black;
      padding: 10px;
    }

    nav a.router-link-exact-active {
      color: white;
    }
</style>
