import { Command } from './index';
import drawBox from '../utils/drawBox';
import Core from '../core';

export const DrawBoxCommand = 'DrawBoxCommand';

const drawBoxCommand = (command: Command) => {
  const { data } = command;
  Core.container && drawBox(data.x, data.y, Core.container);
};

export default drawBoxCommand;
