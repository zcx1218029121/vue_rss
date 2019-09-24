<template>
  <keep-alive>
  <div class="warrp">
  <div class="header_info">
    <div class="image">
      <img
             width="80"
             height="80"
             class="icon"
             v-bind:src=this.source.source_icon
             />
      <span>
        {{this.source.source_name}}
      </span>
      <b-button class="add">
        关注
      </b-button>
    </div>
  </div>
    <b-list-group>
      <b-list-group-item v-for="(item, index) in this.items" :key="index" @click="goDetill(item)">
       <p class="item-content" >{{item.title}}</p>
      </b-list-group-item>
    </b-list-group>
  </div>
  </keep-alive>
</template>

<script>
  import { doGetWithToken } from '../../common/api'
export default {
  data () {
    return {
      source: {},
      items: { }
    }
  },
  methods: {
    goDetill: function (item) {
      this.$router.push(
        { path: '/detailed',
          query: {item: item
          } }
      )
    }
  },
  name: 'source',
  activated () {
    if (!this.$route.meta.isBack) {
      this.source = this.$route.query.source
      doGetWithToken('source_detail?sid=' + this.source.sid).then((r) => {
        this.items = r.data.items
      })
    }
    this.$route.meta.isBack = false
  },
  beforeRouteEnter (to, from, next) {
    if (from.path === '/main/ratings') {
      to.meta.isBack = false
    } else {
      to.meta.isBack = true
    }
    next()
  }
}
</script>

<style scoped>
  .header_info{

    background: #1089ff;
    display: flex;
    height: 20%;
    width: 100%;
    align-items: center;
    justify-content:center;
    padding: 20px;
  }
  span{
    margin: 10px;
    display: block;
    text-align: center;
    align-content: center;
    color: whitesmoke;
    font-size: 15px;
  }

  .add{
    width: 80px;
    margin: 10px;
    display: block;
    text-align: center;
    align-content: center;
    color: whitesmoke;
    font-size: 5px;
  }
  .header_info img{
    z-index: 9;
    display: block;
    border-radius: 200px;
    width: 80px;
    height: 80px;
    align-content: center;
    margin: auto;
  }
  .item-content{
    font-max-size: 2px;
    max-lines: 2;
    text-overflow: ellipsis;
  }
</style>
