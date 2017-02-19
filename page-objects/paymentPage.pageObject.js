'use strict';

const PaymentPage = function () {
	this.placeOrder = element(by.id('paymentSubmit'));

	this.cardType = element(by.id('cardType'));
	this.selectCard = function (value) {
		this.cardType.$('[value="' + value + '"]').click();
	};

	this.cardNumber = element(by.css('input#cardNumber.full'));

	this.expiryMonth = element(by.id('expiryMonth'));
	this.selectMonth = function (value) {
		this.expiryMonth.$('[value="' + value + '"]').click();
	};

	this.expiryYear = element(by.id('expiryYear'));
	this.selectYear = function (value) {
		this.expiryYear.$('[value="' + value + '"]').click();
	};

	this.securityCode = element(by.id('securityCodeInput'));
};

module.exports = PaymentPage;