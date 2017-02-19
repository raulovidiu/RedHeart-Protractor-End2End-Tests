'use strict';

const Yarns = function () {
  this.mostPopular = element(by.css('.container > h1 .btn.white.hm'));
  this.productsFound = element(by.css('.totalResults > b'));

  this.sortDropdown = element(by.id('sortOptions1'));
  this.sortBy = function (value) {
    this.sortDropdown.$('[value="' + value + '"]').click();
  };

  this.perPageDropdown = element(by.id('numPerPageSelect'));
  this.selectNumPerPage = function (value) {
    this.perPageDropdown.$('[value="' + value + '"]').click();
  };
};

module.exports = Yarns;
