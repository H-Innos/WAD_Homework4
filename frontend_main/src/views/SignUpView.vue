<template>
  <div class="signup">
    <div class="signupbox">
      <form @submit.prevent = "validateForm"> 
        <label for="emailField">Email</label>
        <input type="email" id="emailField" name="email" placeholder="Email" required v-model="email"><br>
        <label for="passwordField">Password</label>
        <input type="password" id="passwordField" name="password" placeholder="Password" required v-model="password"><br>
        <div class="submitarea">
          <p v-if="validatePassword" class="error"> {{validatePassword}}</p>
          <button type="submit" id="signupbutton" @click="signUp">Signup</button>
          <p v-if="error" class="error"> {{error}}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUpView", 

  data: function() {
    return {
    email: '',
    password: '',
    validatePassword:'',
  }},
    methods: {
    /* Validate password */
      validateForm(){
      //console.log('signup is submitted');
      this.validatePassword = (this.password.length < 8 || this.password >= 15) ? 'password must be between 8-15 chars':''

      let regex1 = /[A-Z]+/
      let regex2 = /[a-z]{2,}/
      let regex3 = /[0-9]+/
      let regex4 = /_+/

      this.validatePassword += regex1.test(this.password) ? '': this.validatePassword != '' ? ', password must contain at least 1 uppercase character (A-Z)':'password must contain at least 1 uppercase character (A-Z)'

      this.validatePassword += regex2.test(this.password) ? '': this.validatePassword != '' ? ', password must contain at least 2 lowercase characters (a-z)':'password must contain at least 2 lowercase characters (a-z)'

      this.validatePassword += regex3.test(this.password) ? '': this.validatePassword != '' ? ', password must contain at least 1 number (0-9)':'password must contain at least 1 number (0-9)'

      this.validatePassword += regex1.test(this.password.charAt(0)) ? '': this.validatePassword != '' ? ', password must start with an uppercase character (A-Z)':'password must start with an uppercase character (A-Z)'

      this.validatePassword += regex4.test(this.password) ? '': this.validatePassword != '' ? ', password must contain _':'password must contain _'

      return null;
    },
    signUp() {
      this.validateForm();
      
      if(this.validatePassword)
        return;

      this.error = '';
      var data = {
          email: this.email,
          password: this.password
      };
      fetch(`http://localhost:3000/api/signup`, {
          method: 'POST',
          headers: { 
              'Content-Type': 'application/json' 
          },
          body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then((response) => {
          if(response.error) {
            this.error = response.error;
          }
          else {
              console.log('Signing up user: ', this.email, this.password);
              this.$router.push("/");
          }
      })
      .catch((err) => console.log(err.message));
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