'use strict';

const AddressBook = function () {
	this.addresses = element(by.css('div.std_wrap.my_account > div > div.span-6 > div > div.item > ul > li.address > a'));
	this.addNewAddress = element(by.css('a.btn.btn_lrg'));
	this.saveUpdates = element(by.css('button.form.change_address_button.btn.btn_lrg'));

	this.countryDropdown = element(by.id('address.country'));
	this.selectCountry = function (value) {
		this.countryDropdown.$('[value="' + value + '"]').click();
	};

	this.firstName = element(by.id('address.firstName'));
	this.lastName = element(by.id('address.surname'));
	this.address1 = element(by.id('address.line1'));
	this.address2 = element(by.id('address.line2'));
	this.city = element(by.id('address.townCity'));

	this.stateDropdown = element(by.id('address.region'));
	this.selectState = function (value) {
		this.stateDropdown.$('[value="' + value + '"]').click();
	};

	this.zip = element(by.id('address.postcode'));
	this.makeDefault = element(by.css('.form_field-checkbox'));
	this.addressCreatedSuccess = element(by.css('#globalMessages > div.systemMsg.secondary.positive'));
};

module.exports = AddressBook;