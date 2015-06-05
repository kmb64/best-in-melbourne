'use strict';

describe('delivery address', function () {
  var login = require('../../header/test/header.page.js');
  var addressBook = require('../../addressBook/test/addressBook.page.js');
  var page = require('./deliveryAddress.page.js');

  beforeEach(function () {
    browser.setWindowSizeDesktop();
    login.stubValidLogin();
    page.get();
  });

  it('should navigate to address book after successful save', function () {
    page.setNickname('Holiday house');
    page.setAddress('32 Beach Rd Portsea VIC 3944');
    page.setContactName('Billy Bob Minion');
    page.selectSave();
    expect(addressBook.on()).toBeTruthy();
  });

  it('should display an error if user doesn\'t enter a nickname', function () {
    page.setNickname('');
    page.selectSave();
    expect(page.isNicknameErrorDisplayed()).toBeTruthy();
  });

  it('should display an error if user doesn\'t enter an address', function () {
    page.setAddress('');
    page.selectSave();
    expect(page.isAddressErrorDisplayed()).toBeTruthy();
  });

  it('should display an error if user doesn\'t enter a contact name', function () {
    page.setContactName('');
    page.selectSave();
    expect(page.isContactNameErrorDisplayed()).toBeTruthy();
  });
});
