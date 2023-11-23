import winston, { format, addColors, createLogger } from 'winston';
import { config } from '../constants';
import { getLogMessage } from '../utills';
const {LOGGER} = config
const { combine, timestamp, printf, colorize, simple } = format;

export const logger = createLogger({
  transports: [
    new winston.transports.Console({
      format: combine(
        timestamp({
          format: LOGGER.FORMAT,
        }),
        simple(),
        printf(getLogMessage),
        colorize({ all: true })
      ),
    }),
  ],
});
addColors(LOGGER.COLORS);


