export type Listener = (type: string, payload: any) => void;
type ListenerCallback = (payload: any) => void;

export default class Hub {
  listeners: { [x: string]: ListenerCallback } = {};

  on(type: string, listener: ListenerCallback) {
    if (!this.listeners) {
      this.listeners = {};
    }

    this.listeners[type] = listener;
    console.debug("HUB/on", type, listener, this);
  }

  off(type: string) {
    if (!this.listeners) {
      this.listeners = {};
    }

    this.listeners[type] = undefined;
    console.debug("HUB/off", type, this);
  }

  process(type: string, payload: any) {
    if (!this.listeners) {
      this.listeners = {};
    }

    const listener = this.listeners[type];
    if (listener) {
      listener(payload);
    }
  }
}
