const winston = require('winston');
const { combine, timestamp, printf } = winston.format;

exports.logger = winston.createLogger({
    level: 'info',
    format: combine(timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A'
    }), 
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)),
    transports: [new winston.transports.File({
        filename: './src/logs/combined.log'
    }),
    new winston.transports.File({
        filename: './src/logs/error.log',
        level: 'error'
    })]
});

