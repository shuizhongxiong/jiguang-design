<template>
  <div>
    <home-header :currentAnchor="currentAnchor" @anchor="anchorChange"></home-header>
    <home-content :anchor="anchor" @currentAnchor="currentAnchorChange"></home-content>
    <home-footer></home-footer>
  </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeContent from './components/Content'
import HomeFooter from './components/Footer'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeContent,
    HomeFooter
  },
  data () {
    return {
      anchor: '',
      currentAnchor: ''
    }
  },
  methods: {
    anchorChange (anchor) {
      this.anchor = anchor
    },
    currentAnchorChange (currentAnchor) {
      this.currentAnchor = currentAnchor
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
