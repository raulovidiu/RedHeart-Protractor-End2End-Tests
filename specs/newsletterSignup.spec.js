'use strict';

const HomePage = require('../page-objects/homePage.pageObject.js');
const NewsletterSignUp = require('../page-objects/newsletterSignUp.pageObject.js');
const LoginPage = require('../page-objects/loginPage.pageObject.js');
const faker = require('faker');

describe('Newsletter Signup Flow', () => {

	const homePage = new HomePage();
	const newsletterSignUp = new NewsletterSignUp();
	const loginPage = new LoginPage();
	const EC = protractor.ExpectedConditions;

	it('Navigate to HomePage', () => {
		homePage.visit();

		browser.wait(EC.elementToBeClickable(homePage.redHeartLogo));

		expect(browser.getCurrentUrl()).toBe(browser.params.baseUrl);
	});


	it('Scroll to the Footer Area', () => {
		browser.executeScript('arguments[0].scrollIntoView()', homePage.newsletterInp.getWebElement());

		homePage.newsletterInp.click().clear().sendKeys(faker.internet.email(), protractor.Key.ENTER);

		const val = newsletterSignUp.email.getAttribute('value');
		newsletterSignUp.confirmEmail.click().clear().sendKeys(val);

		newsletterSignUp.firstName.click().clear().sendKeys(faker.name.firstName());
		newsletterSignUp.lastName.click().clear().sendKeys(faker.name.lastName());
		newsletterSignUp.knitting.click();
		newsletterSignUp.crochet.click();

		browser.executeScript('arguments[0].scrollIntoView()', newsletterSignUp.signUp.getWebElement());

		newsletterSignUp.selectMonth('4');
		newsletterSignUp.selectDay(Math.floor((Math.random() * 30) + 1));
		newsletterSignUp.signUp.click();

		browser.wait(EC.elementToBeClickable(loginPage.firstName));
		expect(browser.getCurrentUrl()).toContain('/login');
		expect(homePage.successfullySignedUpForNewsletter).toBeVisible;
	});

});
