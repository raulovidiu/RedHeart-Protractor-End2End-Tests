'use strict';

const LoginPage = function () {
	// Create an Account Elements
	this.firstName = element(by.id('register.firstName'));
	this.lastName = element(by.id('register.lastName'));
	this.email = element(by.id('register.email'));
	this.password = element(by.id('password'));
	this.confirmPassword = element(by.id('register.checkPwd'));
	this.subscribeToNewsletter = element(by.css('label[for="Subscribe to newsletter"]'));
	this.register = element(by.buttonText('register'));

	// Returning Customer Elements
	this.customerEmail = element(by.id('j_username'));
	this.customerPassword = element(by.id('j_password'));
	this.customerForgottenPass = element(by.css('a.password-forgotten'));
	this.customerLogin = element(by.buttonText('login'));

	// Authentication of a Returning Customer
	this.authenticate = function () {
		this.customerEmail.click().clear().sendKeys(browser.params.existingCustomer.email);
		this.customerPassword.click().clear().sendKeys(browser.params.existingCustomer.password);
		this.customerLogin.click();
	};

	// Create an Account using Faker.js
	this.createAccount = function (userData) {
		this.firstName.sendKeys(userData.fName);
		this.lastName.sendKeys(userData.lName);
		this.email.sendKeys(userData.email);
		this.password.sendKeys(userData.password);
		this.confirmPassword.sendKeys(userData.password2);
		this.subscribeToNewsletter.click();
		this.register.click();
	};
};

module.exports = LoginPage;