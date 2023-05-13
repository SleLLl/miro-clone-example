import { io, Socket, ManagerOptions, SocketOptions } from 'socket.io-client';

class SocketClient {
  private socket: Socket | undefined;
  private lazyEmit: Array<[event: string, args: any[]]> = [];
  private lazyOn: Array<[event: string, handler: (...args: any[]) => void]> = [];
  public isConnected = false;

  public init({ url }: Partial<ManagerOptions & SocketOptions>  & { url: string }) {
    if (this.socket) {
      return;
    }

    this.socket = io(url);
    this.socket.on('connect', () => {
      console.log(`Connected to server: ${url}`);
      this.isConnected = true;
      // Process any pending lazy emits
      this.processLazyEmit();
    });

    this.socket.on('disconnect', () => {
      console.log(`Disconnected from server: ${url}`);
      this.isConnected = false;
    });

    // Process any pending lazy listeners
    this.processLazyOn();
  }

  public on(event: string, handler: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.on(event, handler);
    } else {
      this.lazyOn.push([event, handler]);
    }
  }

  public off(event: string, handler: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.off(event, handler);
    }
  }

  public emit(event: string, ...args: any[]): void {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, ...args);
    } else {
      this.lazyEmit.push([event, args]);
    }
  }

  public disconnect(): void {
    if (this.socket && this.isConnected) {
      this.socket.disconnect();
    }
  }

  private processLazyOn(): void {
    if (this.socket) {
      this.lazyOn.forEach(([event, handler]) => {
        this.socket?.on(event, handler);
      });
      this.lazyOn = [];
    }
  }

  private processLazyEmit(): void {
    if (this.socket) {
      this.lazyEmit.forEach(([event, args]) => {
        this.socket?.emit(event, ...args);
      });
      this.lazyEmit = [];
    }
  }
}

export default new SocketClient();
