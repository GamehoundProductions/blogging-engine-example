<template lang='pug'>
  #ArticleSkeleton
    .columns.is-centered
      .column.is-6
        b-skeleton(animation='wave' width='100%' height='25px')
        b-skeleton.mt-3(animation='wave' width='35%' height='45px')
        b-skeleton.mt-1(animation='wave' width='50%' height='25px')
        b-skeleton.mt-1(animation='wave' width='80%' height='25px')
        b-skeleton.mt-1(animation='wave' width='60%' height='25px')
        b-skeleton.mt-1(animation='wave' width='70%' height='25px')
        b-skeleton.mt-4(animation='wave' width='100%' height='150px')
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
export default class ArticleSkeleton extends Vue {
}
</script>

<style lang='scss' scoped>
</style>
