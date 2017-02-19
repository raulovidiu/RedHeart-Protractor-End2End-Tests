'use strict';

const HomePage = require('../page-objects/homePage.pageObject.js');
const Yarns = require('../page-objects/yarnsPDP.pageObject.js');
const EC = protractor.ExpectedConditions;

describe('Search for the Most Popular Yarns and Find the Most Expensive Yarn', () => {

  const homePage = new HomePage();
  const yarns = new Yarns();


  it('Should Navigate to Homepage', () => {
    browser.get(browser.params.baseUrl);

    expect(browser.getTitle()).toBe('Red Heart Yarn | Yarn, Knitting Patterns, Crochet Patterns');
  });


  it('Should Hover Over Shop and Select Yarn', () => {
    homePage.hoverOverShop().then(function () {
      browser.wait(EC.elementToBeClickable(homePage.yarnCategory));
      homePage.yarnCategory.click();
    });

    browser.wait(EC.elementToBeClickable(yarns.mostPopular));

    expect(browser.getCurrentUrl()).toContain('/yarn');
  });



  it('Should Click the View All Button to Access Most Popular', () => {
    yarns.mostPopular.click();

    browser.wait(EC.presenceOf(yarns.productsFound));

    expect(yarns.productsFound.isPresent()).toBe(true);
    expect(yarns.productsFound.getText()).toBeGreaterThan(1150);
  });


  it('Should Filter the Results by Price High to Low', () => {
    yarns.sortBy('price-desc');

    browser.wait(EC.elementToBeClickable(yarns.perPageDropdown));

    expect(browser.getCurrentUrl()).toContain('/yarn?pageViewMode=grid&newArrivals=&privateSales=&sort=price-desc');
  });


  it('Should Select 45 Results per Page', () => {
    yarns.selectNumPerPage('45');

    browser.wait(EC.elementToBeClickable(yarns.sortDropdown));

    expect(browser.getCurrentUrl()).toContain('&sort=price-desc&q=default%3Aprice-desc&size=45');
  });

});
