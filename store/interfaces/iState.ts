import { get } from 'lodash'
import { requestStatus } from '@/constants'

// Note: "abstract" instead of interface can be used as a Default func factory
export abstract class AState {

  status: string = requestStatus.none
  error: string = ''

  /* Creates a Vuex 'getters' object for all the states defined in this (and
   * inherited parent) object.
   * return: a getter object (e.g. { stateName: (state) => state.stateName } )
   */
  makeGetters(): any {
    const getters: { [index: string]: any } = {}
    const obj: { [index: string]: any } = this
    Object.keys(obj).forEach(key => {
      getters[key] = (state: this) => get(state, key)
    })

    return getters
  }

  toJSON(): any {
    return Object.getOwnPropertyNames(this).reduce((a: any, b: any) => {
      a[b] = get(this, 'b', undefined)
      return a
    }, {})
  }
}
