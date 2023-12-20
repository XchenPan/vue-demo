<script setup></script>

<template>
  <div class="footer">
    <div class="container flex">
      <div class="footer-left">
        <div class="logo">
          <a href=""><img src="../assets/logo.svg" alt="" /></a>
        </div>
        <div class="title">
          <div class="top"><a href="">大橘子</a></div>
          <div class="bottom"><a href="">在线图书推荐与交流平台</a></div>
        </div>
        <div class="info">
          <div><a href="">《用户协议》</a></div>
          <div><a href="">《政策隐私》</a></div>
          <div><p>© 大橘子在线图书推荐与交流平台</p></div>
        </div>
      </div>
      <div class="footer-right"></div>
    </div>
  </div>
</template>

<style scoped>
.footer {
  border-top: 1px solid rgba(0, 0, 0, .08);
  background-color: rgba(0, 0, 0, 0.02);
}

.footer .container > div {
  margin-top: 40px;
}

.footer .footer-left .title a {
  color: #000;
  font-size: 20px;
}

.footer .footer-left .info {
  margin-top: 10px;
}

.footer .footer-left .info div:nth-child(2) {
  margin-top: 10px;
}

.footer .footer-left .info div:nth-child(3) {
  margin-top: 20px;
  padding: 20px 0;
}

.footer .footer-left .info a {
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
}
.footer .footer-left .info p {
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
}
</style>
