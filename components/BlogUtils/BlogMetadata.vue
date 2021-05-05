<template lang='pug'>
  #BlogMetadata.metadata
    .columns
      .column
        | {{formatSimpleDate(publishDate)}}
        BIconShareFill.share-btn.ml-4(
          scale='1.3'
          @click='() => $emit("share")'
        )
</template>

<script lang='ts'>
import {
  Component,
  Vue,
  Prop,
  // namespace
} from 'nuxt-property-decorator'
import { BIconShareFill } from 'bootstrap-vue'

// const blogModule = namespace('blog')

@Component({
  components: {
    BIconShareFill,
  }
})
export default class BlogMetadata extends Vue {
  @Prop({ type: String, default: ''}) readonly publishDate!: string

  formatSimpleDate(d: any): string {
    const date = this.$dayjs(d)
    if (!date.date()) return ''
    return date.format('MMM D, YYYY') || ''
  }
}
</script>

<style lang='scss' scoped>
  .share-btn {
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    z-index: 10;

    &:hover {
      transform: scale(1.1);
    }
  }

  .metadata {
    font-size: 12px;
  }
</style>
