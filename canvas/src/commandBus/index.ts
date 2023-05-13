export interface Command {
  type: string;
  data?: any;
}

type CommandHandler = (command: Command) => void;

class CommandBus {
  private handlers: { [type: string]: CommandHandler } = {};

  registerHandler(type: string, handler: CommandHandler) {
    this.handlers[type] = handler;
  }

  execute(command: Command) {
    const handler = this.handlers[command.type];
    // console.log(command);
    if (handler) {
      handler(command);
    } else {
      console.error(`No handler registered for command of type "${command.type}"`);
    }
  }
}

export default new CommandBus();
