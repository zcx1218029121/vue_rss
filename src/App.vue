<template>
  <keep-alive>
  <router-view active-class="active"></router-view>
  </keep-alive>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style>
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

html,
body {
  font-family: "Roboto", helvetica, arial, sans-serif;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  font-size: 62.5%;
}

body {
  background: #fafafa;
  color: #333;
  /*Sometimes fonts don't display optimally on all devices*/
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  /*font-weight:300;*/
}

a,
.user {
  text-decoration: none;
  color: #88d;
}

a:hover {
  color: rgb(100, 197, 100);
}

a.button {
  display: inline-block;
  text-align: center;
  padding: 14px 24px;
  font-weight: 600;
  cursor: pointer;
  line-height: 1;
  background: #88d;
}

p,
li,
time {
  font-size: 1.6rem;
  line-height: 3.2rem;
  margin: 0 0 2.4rem;
}

[class*="card-"] h1,
[class*="card-"] h2 {
  font: 600 2.4rem/3.2rem "PT Serif", palatino, times, serif;
  margin: 0 0 0.8rem;
  padding: 0;
}

figure {
  position: relative;
  margin: 0;
  line-height: 0;
}

img {
  border: 0;
  height: auto;
  max-height: 500px;
  max-width: 100%;
}

img:hover {
  filter: alpha(opacity=9000);
  opacity: 0.9;
  filter: alpha(opacity=90);
}

article,
figure,
footer,
header,
main {
  display: block;
}
</style>
