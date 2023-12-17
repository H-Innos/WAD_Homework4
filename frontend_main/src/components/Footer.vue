<template>
    <footer>
      <p>Copyright &copy; {{ currentYear }}</p>
    </footer>
</template>
  
<script>
  export default {
    data() {
      return {
        currentYear: new Date().getFullYear(),
      };
    },
  };
</script>
  
<style scoped>
  footer {
    padding: 10px;
    background-color: #000000;
    color: white;
    margin-top: auto;
    text-align: center;
    width: 100%;
    bottom:0;
    margin-top: auto;
    }
</style>