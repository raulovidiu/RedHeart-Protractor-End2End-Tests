'use strict';

const SpecReporter = require('jasmine-spec-reporter');
const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

module.exports.config = {
	framework: 'jasmine2',

	// seleniumAddress: 'http://localhost:4444/wd/hub',

	directConnect: true,

  suites: {
    smoke: [
      // './specs/authenticateExistingCustomer.spec.js',
      './specs/createNewCustomerAccount.spec.js'
    ],
    sanity: [
      './specs/placeOrderAsGuest.spec.js',
      './specs/placeOrderAfterCreatingAnAccount.spec.js'
    ],
    regression: [
      // './specs/newsletterSignup.spec.js',
      // './specs/insertAddressIntoAddressBook.spec.js',
			// './specs/saleCategory.spec.js',
			'./specs/findTheMostExpensiveYarn.spec.js'
    ]
  },

  multiCapabilities: [
    {
      shardTestFiles: true,
      maxInstances: 3,
      browserName: 'chrome'
    }
  ],

	onPrepare() {
  	browser.ignoreSynchronization = true;
    browser.driver.manage().window().setSize(1400, 900);
    browser.driver.manage().window().maximize();

    jasmine.getEnv().addReporter(new SpecReporter({
      displayFailuresSummary: true,
      displayFailedSpec: true,
      displayPendingSpec: true,
      displaySuiteNumber: true,
      displaySpecDuration: true,
      colors: {
        success: 'green',
        failure: 'red',
        pending: 'yellow'
      },
      prefixes: {
        success: '✓ ',
        failure: '✗ ',
        pending: '* '
      }
    }));

    jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
      takeScreenshots: true,
   		// takeScreenshotsOnlyOnFailures: true
      fixedScreenshotName: true,
      savePath: './reports/',
      screenshotsFolder: './screenshots'
    }));
	},

	jasmineNodeOpts: {
    onComplete: null,
    isVerbose: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000, // wait time in ms before test fails
    print: function () {} // to print Jasmine results
  },

	params: {
		baseUrl: 'http://172.18.4.44:9001/',

		// Azure DEV Env:
		// http://azusrhapdv01.eastus.cloudapp.azure.com:9001/

    // Data to be used for Place Order scenarios
		existingCustomer: {
			firstName: 'Automation',
			lastName: 'AutoUser',
			email: 'automation@user.com',
			password: 'Password1'
		},

    // Data to be used for My Account section scenarios
    existingCustomer2: {
      firstName: 'Automation2',
      lastName: 'AutoUser2',
      email: 'automation2@user.com',
      password: 'Password1'
    }
  }
};
