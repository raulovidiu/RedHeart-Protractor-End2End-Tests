'use strict';

const HomePage = require('../page-objects/homePage.pageObject.js');
const LoginPage = require('../page-objects/loginPage.pageObject.js');
const faker = require('faker');

describe('Create a New Customer Account', () => {

	const homePage = new HomePage();
	const loginPage = new LoginPage();
	const EC = protractor.ExpectedConditions;
	const pass = faker.internet.password() + 'C1';

  let userData = {
    fName: faker.name.firstName(),
    lName: faker.name.lastName(),
    email: faker.internet.email(),
    password: pass,
    password2: pass
  };


	it('Navigate to Homepage', () => {
		browser.get(browser.params.baseUrl);

		expect(browser.getTitle()).toBe('Red Heart Yarn | Yarn, Knitting Patterns, Crochet Patterns');
	});


	it('Go to Login Page', () => {
		homePage.joinSignin.click();

		expect(browser.getCurrentUrl()).toContain('/login');
	});


	it('Fill and Submit the Create an Account form', () => {
		loginPage.createAccount(userData);

		browser.wait(EC.elementToBeClickable(homePage.logOut));
		expect(browser.getCurrentUrl()).toContain('/accountSuccess');
	});

	it('Press Log Out on Account Success Page', () => {
		homePage.logOut.click();

		expect(browser.getCurrentUrl()).toBe(browser.params.baseUrl);
		expect(homePage.successfullyLogOutMessage).toBeVisible;
	});

});