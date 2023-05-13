import { Container, Sprite, Texture } from 'pixi.js';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';

const drawBox = (x: number, y: number, container: Container) => {
  const box = Sprite.from(Texture.WHITE);
  box.filters = [new DropShadowFilter({ color: 0xa3a3a3, blur: 4, offset: { x: 3, y: 5 } })]
  box.width = 150;
  box.height = 200;

  box.tint = 0xfffaba;

  box.x = x;
  box.y = y;

  container.addChild(box);
}

export default drawBox;
