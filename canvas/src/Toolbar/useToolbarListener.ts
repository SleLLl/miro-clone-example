import { useEffect } from 'react';
import Core from '../core';
import mouseDraw from '../plagins/mouseDraw';
import boxHandler from '../plagins/boxHandler';
import EventBus, { BusEvent } from '../eventBus';
import { ToolBarItem, ToolbarItemWasSlickedEvent } from './index';

const useToolbarListener = () => {

  useEffect(() => {
    let unsubsribe: () => void;
    const listener = ({ data }: BusEvent) => {
      unsubsribe?.();
      if (Core.app && Core.container) {
        if (data === ToolBarItem.Mouse) {
          unsubsribe = mouseDraw(Core.app, Core.container)
        }

        if (data === ToolBarItem.Shapes) {
          unsubsribe = boxHandler(Core.container)
        }
      }
    };

    EventBus.on(ToolbarItemWasSlickedEvent, listener);

    return () => {
      unsubsribe?.();
      EventBus.off(ToolbarItemWasSlickedEvent, listener);
    }
  }, []);
};

export default useToolbarListener;
