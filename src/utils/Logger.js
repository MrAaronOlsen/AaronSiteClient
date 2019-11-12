export default class Logger {

  static info(message) {
    Logger.log("[INFO] " + message)
  }

  static error(message) {
    Logger.log("[ERROR] " + message)
  }

  static log(message) {
    console.log(message)
  }
}