const { createLogger, transports, format, level } = require('winston')

// ----logging function--------

const testLogger = createLogger({
    transports: [
        new transports.File({
            filename: 'test.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),
        // for error
        new transports.File({
            filename: 'test-error.log',
            level: 'error',
            format: format.combine(format.timestamp(), format.json())
        })

    ]
})

module.exports = { testLogger }