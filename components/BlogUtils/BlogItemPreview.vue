<template lang='pug'>
  #BlogItemPreview
    article.media.columns.is-centered.is-multiline.p-0(
      :id='"previewArticle_" + id'
      ref="mainBox"
    )
      .column.is-3-desktop.is-full-mobile(
        @click='selectArticle()'
      )
        figure.image.is-1by1(ref="imgBox")
          img.left-img-padding(:src="coverImg")

      .column.is-full-mobile.media-content.pt-0
        .content.pl-3(
          @click='selectArticle()'
        )
          .columns.is-multiline
            .column.is-full
              h5.title.mb-2 {{title}}
            .column.is-full
              h5.subtitle {{subtitle}}
            .column.is-full
              p.author {{author.name}}
</template>

<script lang='ts'>
import {
  Component,
  Vue,
  Prop
} from 'nuxt-property-decorator'
import BlogMetadata from './BlogMetadata.vue'


@Component({
  components: {
    BlogMetadata,
  }
})
export default class BlogItemPreview extends Vue {
  @Prop({ type: String, default: 'https://blackmantkd.com/wp-content/uploads/2017/04/default-image-620x600.jpg' })
  readonly coverImg!: string

  @Prop({ type: String, required: true}) readonly id!: string
  @Prop({ type: String, required: true}) readonly title!: string
  @Prop({ type: String, default: ''}) readonly subtitle!: string
  @Prop({ type: Object, default: () => { return { name: '' }}})
  readonly author!: any // { name, twitter }
  @Prop({ type: String, default: ''}) readonly publishDate!: string
  @Prop({ type: String, default: null}) readonly url!: string

  selectArticle(): void {
    if (this.url && this.url.startsWith('http')) {
      window.open(this.url, '_blank')
      return
    }
    this.$router.push({
      query: {
        id: this.id.split('.md')[0]
      }
    })
  }

}
</script>

<style lang='scss' scoped>
</style>
