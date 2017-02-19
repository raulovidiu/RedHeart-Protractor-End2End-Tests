'use strict';

const HomePage = require('../page-objects/homePage.pageObject.js');
const LoginPage = require('../page-objects/loginPage.pageObject.js');
const EC = protractor.ExpectedConditions;

describe('Authenticate Process - Valid / Existing Customer', () => {

	const homePage = new HomePage();
	const loginPage = new LoginPage();


	it('Navigate to Homepage', () => {
		homePage.visit();

		expect(homePage.redHeartLogo.isDisplayed()).toBe(true);
	});

	it('Click the Sign In Button', () => {
		homePage.joinSignin.click();

		expect(browser.getCurrentUrl()).toContain('/login');
	});


	it('Provide Valid Credentials and Authenticate', () => {
		loginPage.customerEmail.click().clear().sendKeys(browser.params.existingCustomer.email);
		loginPage.customerPassword.click().clear().sendKeys(browser.params.existingCustomer.password);
		loginPage.customerLogin.click();

		browser.wait(EC.elementToBeClickable(homePage.logOut));
		expect(browser.getCurrentUrl()).toEqual(browser.params.baseUrl);
	});


	it('Log Out', () => {
		homePage.logOut.click();

		expect(browser.getCurrentUrl()).toBe(browser.params.baseUrl);
		expect(homePage.successfullyLogOutMessage).toBeVisible;
	});

});
