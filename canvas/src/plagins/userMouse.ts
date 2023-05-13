import { Container, FederatedPointerEvent, Sprite, Texture, Text } from 'pixi.js';
import hexColor from '../utils/hexColor';
import EventBus from '../eventBus';

export const UserMouseWasMoved = 'UserMouseWasMoved';

export const generateMouse = (container: Container, name: string, color: string, hide?: boolean): [Sprite, Text] => {

  const blob = new Blob([`
    <svg version="1.1" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg" viewBox="1064.7701 445.5539 419.8101 717.0565">
      <polygon fill="#${color}" points="1283.1857,1127.3097 1406.1421,1077.6322 1314.2406,850.1678 1463.913,852.7823 1093.4828,480.8547 1085.4374,1005.6964 1191.2842,899.8454" />
    </svg>
  `], {type: 'image/svg+xml'});

  const text = new Text(name, {
    fontFamily: 'Arial',
    fontSize: 12,
    fill: `0x${color}`,
    align: 'center',
  });

  const url = URL.createObjectURL(blob);
  const svgTexture = Texture.from(url);
  const mouse: Sprite = new Sprite(svgTexture);

  if (!hide) {
    container.addChild(mouse);
    container.addChild(text);
  }

  return [mouse, text];
};
const userMouse = (container: Container, name = 'User', hide?: boolean) => {
  const [mouse, text] = generateMouse(container, name, hexColor, hide);

  const mouseHandler = (e: FederatedPointerEvent) => {
    const x = e.clientX;
    const y = e.clientY;

    mouse.x = x + 10;
    mouse.y = y + 10;
    text.x = x + 25;
    text.y = y + 25;

    EventBus.emit({
      type: UserMouseWasMoved,
      data: {
        mouse: {x: mouse.x, y: mouse.y},
        text: {x: text.x, y: text.y},
        color: hexColor,
        name,
      }
    });
  };

  container.on('mousemove', mouseHandler);

  return () => {
    container.on('mousemove', mouseHandler);
  };
};

export default userMouse;
