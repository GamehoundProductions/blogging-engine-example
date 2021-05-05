<template lang='pug'>
  #ArticlePreviewSkeleton
    .columns.p-0.m-0
      .column.is-3.pr-2
        b-skeleton(animation='wave' width='100%' height='120px')
      .column
        b-skeleton(animation='wave' width='100%' height='25px')
        b-skeleton.mt-2(animation='wave' width='50%' height='25px')
        b-skeleton.mt-2(animation='wave' width='20%' height='18px')
        b-skeleton.mt-2(animation='wave' width='40%' height='18px')
</template>

<script lang='ts'>
import {
  Component,
  Vue,
} from 'nuxt-property-decorator'


@Component({
  components: {
  }
})
export default class ArticlePreviewSkeleton extends Vue {
}
</script>

<style lang='scss' scoped>
</style>
