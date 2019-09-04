<template>
  <div class="content-wrapper outter-box">
    <div class="inner-box">
      <div class="section" v-for="(data, index) of list" :key="index" :ref="data.anchor">
        <div class="section-title">{{data.title}}</div>
        <div class="section-children">
          <div class="children-item" v-for="child of data.children" :key="child.title">
            <div class="item-title">{{child.title}}</div>
            <div class="item-icon" :class="child.addIconCls">
              <img :src="getUrl(child.icon)" :alt="child.title" />
            </div>
            <div class="item-btn">
              <a v-if="child.btn.link" :href="child.btn.link" target="_blank">{{child.btn.label}}</a>
              <a
                v-else-if="child.btn.download"
                href="javascript:void(0);"
                @click="download(child.btn.download)"
              >{{child.btn.label}}</a>
              <div v-else>{{child.btn.label}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeContent',
  props: {
    anchor: String
  },
  data () {
    return {
      list: [
        {
          title: '品牌',
          anchor: 'brand',
          children: [
            {
              title: '标准品牌资源',
              icon: 'brand.png',
              btn: {
                label: '下载',
                download: '品牌资源.zip'
              }
            },
            {
              title: '标准 PPT',
              icon: 'ppt.png',
              btn: {
                label: '下载',
                download: 'ppt模版.zip'
              }
            },
            {
              title: '品牌规范书',
              icon: 'keynote.png',
              addIconCls: { 'no-max-width': true },
              btn: {
                label: '下载',
                download: '极光品牌升级VI规范书——基础版.pdf'
              }
            }
          ]
        },
        {
          title: '字体',
          anchor: 'icon',
          children: [
            {
              title: 'MacOS 平台字体',
              icon: 'pingfang.png',
              btn: {
                label: '下载',
                link: 'https://developer.apple.com/fonts/'
              }
            },
            {
              title: 'Win 平台字体',
              icon: 'roboto.png',
              btn: {
                label: '下载',
                link:
                  'https://github.com/adobe-fonts/source-han-sans/tree/release'
              }
            },
            {
              title: '品牌字体',
              icon: 'open-sans.png',
              btn: {
                label: '下载',
                download: 'Roboto.zip'
              }
            }
          ]
        },
        {
          title: '图库',
          anchor: 'gallery',
          children: [
            {
              title: 'Unsplash',
              icon: 'unsplash.png',
              btn: {
                label: '查看',
                link: 'https://unsplash.com/'
              }
            },
            {
              title: 'ISO',
              icon: 'iso.png',
              btn: {
                label: '查看',
                link: 'http://isorepublic.com/'
              }
            },
            {
              title: 'Stocksnap.io',
              icon: 'stocksnap.png',
              btn: {
                label: '查看',
                link: 'https://stocksnap.io/'
              }
            }
          ]
        },
        {
          title: '工具',
          anchor: 'tool',
          children: [
            {
              title: 'Measure',
              icon: 'measure.png',
              btn: {
                label: '查看',
                link: 'https://github.com/utom/sketch-measure/'
              }
            },
            {
              title: 'Stark',
              icon: 'stark.png',
              btn: {
                label: '查看',
                link: 'https://getstark.co/'
              }
            },
            {
              title: 'Color Oracle',
              icon: 'color-oracle.png',
              btn: {
                label: '查看',
                link: 'http://colororacle.org/'
              }
            }
          ]
        },
        {
          title: '设计',
          anchor: 'design',
          children: [
            {
              title: 'SVG Tool',
              icon: 'svg-tool.png',
              btn: {
                label: '查看',
                link: 'https://shuizhongxiong.github.io/icon-svg/dist/'
              }
            },
            {
              title: 'Color Tool',
              icon: 'color-tool.png',
              btn: {
                label: '查看',
                link: 'https://shuizhongxiong.github.io/colorbox/dist/'
              }
            },
            {
              title: 'JED',
              icon: 'qrcode.png',
              btn: {
                label: '微信扫码关注'
              }
            }
          ]
        }
      ],
      elOffsetTopMap: {},
      timer: null
    }
  },
  mounted () {
    Object.keys(this.$refs).forEach(d => {
      this.elOffsetTopMap[d] = this.$refs[d][0].offsetTop
    })
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
        Object.keys(this.elOffsetTopMap).every(d => {
          if (window.scrollY < this.elOffsetTopMap[d]) {
            this.$emit('currentAnchor', d)
            return false
          }
          return true
        })
      }, 16)
    },
    getUrl (name) {
      return require(`@/assets/images/home/${name}`)
    },
    download (name) {
      const element = document.createElement('a')
      element.setAttribute('href', `${this.$baseUrl}static/files/${name}`)
      element.setAttribute('download', name)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
  },
  watch: {
    anchor (newVal) {
      if (newVal) {
        const ref = this.$refs[newVal][0]
        if (ref) {
          window.scrollTo({
            behavior: 'smooth',
            top: ref.offsetTop - 64
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  padding: 60px 0;
  background-color: #f8f9fa;
  .section {
    margin-bottom: 60px;
    &:last-child {
      margin-bottom: 0;
    }
    .section-title {
      font-size: 32px;
      color: #384e74;
      text-align: center;
    }
    .section-children {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      .children-item {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: space-between;
        margin-right: 60px;
        padding: 40px;
        width: 360px;
        height: 320px;
        text-align: center;
        background-color: #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
        transition: all 0.3s;
        &:last-child {
          margin-right: 0;
        }
        &:hover {
          box-shadow: 0 30px 57px 0 rgba(0, 0, 0, 0.06);
        }
        .item-title {
          font-size: 22px;
          color: #1d3051;
        }
        .item-icon {
          &.no-max-width > img {
            max-width: none;
          }
          > img {
            display: block;
            margin: 0 auto;
            max-width: 128px;
            max-height: 128px;
          }
        }
        .item-btn {
          font-size: 16px;
          color: #10973c;
          > a {
            color: #10973c;
          }
        }
      }
    }
  }
}
</style>
