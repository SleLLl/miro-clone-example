import { Application, Container, FederatedPointerEvent, RenderTexture, Sprite, Point } from 'pixi.js';

import drawPoint from '../utils/drawPoint';
import hexColor from '../utils/hexColor';
import EventBus from '../eventBus';
export const PointWasDrawn = 'PointWasDrawn';
const mouseDraw = (app: Application, container: Container) => {
  let isDrawing = false;
  let lastPosition: Point;

  const renderTexture = RenderTexture.create({width: window.innerWidth, height: window.innerHeight});

  const sprite = new Sprite(renderTexture);


  const drawPointLine = (oldPos: Point, newPos: Point) => {
    const delta = {
      x: oldPos.x - newPos.x,
      y: oldPos.y - newPos.y
    };
    const deltaLength = Math.sqrt(delta.x ** 2 + delta.y ** 2);

    drawPoint(newPos.x, newPos.y, container, app, hexColor);

    EventBus.emit({
      type: PointWasDrawn,
      data: {
        x: newPos.x,
        y: newPos.y,
        color: hexColor,
      },
    });

    if (deltaLength >= 30 / 8) {
      const additionalPoints = Math.ceil(deltaLength / (30 / 8));

      for (let i = 1; i < additionalPoints; i++) {
        const pos = {
          x: newPos.x + delta.x * (i / additionalPoints),
          y: newPos.y + delta.y * (i / additionalPoints),
        };
        drawPoint(pos.x, pos.y, container, app, hexColor);
        EventBus.emit({
          type: PointWasDrawn,
          data: {
            x: pos.x,
            y: pos.y,
            color: hexColor,
          },
        });
      }
    }
  };


  const startDrawing = (event: FederatedPointerEvent) => {
    lastPosition = sprite.toLocal(event.global);
    isDrawing = true;
  };

  const drawLine = (event: FederatedPointerEvent) => {
    if (isDrawing) {
      const position = sprite.toLocal(event.global);
      drawPointLine(lastPosition, position);
      lastPosition = position;
    }
  };

  const stopDrawing = () => {
    isDrawing = false;
  };

  container.on('pointerdown', startDrawing);
  container.on('pointermove', drawLine);
  container.on('pointerup', stopDrawing);
  container.on('pointerout', stopDrawing);

  return () => {
    container.off('pointerdown', startDrawing);
    container.off('pointermove', drawLine);
    container.off('pointerup', stopDrawing);
    container.off('pointerout', stopDrawing);
  };

};

export default mouseDraw;
