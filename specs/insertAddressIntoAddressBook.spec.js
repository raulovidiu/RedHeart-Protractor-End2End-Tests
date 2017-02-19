'use strict';

const HomePage = require('../page-objects/homePage.pageObject.js');
const LoginPage = require('../page-objects/loginPage.pageObject.js');
const AddressBook = require('../page-objects/addressBook.pageObject.js');
const faker = require('faker');
const EC = protractor.ExpectedConditions;

describe('Insert a New Address into Address Book from My Profile', () => {

	const homePage = new HomePage();
	const loginPage = new LoginPage();
	const addressBook = new AddressBook();


	it('Navigate to Homepage', () => {
		browser.get(browser.params.baseUrl);

		expect(browser.getTitle()).toBe('Red Heart Yarn | Yarn, Knitting Patterns, Crochet Patterns');
	});


	it('Go to Login Page', () => {
		homePage.joinSignin.click();

		expect(browser.getCurrentUrl()).toContain('/login');
	});


	it('Authenticate', () => {
		loginPage.customerEmail.click().clear().sendKeys(browser.params.existingCustomer2.email);
		loginPage.customerPassword.click().clear().sendKeys(browser.params.existingCustomer2.password);
		loginPage.customerLogin.click();

		browser.wait(EC.elementToBeClickable(homePage.logOut));

		expect(browser.getCurrentUrl()).toEqual(browser.params.baseUrl);
	});


	it('Navigate to My Profile Section', () => {
		homePage.accountLink.click();

		browser.wait(EC.elementToBeClickable(addressBook.addresses));

		expect(addressBook.addresses.isDisplayed()).toBe(true);
		expect(browser.getCurrentUrl()).toContain('/my-account');
	});


	it('Access Address Book Section', () => {
		addressBook.addresses.click();

		browser.wait(EC.elementToBeClickable(addressBook.addNewAddress));

		expect(addressBook.addNewAddress.isDisplayed()).toBe(true);
		expect(browser.getCurrentUrl()).toContain('/my-account/address-book');
	});


	it('Click Add New Address', () => {
		addressBook.addNewAddress.click();

		browser.wait(EC.elementToBeClickable(addressBook.saveUpdates));

		expect(addressBook.saveUpdates.isDisplayed()).toBe(true);
		expect(browser.getCurrentUrl()).toContain('/my-account/add-address');
	});


	it('Fill the Add Address Form and Save the Updates', () => {
		addressBook.selectCountry('US');
		addressBook.firstName.click().clear().sendKeys(faker.name.firstName());
		addressBook.lastName.click().clear().sendKeys(faker.name.lastName());
		addressBook.address1.click().clear().sendKeys(faker.address.streetAddress(true));
		addressBook.address2.click().clear().sendKeys(faker.address.streetAddress(true));
		addressBook.city.click().clear().sendKeys(faker.address.city());
		addressBook.selectState('US-MA');
		addressBook.zip.click().clear().sendKeys(faker.address.zipCode());

		browser.executeScript('arguments[0].scrollIntoView()', addressBook.saveUpdates.getWebElement());
		addressBook.saveUpdates.click();

		browser.wait(EC.elementToBeClickable(addressBook.addressCreatedSuccess));

		expect(addressBook.addressCreatedSuccess.isDisplayed()).toBe(true);
		expect(browser.getCurrentUrl()).toContain('/my-account/address-book');
	});

});
