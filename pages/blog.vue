<template lang='pug'>
  #Blog
    .columns.is-centered
      .column.is-5.mb-4
        BlogNavbar

    template(
      v-if='!selectedArticleId'
    )
      BlogItemsList(
        :entries='blogList || []'
      )

    template(v-if='selectedArticleId && articleId')
      ArticleSkeleton(
        v-if='selectionStatus === requestStatus.loading'
      )
      BlogArticle(
        v-if='selectionStatus !== requestStatus.loading && selectedBlog'
        :article='selectedBlog'
      )
</template>

<script lang='ts'>
import {
  Component,
  Vue,
  namespace,
  Watch
} from 'nuxt-property-decorator'
import { get, find } from 'lodash'
import {
  BlogNavbar,
  BlogItemsList,
  BlogArticle,
  ArticleSkeleton,
} from '@/components/BlogUtils'
import {
  BLOG_LIST_REQUEST,
  BLOG_SELECT_REQUEST,
  BLOG_SELECT_CLEAR
} from '@/store/blog/actionTypes'
import { requestStatus } from '@/constants'

const blogModule = namespace('blog')


@Component({
  components: {
    BlogNavbar,
    BlogItemsList,
    BlogArticle,
    ArticleSkeleton,
    BlogNewsletterForm
  }
})
export default class Blog extends Vue {

  @blogModule.Getter blogList!: Array<any>
  @blogModule.Getter selectedBlog!: any
  @blogModule.Getter selectionStatus!: string

  head (): any {
    return {
      title: 'Blog',
      meta: [
      ],
    }//return
  } //head


  async mounted(): Promise<void> {
    this.getArticle()
  }

  async getArticle(): Promise<void> {
    await this.$store.dispatch(`blog/${BLOG_LIST_REQUEST}`)
    if (this.selectedArticleId) {
      const article = find(this.blogList, (o: any) => o.id === this.selectedArticleId + '.md')
      if (!article) {
        console.debug(`Article ${this.selectedArticleId} not found!`)
        return
      }
      this.$store.dispatch(`blog/${BLOG_SELECT_REQUEST}`, article)
    }
  }


  get currentPage(): string {
    return get(this.$route, 'query.page', '')
  }


  get articleId(): string {
    return get(this.$route, 'query.id', '')
  }


  get selectedArticleId(): string  {
    return get(this.$route, 'query.id', undefined)
  }


  get requestStatus(): string { return requestStatus }


  @Watch('$route', { immediate: true })
  onUrlChange(newVal: any): void {
    if (get(newVal, 'query.id', undefined))
      this.getArticle()
    else
      this.$store.dispatch(`blog/${BLOG_SELECT_CLEAR}`)
  }
}
</script>

<style lang='scss'>
</style>
