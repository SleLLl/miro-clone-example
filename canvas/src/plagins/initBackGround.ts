import { Application, Container, Graphics, Sprite, Texture } from 'pixi.js';

const addDots = (app: Application, container: Container) => {
  const dot = new Graphics()
    .beginFill(0xe4e5e4, 1)
    .drawCircle(0, 0, 4)
    .endFill();

  const texture = app.renderer.generateTexture(dot);
  const stepX = app.screen.width / 12;
  const stepY = app.screen.height / 12;

  for (let i = 0; i < app.screen.width; i = i + stepX) {
    for (let j = 0; j < app.screen.height; j = j + stepY) {
      const sprite = new Sprite(texture);
      sprite.position.x = i;
      sprite.position.y = j;
      container.addChild(sprite);
    }
  }
};

const initBackGround = (app: Application) => {
  const container = new Container();
  const bg = new Sprite(Texture.WHITE);
  bg.width = app.screen.width;
  bg.height = app.screen.height;
  bg.tint = 0xf2f2f2;
  container.addChild(bg);
  addDots(app, container);
  container.interactive = true;
  app.stage.addChild(container);
  return container;
};

export default initBackGround;
