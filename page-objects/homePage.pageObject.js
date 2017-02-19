'use strict';

const HomePage = function() {
	// Top Area Elements

	this.redHeartLogo = element(by.css('#nav-wrap img[alt="Red Heart"]'));
	this.joinSignin = element(by.css('a[title="JOIN / SIGN IN"]'));
	this.searchInp = element(by.className('siteSearchInput'));

	this.accountLink = element(by.css('.topnavr > ul > li:nth-child(1) > a.username'));
	this.logOut = element(by.css('a[href="/logout"]'));
	this.successfullyLogOutMessage = element(by.css('div.#globalMessages div.positive'));
	this.successfullySignedUpForNewsletter = element(by.css('#globalMessages > div'));

	// Mega Menu Elements
	this.patternsMenu = element(by.css('a[href="/free-patterns"]'));
	this.cart = element(by.css('a.btn.gray.miniCart'));
	this.hoverOverShop = function() {
		return browser.actions().mouseMove(element(by.css('span.top-heading.tablink'))).perform();
	};
	this.saleCategory = element(by.css('a[onmouseover="openMega(event, \'sale\')"]'));
	this.yarnCategory = element(by.css('a[onmouseover="openMega(event, \'Yarn\')"]'));

	// Carousel Elements
	// Center Column Elements

	// Footer Elements
	this.newsletterInp = element(by.id('homeNewsLetterSignUpEmail'));

	// Actions
	this.visit = function() {
		return browser.get(browser.params.baseUrl);
	};
};

module.exports = HomePage;
