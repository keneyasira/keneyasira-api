import { Config } from '@config/default';
import { Injectable, LoggerService } from '@nestjs/common';
import clc from 'cli-color';
import { inspect } from 'util';
import * as winston from 'winston';

function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

@Injectable()
export class ApplicationLoggerService implements LoggerService {
    private nestLikeColorScheme = new Map([
        ['error', clc.red],
        ['warn', clc.yellow],
        ['info', clc.blue],
        ['verbose', clc.cyan],
        ['debug', clc.magenta],
    ]);

    logger: winston.Logger;

    constructor(config: Config) {
        const addTraceId = winston.format((info) => ({
            ...info,
        }));

        this.logger = winston.createLogger({
            format:
                config.nodeEnv === 'production'
                    ? winston.format.combine(addTraceId(), winston.format.json())
                    : // nice output for the local env.
                      winston.format.combine(
                          winston.format.timestamp(),
                          this.nestLikeConsoleFormat(config.name),
                      ),
            transports: [
                new winston.transports.Console({
                    level: config.logger.level,
                    // create a dummy logger if it's disabled (it won't output anything!)
                    silent: !config.logger.enabled,
                }),
            ],
        });
    }

    nestLikeConsoleFormat = (appName: string) => {
        return winston.format.printf(({ context, level, timestamp, message, ...meta }) => {
            const lvlColor = this.nestLikeColorScheme.get(level) || clc.white;
            let formattedMsg =
                clc.green(`[${appName}] ${process.pid} `) +
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                (timestamp ? `${new Date(timestamp).toLocaleString()} ` : '') +
                `${lvlColor(capitalize(level))} ` +
                lvlColor(context ? `[${context}] ` : '') +
                lvlColor(message);

            // we don't want to display symbols which are added by winston
            // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#Symbols_and_for...in_iteration
            const cleanMeta: { [key: string]: unknown } = {};
            let numMeta = 0;

            for (const prop in meta) {
                cleanMeta[prop] = meta[prop];
                numMeta++;
            }

            if (numMeta > 0) {
                formattedMsg += `\n${inspect(cleanMeta, { colors: true })}`;
            }

            return formattedMsg;
        });
    };

    log(message: string): void {
        this.logger.info(message);
    }

    debug(message: string, meta?: unknown): void {
        this.logger.debug(message, meta);
    }

    info(message: string, meta?: unknown): void {
        this.logger.info(message, meta);
    }

    warn(message: string, meta?: unknown): void {
        this.logger.warn(message, meta);
    }

    error(message: string, meta?: unknown): void {
        this.logger.error(message, meta);
    }
}
