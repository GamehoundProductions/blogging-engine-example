<template lang='pug'>
  #BlogArticle
    .columns.is-multiline.is-centered
      .column.is-5(
        v-if='isLoading'
      )
        ArticleSkeleton
      .column.is-6.py-4(
        v-else
      )
        .columns.is-multiline(
          :class='{ "is-hidden": isLoading }'
        )
          .column.is-full.content
            h2.m-0 {{article.title}}
          .column.is-6.has-text-left.mb-3
            a(
              v-if='author.name'
              :href='author.twitter'
              target='_blank'
            ) @{{author.name}}

          .column.is-full
            article.content
              vue-markdown(
                :class='{ "is-hidden": isLoading }'
                :source='article.content'
                :html='true'
              )
</template>

<script lang='ts'>
import {
  Component,
  Vue,
  Prop,
  namespace
} from 'nuxt-property-decorator'
import { get } from 'lodash'
import VueMarkdown from 'vue-markdown'
import BlogMetadata from './BlogMetadata.vue'
import ArticleSkeleton from './ArticlePreviewSkeleton.vue'

// import * as Prism from 'prismjs'
const Prism = require('prismjs')
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-markup'

const blogModule = namespace('blog')


@Component({
  components: {
    VueMarkdown,
    BlogMetadata,
    ShareLinksModal,
    ArticleSkeleton,
  }
})
export default class BlogArticle extends Vue {
  @Prop({ type: Object, required: true }) readonly article!: any
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean

  @blogModule.Getter selectedBlog!: any

  isShareList = false
  shareMetadata = { url: '', title: ''}
  renderTimeout: any = null // to show loading while vue-markdown is rendering


  mounted(): void {
    Prism.highlightAll()

    this.clearRenderTimeout()
    this.renderTimeout = setTimeout(() => {
      this.clearRenderTimeout()
    }, 1000)
  }


  beforeDestroy(): void {
    this.clearRenderTimeout()
  }


  clearRenderTimeout(): void {
    if (this.renderTimeout !== null)
      clearTimeout(this.renderTimeout)
    this.renderTimeout = null
  }


  get isLoading(): boolean {
    return this.renderTimeout !== null || this.loading
  }


  get author(): any { return get(this.selectedBlog, 'author', { name: '', twitter: '' })}
}
</script>

<style lang='scss'>
  @import '@/assets/styles/utils.scss';

  .columns, .column {
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
    padding-right: 0;
  }

  .content p:not(:last-child) {
    margin-bottom: 1.8em !important;
  }

  @media only screen and (max-width: 768px) {
    article {
      p {
        font-size: 18px;
      }
    }
  }
</style>
