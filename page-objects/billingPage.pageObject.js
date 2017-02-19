'use strict';

const BillingPage = function() {
	this.editShippingBtn = element(by.css('a.btn.gray'));
	this.continueToPayment = element(by.css('button.btn.white'));
};

module.exports = BillingPage;