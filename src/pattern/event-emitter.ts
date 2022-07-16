type EventMap = Record<string, any>
type EventKey<T extends EventMap> = string & keyof T
type EventReceiver<T> = (params: T) => void

// type FnNoParam = () => void
// type FnParam = (a: string) => void

interface EventEmitter<T extends EventMap> {
  on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void
  off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void
  emit<K extends EventKey<T>>(eventName: K, params: T[K]): void
}

class EventEmitterImpl<T extends EventMap> implements EventEmitter<T> {
  #events: {
    [K in keyof EventMap]: Array<(p: EventMap[K]) => void>
  }
  constructor() {
    this.#events = {}
  }
  on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
    if (!this.#events[eventName]) {
      this.#events[eventName] = []
    }
    this.#events[eventName].push(fn)
  }
  off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
    if (!this.#events[eventName]) {
      return
    }
    this.#events[eventName] = this.#events[eventName].filter(f => f !== fn)
  }
  emit<K extends EventKey<T>>(eventName: K, params: T[K]): void {
    if (!this.#events[eventName]) {
      return
    }
    this.#events[eventName].forEach(f => f(params))
  }
}

export default new EventEmitterImpl()
