export const logger = {
  error: (message: any, ...args: any | null) => {
    const timestamp = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
    console.error(`[${timestamp}] *🔴 ERR - ${message}*`, ...args);
  },
  info: (message: any, ...args: any | null) => {
    const timestamp = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
    console.info(`[${timestamp}] *🔵 INFO - ${message}*`, ...args);
  },
  warn: (message: any, ...args: any | null) => {
    const timestamp = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
    console.warn(`[${timestamp}] *🟡 WARN - ${message}*`, ...args);
  },
  log: (message: any, ...args: any | null) => {
    const timestamp = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
    console.log(`[${timestamp}] *🟢 LOG - ${message}*`, ...args);
  },
};

global.logger = logger;
