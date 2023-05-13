import { useState } from 'react';
import Text from './icons/Text';
import Line from './icons/Line';
import Shapes from './icons/Shapes';
import Mouse from './icons/Mouse';
import EventBus from '../eventBus';

import './styles.scss';

export enum ToolBarItem {
  Mouse ='mouse',
  Shapes = 'squer',
  Text = 'text',
  Line = 'line',
}

const config = [
  {
    icon: <Mouse />,
    event: ToolBarItem.Mouse,
  },
  {
    icon: <Shapes />,
    event: ToolBarItem.Shapes,
  },
  {
    icon: <Line />,
    event: ToolBarItem.Line,
  },
  {
    icon: <Text />,
    event: ToolBarItem.Text,
  }
];

export const ToolbarItemWasSlickedEvent = 'ToolBarItemWasClicked';

const Toolbar = () => {
  const [active, setActive] = useState<string | undefined>();

  const onActive = (s: string) => () => {
    EventBus.emit({ type: ToolbarItemWasSlickedEvent, data: s })
    setActive(s);
  };

  return (
    <div className="toolbar_container">
      {config.map((item) => (
        <div
          key={item.event}
          className="toolbar_action-button"
          onClick={onActive(item.event)}
          data-active={active === item.event}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
};

export default Toolbar;

