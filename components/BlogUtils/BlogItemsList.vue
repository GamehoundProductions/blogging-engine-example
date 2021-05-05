<template lang='pug'>
  #BlogItemsList
    .columns.is-multiline.is-centered(
      v-for='entry in getInRange'
      v-if='entry && entry.id && !getEntryHidden(entry)'
    )
      .column.is-5
        BlogItemPreview(
          :key='"key_" + entry.id'
          :id='entry.id'
          :title='entry.title'
          :subtitle='entry.subtitle'
          :author='entry.author'
          :publishDate='entry.post_date'
        )
    .columns.is-multiline.is-centered.mt-3(
      :class='{ "is-hidden" : isLoadedAll }'
    )
      .column.is-5
        ArticlePreviewSkeleton#loadMore
</template>

<script lang='ts'>
import {
  Component,
  Vue,
  Prop
} from 'nuxt-property-decorator'
import { throttle } from 'lodash'
import BlogItemPreview from './BlogItemPreview.vue'
import ArticlePreviewSkeleton from './ArticlePreviewSkeleton.vue'
import { get } from 'lodash'


@Component({
  components: {
    BlogItemPreview,
    ArticlePreviewSkeleton
  }
})
export default class BlogItemsList extends Vue {
  @Prop({ type: Array, required: true}) readonly entries!: Array<any>
  @Prop({ type: Number, default: 7 }) readonly showRange!: number

  scrollY = 0
  last = this.showRange
  rangeStep = this.showRange


  mounted(): void {
    window.addEventListener('scroll', throttle(this.onScroll, 500))
  } //created


  onScroll(): void {
    this.scrollY = window.scrollY

    const target = document.getElementById('loadMore')
    if (!target) return
    var elementPosition = target.offsetTop
    var screenHeight = window.innerHeight
    var activationOffset = 0.9 // determines how far up the the page the element needs to be before triggering the function
    var activationPoint = elementPosition - (screenHeight * activationOffset)

    const bottomOfWindow = this.scrollY >= activationPoint
    if (!bottomOfWindow) return

    if (this.isLoadedAll) return
    else this.last += this.rangeStep
  } //onScroll


  getEntryHidden(entry: any): boolean {
    return get(entry, 'hidden', true)
  }

  get isLoadedAll(): boolean { return this.last >= this.entries.length }

  get getInRange(): Array<any> {
    return this.entries.slice(0, this.last)
  }

}
</script>

<style lang='scss' scoped>
</style>
