<template>
  <div class="header">
    <div class="content-wrapper">
      <!--商店图标 -->
      <div class="avatar">
        <img :src="seller.avatar">
      </div>
      <!--主体内容 -->
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟到达</div>
        <div class="support"
             v-if="seller.supports">
          <span class="icon"
                :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <!--活动详情 -->
        <div class="supports_count"
             v-if="seller.supports"
             @click="showDetail(true)">
          <span class="count">{{seller.supports.length}}个</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
    </div>
    <!--公告页 -->
    <div class="bulletin-wrapper"
         @click="showDetail(true)">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar">
    </div>
    <transition name="fade">
      <div class="detail"
           v-show="detailShow"
           @click="showDetail(false)">
        <div class="detail-wrapper">
          <div class="detail-main">
            <div class="name">{{seller.name}}</div>
            <div class="star-wrapper">
              <star :score="seller.score"
                    :size="48"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports">
              <li class="support"
                  v-for="support in seller.supports"
                  :key="support.type">
                <span class="icon"
                      :class="classMap[support.type]"></span>
                <span class="text">{{support.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="content">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close"
             @click="showDetail(false)">
          <span class="icon-close"></span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: ['seller'],
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  },
  data () {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail (isShow) {
      this.detailShow = isShow
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

root = '../../../static/drawable/';

.support {
  .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    vertical-align: middle;
  }

  .decrease {
    bg-image(root + decrease_1);
  }

  .discount {
    bg-image(root + discount_1);
  }

  .guarantee {
    bg-image(root + guarantee_1);
  }

  .invoice {
    bg-image(root + invoice_1);
  }

  .special {
    bg-image(root + special_1);
  }

  .text {
    margin-left: 4px;
    font-size: 10px;
    line-height: 12px;
    font-weight: 200;
  }
}

.header {
  position: relative;
  background: rgba(7, 17, 27, 0.5);
  color: white;
  overflow: hidden;

  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;

    .avatar {
      vertical-align: top;
      display: inline-block;
      width: 64px;
      height: 64px;

      img {
        width: 100%;
      }
    }

    .content {
      display: inline-block;
      margin-left: 20px;
      padding: 2px 0 2px;

      .title {
        .brand {
          display: inline-block;
          width: 30px;
          height: 18px;
          background-repeat: no-repeat;
          background-size: 30px 18px;
          vertical-align: middle;
          bg-image(root + brand);
        }

        .name {
          width: 70px;
          transition: left 10s linear;
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      }

      .description {
        margin-top: 8px;
        margin-bottom: 10px;
        font-size: 12px;
        font-weight: 200;
        line-height: 12px;
      }

      .support {
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          vertical-align: middle;
        }

        .decrease {
          bg-image(root + decrease_1);
        }

        .discount {
          bg-image(root + discount_1);
        }

        .guarantee {
          bg-image(root + guarantee_1);
        }

        .invoice {
          bg-image(root + invoice_1);
        }

        .special {
          bg-image(root + special_1);
        }

        .text {
          margin-left: 4px;
          font-size: 10px;
          line-height: 12px;
          font-weight: 200;
        }
      }

      .supports_count {
        display: flex;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        position: absolute;
        right: 12px;
        bottom: 18px;
        height: 24px;
        padding: 0px 8px;
        box-sizing: border-box;
        align-items: center;

        .count {
          font-size: 10px;
          line-height: 12px;
          font-weight: 200;
        }
      }
    }
  }

  .bulletin-wrapper {
    position: relative;
    padding: 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 28px;
    line-height: 28px;
    background: rgba(7, 17, 27, 0.2);

    .bulletin-title {
      display: inline-block;
      width: 22px;
      height: 12px;
      background-repeat: no-repeat;
      background-size: 22px 12px;
      vertical-align: middle;
      bg-image(root + bulletin);
    }

    .bulletin-text {
      margin: 0 4px;
      font-size: 10px;
      font-weight: 200;
    }

    .icon-keyboard_arrow_right {
      position: absolute;
      top: 6px;
      right: 2px;
    }
  }

  .background {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: -1;
    filter: blur(10px);

    img {
      width: 100%;
      height: 100%;
    }
  }

  .detail {
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed; // 相对浏览器进行布局
    background: rgba(0, 0, 0, 0.7);

    &.fade-enter-active, &.fade-leave-active {
      transition: opacity 0.3s linear;
    }

    &.fade-enter, &.fade-leave-to {
      opacity: 0;
    }

    .detail-wrapper {
      min-height: 100%;
      padding: 64px 0 32px;

      .detail-main {
        .name {
          text-align: center;
          font-size: 16px;
          line-height: 16px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .star-wrapper {
          height: 24px;
          text-align: center;
        }

        .title {
          padding: 28px 36px 24px;
          display: flex;

          .line {
            position: relative;
            top: 8px;
            flex: 1;
            width: 90%;
            height: 2px;
            background: rgba(255, 255, 255, 0.2);
          }

          .text {
            float: left;
            margin: 0 12px;
          }
        }
      }

      .supports {
        padding: 0 48px;
      }

      .supports .support {
        margin-bottom: 12px;
      }

      .supports .support .text {
        margin-left: 6px;
        font-size: 12px;
        font-weight: 200;
        line-height: 12px;
      }

      .content {
        padding: 0 48px;
        font-size: 12px;
        font-weight: 200;
        line-height: 24px;
      }
    }
  }

  .detail-close {
    text-align: center;
    line-height: 32px;
    font-size: 32px;
    height: 32px;
    margin-top: -160px;
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>
