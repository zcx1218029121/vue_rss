<!--- 详情页组件!-->
<template>
  <main>
    <transition name="fade">
      <!--详情页 -->
      <div class="zcxdetail"
           v-show="detailShow"
           @click="detailTogger()">
        <div class="detail-wrapper">
          <article class="card-40 social">
            <!-- end figure-->
            <div class="flex-content">
              <header>
                <p class="user">
                  <a class="button"
                     href="#"
                     title="Share">
                    Share
                  </a>
                  <img class="avatar-32"
                       src="http://jlantunez.com/imgs/avatar.jpg"
                       alt="Avatar">
                  <strong>
                    <a title="Full Name">
                      username
                    </a>
                  </strong>
                  <span><a href=""
                       title="Permalink">8 mins ago</a> &middot; <a href=""
                       title="258 comments">258 comments</a></span>
                </p>
              </header>
              {{curItem.title}}
              </h2>
              </a>
            </div>
            <!-- end .flex-content-->
          </article>
        </div>
      </div>

    </transition>
  </main>
</template>
<script>
export default {
  data () {
    return {
      isShow: false,
      data: {}
    }
  },
  methods: {
    showDes: function (data) {
      this.data = data
      this.isShow = false
    }
  }
}
</script>
<style lang="stylus"></style>
