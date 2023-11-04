const { join } = require("path");
const allureReporter = require("@wdio/allure-reporter").default;
const allure = require("allure-commandline");


exports.config = {
    specs: ["./test/specs/**/*.js"],
    framework: "mocha",
    maxInstances: 10,
    /**
       * Configurações appium 
    
    hotname: "localhost",
    port: 4723,
    path: "/wd/hub",
    services: ['appium'],
    capabilities: [
        {
            "platformName": "Android",
            "appium:platformVersion": "9.0",
            "appium:deviceName": "pixel-7-pro",
            "appium:automationName": "UIAutomator2",
            "appium:app": join(process.cwd(), "./app/android/loja-ebac.v12.apk"),
            "appium:appWaitActivity":
            "com.woocommerce.android.ui.login.LoginActivity",
        },
    ],
*/

    /**
     * Configurações browserstack
    */

    user: "rodrigodonascime_0VdfNJ",
    key: "YA8JqDL8Vst11k46y7PJ",
    hostname: "hub.browserstack.com",
    services: [
        [
            "browserstack",
            {
                app: "bs://2a1db267301713f25cdb44eef84179bda3f11d1a",
                browserstackLocal: false,
            },
        ],
    ],
    capabilities: [{
        'bstack:options': {
            deviceName: 'Samsung Galaxy S22 Ultra',
            platformVersion: '12.0',
            platformName: 'android',
        }
    }],
    commonCapabilities: {
        'bstack:options': {
            projectName: "Meu primeiro teste com device farm",
            buildName: '1',
            sessionName: 'BStack parallel webdriverio-appium',
            debug: true,
            networkLogs: true
        }
    },

    waitforTimeout: 20000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    /** Configuração para reports */
    reporters: [
        "spec",
        [
            "video",
            {
                saveAllVideos: false, // If true, also saves videos for successful test cases
                videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
            },
        ],
        [
            "allure",
            {
                outputDir: "./_results_/allure-raw",
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: true,
            },
        ],
    ],
    mochaOpts: {
        timeout: 300000,
    },
    onComplete: function () {
        const reportError = new Error("Could not generate Allure report");
        const generation = allure(["generate", "allure-results", "--clean"]);
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(() => reject(reportError), 5000);

            generation.on("exit", function (exitCode) {
                clearTimeout(generationTimeout);

                if (exitCode !== 0) {
                    return reject(reportError);
                }

                console.log("Allure report successfully generated");
                resolve();
            });
        });
    },
    afterTest: async function (
        test,
        context,
        { error, result, duration, passed, retries }
    ) {
        if (error) {
            await browser.takeScreenshot();
        }
    },
};