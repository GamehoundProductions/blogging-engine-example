import { AState } from '@/store/interfaces'
import { requestStatus } from '@/constants'

export class BlogState extends AState {
  blogList: Array<any> = []

  selectionStatus: string = requestStatus.none
  selectedBlog: any = {}
}

export default (): BlogState => new BlogState()
