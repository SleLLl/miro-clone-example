import { Command } from './index';

import Core from '../core';
import drawPoint from '../utils/drawPoint';

export const DrawPointCommand = 'drawPointCommand';

const drawPointCommand = (command: Command) => {
  const { data } = command;
  if (Core.app && Core.container) {
    drawPoint(data.x, data.y, Core.container, Core.app, data.color);
  }
};

export default drawPointCommand;
