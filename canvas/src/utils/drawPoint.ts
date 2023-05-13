import { Container, Sprite, Graphics, Application } from 'pixi.js';

const drawPoint = (x: number, y: number, container: Container, app: Application, color: string) => {

  const dot = new Graphics()
    .beginFill(`0x${color}`, 1)
    .drawCircle(0, 0, 3)
    .endFill();

  const texture = app.renderer.generateTexture(dot);

  const sprite = new Sprite(texture);
  sprite.x = x;
  sprite.y = y;

  container.addChild(sprite);
}

export default drawPoint;
