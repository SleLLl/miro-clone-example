import { Container, FederatedPointerEvent } from 'pixi.js';
import drawBox from '../utils/drawBox';
import EventBus from '../eventBus';

export const BoxWasCreated = 'BoxWasCreated';

const boxHandler = (container: Container) => {
  const drawItem = (e: FederatedPointerEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    drawBox(x, y, container);
    EventBus.emit({
      type: BoxWasCreated,
      data: {
        x,
        y,
      },
    });
  };

  container.on('click', drawItem);

  return () => {
    container.off('click', drawItem);
  };
};

export default boxHandler;
