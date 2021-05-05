import axios from 'axios'
import { get } from 'lodash'
import {
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_SELECT_REQUEST,
  BLOG_SELECT_SUCCESS,
  BLOG_SELECT_FAIL,
  BLOG_SELECT_CLEAR
} from './actionTypes'


export default {
  [BLOG_LIST_REQUEST]: ({ commit }: any): Promise<any> => {
    commit(BLOG_LIST_REQUEST)
    const url = process.env.ghg_blog_entries
    if (!url) {
      const msg = `Blog URL is not set for Action ${BLOG_LIST_REQUEST}`
      console.warn(msg)
      return Promise.reject(new Error(msg))
    }

    return axios.get(url).then((resp: any) => {
      const entries = get(resp, 'data.entries', [])
      commit(BLOG_LIST_SUCCESS, entries)
      return Promise.resolve({ data: entries })
    }).catch((error: Error) => {
      if(process.env.NODE_ENV === 'development')
        console.debug(`${BLOG_LIST_REQUEST} failed: ${error.message}`)
      commit(BLOG_LIST_FAIL, error)
      return Promise.reject(error)
    })
  }, //BLOG_LIST_REQUEST

  [BLOG_SELECT_REQUEST]: ({ commit }: any, article: any): Promise<any> => {
    commit(BLOG_SELECT_REQUEST)
    let url = process.env.ghg_blog_article
    if (!url || !article.id) {
      const msg = `Blog URL is not set for Action ${BLOG_SELECT_REQUEST} or articleId is missing!`
      console.warn(msg)
      return Promise.reject(new Error(msg))
    }

    url = `${url}/${article.id.split('.md')[0]}.md`

    return axios.get(url).then((resp: any) => {
      const content = {
        ...article,
        content: get(resp, 'data', '')
      }
      commit(BLOG_SELECT_SUCCESS, content)
      return Promise.resolve({ data:  content })
    }).catch((error: Error) => {
      if(process.env.NODE_ENV === 'development')
        console.debug(`${BLOG_SELECT_REQUEST} failed: ${error.message}`)
      commit(BLOG_SELECT_FAIL, error)
      return Promise.reject(error)
    })
  }, //BLOG_SELECT_REQUEST

  [BLOG_SELECT_CLEAR]: ({ commit }: any): any => {
    commit(BLOG_SELECT_CLEAR)
  }
}
