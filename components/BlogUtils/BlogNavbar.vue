<template lang='pug'>
  #BlogNavbar
    b-nav(:tabs='true')
      b-nav-item.border-0(
        class='is-back-tab'
        :class='{ "is-not-visible": !isShowBackBtn }'
        :disabled='!isShowBackBtn'
        @click='backToList()'
      ) < Back
      b-nav-item(
        :active='isLatestSelected'
        @click='backToList()'
      ) Latest

</template>

<script lang='ts'>
import {
  Component,
  Vue,
} from 'nuxt-property-decorator'
import { get } from 'lodash'


@Component({})
export default class BlogNavbar extends Vue {

  backToList(): void {
    this.$router.push({ path: '/blog' })
  }


  get isNewsletterSelected(): boolean {
    return get(this.$route, 'query.page', '') === 'newsletter'
  }


  get isLatestSelected(): boolean {
    return get(this.$route, 'query.id', undefined) !== undefined
  }


  get isShowBackBtn(): boolean {
    const id = get(this.$route, 'query.id', undefined)
    const page = get(this.$route, 'query.page', undefined)
    const state = (id !== undefined && id !== '') || page
    return state
  }

} //class
</script>

<style lang='scss' scoped>

</style>
