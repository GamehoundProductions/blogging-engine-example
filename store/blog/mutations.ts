import {
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_SELECT_REQUEST,
  BLOG_SELECT_SUCCESS,
  BLOG_SELECT_FAIL,
  BLOG_SELECT_CLEAR
} from './actionTypes'
import { BlogState } from './state'
import { requestStatus } from '@/constants'


export default {
  [BLOG_LIST_REQUEST]: (state: BlogState): void => {
    state.status = requestStatus.loading
  },


  [BLOG_LIST_SUCCESS]: (state: BlogState, entries: Array<any>): void => {
    state.status = requestStatus.success
    state.blogList = entries
  },

  [BLOG_LIST_FAIL]: (state: BlogState, error: Error): void => {
    state.status = requestStatus.error
    state.error = error.message
  },


  [BLOG_SELECT_REQUEST]: (state: BlogState): void => {
    state.selectionStatus = requestStatus.loading
  },

  [BLOG_SELECT_SUCCESS]: (state: BlogState, entries: Array<any>): void => {
    state.selectionStatus = requestStatus.success
    state.selectedBlog = entries
  },

  [BLOG_SELECT_FAIL]: (state: BlogState, error: Error): void => {
    state.selectionStatus = requestStatus.error
    state.error = error.message
  },

  [BLOG_SELECT_CLEAR]: (state: BlogState): void => {
    state.selectedBlog = {}
  },
}
