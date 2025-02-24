// logger.js
import winston from "winston";

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    // Hibák esetén írhatod log fájlba is
    new winston.transports.File({ filename: "errors.log", level: "error" }),
  ],
});

export default logger;
