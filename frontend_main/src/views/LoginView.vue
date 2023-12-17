<template>
  <div class="signup">
    <div class="signupbox">
      <form onsubmit="return false"> 
        <label for="emailField">Email</label>
        <input type="email" id="emailField" name="email" placeholder="Email" required v-model="email"><br>
        <label for="passwordField">Password</label>
        <input type="password" id="passwordField" name="password" placeholder="Password" required v-model="password"><br>
        <div class="submitarea">
          <button type="submit" id="signupbutton" @click="login">Login</button>
          <button id="signupbutton" @click="redirect">Signup</button>
          <p v-if="error" class="error">{{error}}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login", 

  data: function() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    login() {
      var data = {
        email: this.email,
        password: this.password
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include',
          body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      //this.$router.push("/");
      location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
    },
    redirect() {
        this.$router.push("/api/signup");
    }
  }
}
</script>

<style scoped>
  .signup {
    display: flex;
    justify-content: center;
    height: 90%;
  }
  .signupbox {
    margin-top: 50px;
    margin-bottom: auto;
    border-radius: 10px;
    background-color: gray;
    width: 300px;
    padding: 10px;
    padding-left: 25px;
    padding-right: 25px;
    text-align: left;
  }

  input {
    display: inline-block;
    margin-bottom: 10px;
  }

  .submitarea {
    text-align: center;
  }

  label {
    display: inline-block;
    font-size: 90%;
  }

  #emailField {
    margin-left: 37px;
  }

  #passwordField {
    margin-left: 10px;
  }

  #signupbutton {
    width: auto;
    padding: 8px;
    margin-left: 20px;
    background-color: #203070;
    color: white;
    border: none;
    font-size: 1em;
    font-family: inherit;
    text-decoration: none;
    border-radius: 5px;
  }

  #signupbutton:hover {
    background-color: #131e47;
    cursor: pointer;
  }

  .error {
    color: rgb(221, 0, 0);
    font-size: 0.8em;
    width: 220px;
    text-align: center;
  }
</style>
