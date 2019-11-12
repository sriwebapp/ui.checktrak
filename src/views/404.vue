<template>
  <v-container>
    <h1 class="error-title">Page not found</h1>
    <p class="zoom-area">It looks like you're lost.</p>
    <section class="error-container">
      <span><span>4</span></span>
      <span>0</span>
      <span><span>4</span></span>
    </section>
    <div class="link-container">
      <router-link to="/">
        <a class="more-link">Go Back Home</a>
      </router-link>
    </div>
  </v-container>
</template>

<script>
export default {}
</script>

<style>
.error-title {
  text-align: center;
  margin: 30px 15px;
}
.error-container {
  text-align: center;
  font-size: 180px;
  font-family: 'Catamaran', sans-serif;
  font-weight: 800;
  margin: 20px 15px;
}
.error-container > span {
  display: inline-block;
  line-height: 0.7;
  position: relative;
  color: #ffb485;
}
.error-container > span > span {
  display: inline-block;
  position: relative;
}
.error-container > span:nth-of-type(1) {
  perspective: 1000px;
  perspective-origin: 500% 50%;
  color: #f0e395;
}
.error-container > span:nth-of-type(1) > span {
  transform-origin: 50% 100% 0px;
  transform: rotateX(0);
}

.error-container > span:nth-of-type(3) {
  perspective: none;
  perspective-origin: 50% 50%;
  color: #d15c95;
}
.error-container > span:nth-of-type(3) > span {
  transform-origin: 100% 100% 0px;
  transform: rotate(0deg);
}
.zoom-area {
  max-width: 490px;
  margin: 30px auto 30px;
  font-size: 19px;
  text-align: center;
}
.link-container {
  text-align: center;
}
a.more-link {
  text-transform: uppercase;
  font-size: 13px;
  background-color: #bbb;
  padding: 10px 15px;
  border-radius: 0;
  color: #fff;
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
  line-height: 1.5;
  text-decoration: none;
  margin-top: 50px;
  letter-spacing: 1px;
}
</style>
