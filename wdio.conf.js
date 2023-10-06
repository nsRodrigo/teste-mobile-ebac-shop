const { join } = require("path");
const allureReporter = require("@wdio/allure-reporter").default;
const allure = require("allure-commandline");

exports.config = {
    hotname: "localhost",
    port: 4723,
    path: "/wd/hub",
    specs: ["./test/specs/**/*.js"],
    maxInstances: 10,
    capabilities: [
        {
            platformName: "Android",
            "appium:platformVersion": "9.0",
            "appium:deviceName": "pixel-7-pro",
            "appium:automationName": "UIAutomator2",
            "appium:app": join(process.cwd(), "./app/android/loja-ebac.v12.apk"),
            "appium:appWaitActivity":
                "com.woocommerce.android.ui.login.LoginActivity",
        },
    ],
    framework: "mocha",
    waitforTimeout: 20000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    reporters: [
        "spec",
        [
            "allure",
            {
                outputDir: "allure-results",
                disableWebdriverStepsReporting: false,
                disableWebdriverScreenshotsReporting: false,
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
        await drive.takeScreenshot();
    },
};
