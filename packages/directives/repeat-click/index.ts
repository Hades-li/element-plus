import { on, once } from '@element-plus/utils/dom'

export default {
  beforeMount(el, binding) {
    let interval = null
    let startTime
    const handler = () => binding.value && binding.value()
    const clear = () => {
      if (Date.now() - startTime < 100) {
        handler()
      }
      clearInterval(interval)
      interval = null
    }

    on(el, 'mousedown', e => {
      if ((e as any).button !== 0) return
      startTime = Date.now()
      once(document as any, 'mouseup', clear)
      clearInterval(interval)
      interval = setInterval(handler, 100)
    })
  },
}
