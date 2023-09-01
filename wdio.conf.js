const { join } = require('path')

exports.config = {
    hotname: 'localhost',
    port: 4723,
    path: '/wd/hub',
    specs: [
        './test/specs/**/*.js'
    ],
    maxInstances: 10,
    capabilities: [{
        "platformName": "Android",
        "appium:platformVersion": "9.0",
        "appium:deviceName": "ebac-eq",
        "appium:automationName": "UIAutomator2",
        "appium:app": join(process.cwd(), './app/android/loja-ebac.v12.apk'),
        "appium:appWaitActivity": 'com.woocommerce.android.ui.login.LoginActivity',
    }],
    framework: 'mocha',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    reporters: ['spec'],
    mochaOpts: {
        timeout: 60000
    },
}
