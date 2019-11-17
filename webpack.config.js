module.exports = (env) => {
  console.log("[INFO] Working in " + env + "environment.")
  return require(`./webpack.${env}.js`)
}