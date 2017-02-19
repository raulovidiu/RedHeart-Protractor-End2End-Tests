'use strict';

const Patterns = function() {
	this.firstPattern = element.all(by.className('item')).first();
	this.buyFirstPattern = element(by.id('addToCartButton'));
	this.addToCartLayer = element(by.id('addToCartLayer'));
	this.closePopUp = element(by.id('PopUpCloseBtn'));
};

module.exports = Patterns;
