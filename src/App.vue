<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      currentUser: undefined
    };
  }
};
</script>

<style src="./assets/css/style.css"></style>