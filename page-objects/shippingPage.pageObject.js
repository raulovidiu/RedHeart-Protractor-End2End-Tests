'use strict';

const ShippingPage = function () {
	this.firstName = element(by.id('address.firstName'));
	this.lastName = element(by.id('address.surname'));

	this.countryDropdown = element(by.id('address.country'));
	this.selectCountry = function (value) {
		this.countryDropdown.$('[value="' + value + '"]').click();
	};

	this.address1 = element(by.id('address.line1'));
	this.address2 = element(by.id('address.line2'));
	this.city = element(by.id('address.townCity'));

	this.stateDropdown = element(by.id('address.region'));
	this.selectState = function (value) {
		this.stateDropdown.$('[value="' + value + '"]').click();
	};

	this.zip = element(by.id('address.postcode'));
	this.phoneNum = element(by.id('address.phoneNumber'));
	this.email = element(by.id('address.emailId'));

	this.deliveryDropdown = element(by.id('options'));
	this.selectDelivery = function (value) {
		this.deliveryDropdown.$('[value="' + value + '"]').click();
	};

	this.continueToBilling = element(by.id('btnCheckoutContinue'));
};

module.exports = ShippingPage;