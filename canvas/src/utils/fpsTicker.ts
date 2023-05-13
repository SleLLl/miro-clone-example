import { Text, Ticker } from 'pixi.js';
import Core from '../core';

const fpsTicker = () => {
  const fpsText = new Text('FPS: 0', {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff,
  });

  const ticker = Ticker.shared;
  Core.container && Core.container.addChild(fpsText);

  ticker.add(() => {
    // update the text object with the current frame rate
    fpsText.text = `FPS: ${Math.round(ticker.FPS)}`;
  });

  ticker.start();
}

export default fpsTicker;
