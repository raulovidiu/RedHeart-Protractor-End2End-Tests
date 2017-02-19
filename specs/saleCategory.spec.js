'use strict';

const HomePage = require('../page-objects/homePage.pageObject.js');
const EC = protractor.ExpectedConditions;

describe('Sale Category Has the Clearance Applied as a Filter', () => {
  const homePage = new HomePage();

  const clearanceFilter = element(by.id('removeCategoryFilter'));


  it('Should Navigate to Homepage', () => {
    browser.get(browser.params.baseUrl);

    expect(browser.getTitle()).toBe('Red Heart Yarn | Yarn, Knitting Patterns, Crochet Patterns');
  });


  it('Should Hover Over Shop and Select Sale', () => {
    homePage.hoverOverShop().then(function () {
      browser.wait(EC.elementToBeClickable(homePage.saleCategory));
      homePage.saleCategory.click();
    });

    browser.wait(EC.elementToBeClickable(clearanceFilter));

    expect(browser.getCurrentUrl()).toContain('yarn?q=AdateOnlineArelevance%3AdateOnline%3Atype%3AClearance');
  });


  it('Should Remove the Clearance Filter', () => {
    clearanceFilter.click().then(function () {
      browser.wait(EC.invisibilityOf(clearanceFilter));
    });

    expect(browser.getCurrentUrl()).not.toContain('%3AClearance');
  });

});
