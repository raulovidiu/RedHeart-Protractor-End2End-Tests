'use strict';

const HomePage = require('../page-objects/homePage.pageObject.js');
const LoginPage = require('../page-objects/loginPage.pageObject.js');
const Patterns = require('../page-objects/patterns.pageObject.js');
const ShippingPage = require('../page-objects/shippingPage.pageObject.js');
const BillingPage = require('../page-objects/billingPage.pageObject.js');
const PaymentPage = require('../page-objects/paymentPage.pageObject.js');
const faker = require('faker');
const EC = protractor.ExpectedConditions;


describe('Place Order - Returning Customer Flow', () => {

	const homePage = new HomePage();
	const loginPage = new LoginPage();
	const patterns = new Patterns();
	const shippingPage = new ShippingPage();
	const billingPage = new BillingPage();
	const paymentPage = new PaymentPage();

	const proceedToCheckoutBtn = element(by.id('checkoutButtonBottom'));

	const superSaverResult = element(by.css('div.prodbox.hvr-float:nth-child(2)'));
	const qtyInp = element(by.css('input#qtyInput'));
	const expandColorDropdown = element(by.id('msdrpdd20_msdd'));
	const pickSwatch = element(by.css('#msdrpdd20_child > ul > li:nth-child(3) > img'));
	const addToCartBtn = element(by.id('addToCartButtonB'));

	const closePopUp = element(by.id('PopUpCloseBtn'));


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


	it('Navigate to Homepage', () => {
		homePage.redHeartLogo.click();

		expect(homePage.redHeartLogo.isDisplayed()).toBe(true);
	});


	it('Search for Super Saver and Access the Second Result', () => {
		homePage.searchInp.click().clear().sendKeys('Super Saver', protractor.Key.ENTER);

		browser.wait(EC.elementToBeClickable(superSaverResult));

		superSaverResult.click();

		expect(browser.getCurrentUrl()).toContain('/yarn/super');
	});


	it('Select a Color and Add the Product to Cart', () => {
		browser.executeScript('arguments[0].scrollIntoView()', qtyInp.getWebElement()).then(function() {
			expandColorDropdown.click();
			pickSwatch.click().then(function() {
				addToCartBtn.click();
			});
		});

		browser.navigate().back();

		expect($('span.minicart_count').getText()).toEqual('1');
	});


	it('Click the Mini Cart from Navigation Bar', () => {
		homePage.cart.click();
		browser.wait(EC.elementToBeClickable(homePage.logOut));

		expect(browser.getCurrentUrl()).toContain('/cart');
		expect($('#content > div.std_wrap.checkout.cart > div.container > div > div.row > div.column.four.offset-by-two > div:nth-child(2) > div.column.two.alignrt > b').getText()).not.toContain('$0.00');
	});


	it('Proceed To Checkout', () => {
		proceedToCheckoutBtn.click();

		browser.wait(EC.elementToBeClickable(shippingPage.firstName));

		expect(browser.getCurrentUrl()).toContain('/checkout/multi/add-delivery-address');
	});


	it('Fill the Shipping Address Form and Continue to Billing Options Page', () => {
		shippingPage.firstName.click().clear().sendKeys(faker.name.firstName());
		shippingPage.lastName.click().clear().sendKeys(faker.name.lastName());
		shippingPage.selectCountry('US');
		shippingPage.address1.click().clear().sendKeys(faker.address.streetAddress(true));
		shippingPage.address2.click().clear().sendKeys(faker.address.streetAddress(true));
		shippingPage.city.click().clear().sendKeys(faker.address.city());
		shippingPage.selectState('US-NY');
		shippingPage.zip.click().clear().sendKeys(faker.address.zipCode());
		shippingPage.phoneNum.click().clear().sendKeys('5559854763');
		shippingPage.email.click().clear().sendKeys(faker.internet.email());
		shippingPage.selectDelivery('US-2DAY');
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
