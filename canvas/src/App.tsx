import { useEffect, useRef } from 'react';
import Toolbar from './Toolbar';
import Core from './core';
import useToolbarListener from './Toolbar/useToolbarListener';
import userMouse from './plagins/userMouse';
import CommandBus from './commandBus';
import drawPointCommand, { DrawPointCommand } from './commandBus/drawPointCommand';
import drawBoxCommand, { DrawBoxCommand } from './commandBus/drawBoxCommand';
import useSocketSubscription from './utils/useSocketSubscription';
import moveMouseCommand, { MoveMouseCommand } from './commandBus/moveMouseCommand';
import generateRandomName from './utils/generateRandomName';
import fpsTicker from './utils/fpsTicker';
import SocketClient from './socketClient';

const App = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    SocketClient.init({ url: 'http://localhost:8080/' });
    root && Core.init(root);
    const unsub = Core.container && userMouse(Core.container, generateRandomName(), true);

    CommandBus.registerHandler(DrawPointCommand, drawPointCommand);
    CommandBus.registerHandler(DrawBoxCommand, drawBoxCommand);
    CommandBus.registerHandler(MoveMouseCommand, moveMouseCommand);
    fpsTicker();

    return () => {
      Core.destroy();
      unsub?.();
      SocketClient.disconnect();
    };
  }, []);

  useToolbarListener();
  useSocketSubscription();

  return (
    <div ref={ref} className="canvas-wrapper">
      <Toolbar/>
    </div>
  );
};

export default App;




