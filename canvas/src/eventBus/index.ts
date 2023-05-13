export interface BusEvent {
  type: string;
  data?: any;
}

class EventBus {
  private listeners: { [type: string]: ((event: BusEvent) => void)[] } = {};

  on(type: string, listener: (event: BusEvent) => void) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }

    this.listeners[type].push(listener);
  }

  off(type: string, listener: (event: BusEvent) => void) {
    if (this.listeners[type]) {
      const index = this.listeners[type].indexOf(listener);
      if (index !== -1) {
        this.listeners[type].splice(index, 1);
      }
    }
  }

  emit(event: BusEvent) {
    // console.log('new coming event',event);
    if (this.listeners[event.type]) {
      this.listeners[event.type].forEach(listener => {
        listener(event);
      });
    }
  }
}

export default new EventBus();
