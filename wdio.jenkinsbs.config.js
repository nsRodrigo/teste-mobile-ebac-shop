const config = require("./wdio.shared.conf")
require('dotenv').config({
    path: `.env.test`,
    override: true
})

config.user = process.env.BS_USER
config.key = process.env.BS_KEY

config.specs = [

    './test/specs/**/*.js'

],
    config.capabilities = [
        {
            platformName: "Android",
            "appium:platformVersion": "9.0",
            "appium:deviceName": "Google Pixel 3a",
            "appium:automationName": "UIAutomator2",
            "appium:app": "bs://4f7eff665c6c23376a8feb58939d017073e74df9",
            "appium:autoGrantPermissions": true
        }
    ]

config.services = ['browserstack'];

exports.config = config;