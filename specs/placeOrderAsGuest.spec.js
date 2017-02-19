'use strict';

const HomePage = require('../page-objects/homePage.pageObject.js');
const LoginPage = require('../page-objects/loginPage.pageObject.js');
const Patterns = require('../page-objects/patterns.pageObject.js');
const ShippingPage = require('../page-objects/shippingPage.pageObject.js');
const BillingPage = require('../page-objects/billingPage.pageObject.js');
const PaymentPage = require('../page-objects/paymentPage.pageObject.js');
const faker = require('faker');
const EC = protractor.ExpectedConditions;


describe('Place Order - Guest User Flow', () => {

	const homePage = new HomePage();
	const loginPage = new LoginPage();
	const patterns = new Patterns();
	const shippingPage = new ShippingPage();
	const billingPage = new BillingPage();
	const paymentPage = new PaymentPage();

	const proceedToCheckoutBtn = element(by.id('checkoutButtonBottom'));
	const guestEmail = element(by.id('guest.email'));


	it('Navigate to Homepage', () => {
		homePage.visit();

		expect(homePage.redHeartLogo.isDisplayed()).toBe(true);
	});


	it('Choose Patterns from Mega Menu', () => {
		homePage.patternsMenu.click();

		expect(browser.getCurrentUrl()).toContain('/free-patterns')
	});


	it('Access a Pattern Product', () => {
		browser.executeScript('arguments[0].scrollIntoView()', patterns.firstPattern.getWebElement());

		patterns.firstPattern.click();

		expect(browser.getCurrentUrl()).toContain('free-patterns/irresistibly-hip-cowl');
	});


	it('Add a Pattern Product to Cart and Access Cart Page', () => {
		browser.executeScript('arguments[0].scrollIntoView()', patterns.buyFirstPattern.getWebElement());
		patterns.buyFirstPattern.click().then(function () {
			protractor.Key.ESCAPE;
		});

		homePage.cart.click().then(function () {
			return browser.getCurrentUrl();
		});

		expect(browser.getCurrentUrl()).toContain('/cart');
	});


	it('Proceed to Checkout', () => {
		proceedToCheckoutBtn.click().then(function () {
			browser.wait(EC.elementToBeClickable(guestEmail));
		});

		guestEmail.click().clear().sendKeys(faker.internet.email());
		guestEmail.sendKeys(protractor.Key.ENTER);

		expect(browser.getCurrentUrl()).toContain('checkout/multi/add-delivery-address');
	});


	it('Fill the Shipping Address Form and Continue to Billing Options Page', () => {
		shippingPage.firstName.click().clear().sendKeys(faker.name.firstName());
		shippingPage.lastName.click().clear().sendKeys(faker.name.lastName());
		shippingPage.selectCountry('FR');
		shippingPage.address1.click().clear().sendKeys(faker.address.streetAddress(true));
		shippingPage.address2.click().clear().sendKeys(faker.address.streetAddress(true));
		shippingPage.city.click().clear().sendKeys(faker.address.city());
		// shippingPage.selectState('AA');
		shippingPage.zip.click().clear().sendKeys(faker.address.zipCode());
		shippingPage.phoneNum.click().clear().sendKeys('5559854763');
		shippingPage.email.click().clear().sendKeys(faker.internet.email());
		shippingPage.selectDelivery('INTL-BMP');
		shippingPage.continueToBilling.click();

		browser.wait(EC.elementToBeClickable(billingPage.editShippingBtn));

		expect(billingPage.editShippingBtn.isDisplayed()).toBe(true);
	});


	it('Continue to Payment Options Page', () => {
		billingPage.continueToPayment.click();

		expect(paymentPage.placeOrder.isPresent()).toBe(true);
	});


	it('Provide Valid Credit Card Data and Place the Order', () => {
		browser.executeScript('arguments[0].scrollIntoView()', paymentPage.placeOrder.getWebElement());

		paymentPage.selectCard('visa');
		paymentPage.cardNumber.click().clear().sendKeys('4111111111111111');
		paymentPage.selectMonth('04');
		paymentPage.selectYear('2018');
		paymentPage.securityCode.click().clear().sendKeys('234');
		paymentPage.placeOrder.click();

		browser.wait(EC.elementToBeClickable(homePage.cart));

		expect(browser.getCurrentUrl()).toContain('/checkout/orderConfirmation/');
	});

});
