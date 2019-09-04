<template>
  <div class="header-wrapper">
    <div class="header-top outter-box" :class="{ 'has-bg': hasBg }">
      <div class="inner-box">
        <div class="top-logo">
          <img src="~images/logo-white.png" alt="jiguang design" />
        </div>
        <div class="top-menu">
          <div
            class="menu-item"
            v-for="item of menuList"
            :key="item.label"
            :class="{active: activeAnchor === item.anchor}"
            @click="anchorChange(item.anchor)"
          >{{item.label}}</div>
        </div>
      </div>
    </div>
    <div class="header-title">
      <div class="title">资源下载</div>
      <div class="subtitle">Download</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  props: {
    currentAnchor: String
  },
  data () {
    return {
      menuList: [
        { label: '品牌', anchor: 'brand' },
        { label: '字体', anchor: 'icon' },
        { label: '图库', anchor: 'gallery' },
        { label: '工具', anchor: 'tool' },
        { label: '设计', anchor: 'design' }
      ],
      activeAnchor: 'brand',
      timer: null,
      hasBg: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.hasBg = window.scrollY >= 256
      }, 16)
    },
    anchorChange (anchor) {
      this.activeAnchor = anchor
      this.$emit('anchor', anchor)
    }
  },
  watch: {
    currentAnchor (newVal) {
      if (newVal) {
        this.activeAnchor = newVal
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  width: 100%;
  height: 320px;
  background: #282f3b url("~images/home/header-bg.png") no-repeat center 0/100%
    320px;
  .header-top {
    position: fixed;
    top: 0;
    left: 0;
    background: transparent;
    &.has-bg {
      background: #282f3b;
    }
    .inner-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
      .top-logo {
        height: 32px;
        width: 32px;
        > img {
          display: block;
          width: 100%;
        }
      }
      .top-menu {
        display: flex;
        .menu-item {
          margin-right: 40px;
          font-size: 14px;
          color: #fff;
          cursor: pointer;
          &:hover,
          &.active {
            font-weight: bold;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  .header-title {
    padding-top: 130px;
    text-align: center;
    .title {
      font-size: 32px;
      color: #fff;
    }
    .subtitle {
      font-size: 22px;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>
