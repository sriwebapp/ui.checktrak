<template>
  <div class="code">
    <pre>
        <span class="big"><slot></slot></span>
    </pre>
  </div>
</template>

<script>
export default {}
</script>

<style>
.code {
  display: block;
  width: 500px;
  height: 150px;
  line-height: 150px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  text-shadow: 2px 2px 12px #000000;
  color: #eeeeee;
}

.big {
  font-size: 40px;
}
</style>
