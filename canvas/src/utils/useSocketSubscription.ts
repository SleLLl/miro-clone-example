import { useEffect } from 'react';
import SocketClient from '../socketClient';
import CommandBus from '../commandBus';
import EventBus, { BusEvent } from '../eventBus';
import { BoxWasCreated } from '../plagins/boxHandler';
import { PointWasDrawn } from '../plagins/mouseDraw';
import { UserMouseWasMoved } from '../plagins/userMouse';
import { DrawBoxCommand } from '../commandBus/drawBoxCommand';
import { DrawPointCommand } from '../commandBus/drawPointCommand';
import { MoveMouseCommand } from '../commandBus/moveMouseCommand';


const emitAll = () => {
  const emitMouseMove = ({data}: BusEvent) => {
    SocketClient.emit(UserMouseWasMoved, data);
  };

  const emitBoxWasCreated = ({data}: BusEvent) => {
    SocketClient.emit(BoxWasCreated, data);
  };

  const emitPointWasDrawn= ({data}: BusEvent) => {
    SocketClient.emit(PointWasDrawn, data);
  };

  EventBus.on(BoxWasCreated, emitBoxWasCreated);
  EventBus.on(UserMouseWasMoved, emitMouseMove);
  EventBus.on(PointWasDrawn, emitPointWasDrawn);

  return () => {
    EventBus.off(UserMouseWasMoved, emitMouseMove);
    EventBus.off(BoxWasCreated, emitBoxWasCreated);
    EventBus.off(PointWasDrawn, emitPointWasDrawn);
  }
}

const onAll = () => {
  const onMouseMove = (data: { mouse: { x: number, y: number }, text: { x: number, y: number }, color: string, name: string }) => {
    CommandBus.execute({
      type: MoveMouseCommand,
      data,
    })
  };

  const onBoxWasCreated = ({ x, y }: { x: number, y: number }) => {
    CommandBus.execute({
      type: DrawBoxCommand,
      data: { x, y },
    })
  };

  const onPointWasDrawn = ({ x, y, color, }: { x: number, y: number, color: string }) => {
    CommandBus.execute({
      type: DrawPointCommand,
      data: { x, y, color },
    })
  };

  SocketClient.on(BoxWasCreated, onBoxWasCreated);
  SocketClient.on(PointWasDrawn, onPointWasDrawn);
  SocketClient.on(UserMouseWasMoved, onMouseMove);

  return () => {
    SocketClient.off(BoxWasCreated, onBoxWasCreated);
    SocketClient.off(PointWasDrawn, onPointWasDrawn);
    SocketClient.off(UserMouseWasMoved, onMouseMove);
  }
}

const useSocketSubscription = () => {
  useEffect(() => {
    const unsubEmit = emitAll();
    const unsubOn = onAll();

    return () => {
      unsubEmit();
      unsubOn();
    };
  }, []);
};

export default useSocketSubscription;
