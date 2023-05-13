import { Command } from './index';

import Core from '../core';
import { generateMouse } from '../plagins/userMouse';

const map = new Map();
export const MoveMouseCommand = 'moveMouseCommand';

const moveMouseCommand = (command: Command) => {
  const { data } = command;
  if (!(Core.app && Core.container)) {
    return;
  }

  const [mouse, text] = map.has(data.name) ? map.get(data.name) : generateMouse(Core.container, data.name, data.color);
  mouse.x = data.mouse.x;
  mouse.y = data.mouse.y;
  text.x = data.text.x;
  text.y = data.text.y;

  map.set(data.name, [mouse, text]);
};

export default moveMouseCommand;
