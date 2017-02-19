'use strict';

const NewsletterSignUp = function () {
	this.email = element(by.id('newsletter.email'));
	this.confirmEmail = element(by.id('newsletter.confirmemail'));
	this.firstName = element(by.id('newsletter.firstName'));
	this.lastName = element(by.id('newsletter.lastName'));
	this.knitting = element(by.css('.form_field-checkbox > label:nth-child(1)'));
	this.crochet = element(by.css('.form_field-checkbox > label:nth-child(2)'));

	this.month = element(by.css('select[name="month"]'));
	this.selectMonth = function (value) {
		this.month.$('[value="' + value + '"]').click();
	};

	this.day = element(by.css('select[name="day"]'));
	this.selectDay = function (value) {
		this.day.$('[value="' + value + '"]').click();
	};

	this.signUp = element(by.css('button.form.btn.btn_lrg'));
};

module.exports = NewsletterSignUp;
