import { Application, Container } from 'pixi.js';
import initBackGround from './plagins/initBackGround';

class Core {
  app: Application | undefined;
  container: Container | undefined;
  root: HTMLDivElement | undefined;

  init(root: HTMLDivElement) {

    this.app = new Application({
      backgroundAlpha: 0,
      resizeTo: window,
    });

    this.container = initBackGround(this.app);
    this.root = root;
    this.root.appendChild(this.app.view as any);
  }

  destroy() {
    this.root?.removeChild(this.app?.view as any);
    this.app?.destroy();
    this.app = undefined;
    this.root = undefined;
    this.container = undefined;
  }
}

export default new Core();
