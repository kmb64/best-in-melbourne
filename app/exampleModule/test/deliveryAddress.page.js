/*global browser, $*/
'use strict';

var url = '#/delivery-address',
  nickname = $('#nickname'),
  address = $('#address_value'),
  contactName = $('#contactName'),
  submitBtn = $('#delivery-address-submit'),
  nicknameErrorMsg = $('#nickname-error'),
  addressErrorMsg = $('#address-error'),
  contactNameErrorMsg = $('#contact-name-error');

var get = function () {
  return browser.get(url);
};

var setNickname = function (value) {
  return nickname.sendKeys(value);
};

var setAddress = function (value) {
  return address.sendKeys(value);
};

var setContactName = function (value) {
  return contactName.sendKeys(value);
};

var selectSave = function () {
  return submitBtn.click();
};

var isNicknameErrorDisplayed = function () {
  return nicknameErrorMsg.isDisplayed();
};

var isAddressErrorDisplayed = function () {
  return addressErrorMsg.isDisplayed();
};

var isContactNameErrorDisplayed = function () {
  return contactNameErrorMsg.isDisplayed();
};

exports.get = get;
exports.setNickname = setNickname;
exports.setAddress = setAddress;
exports.setContactName = setContactName;
exports.selectSave = selectSave;
exports.isNicknameErrorDisplayed = isNicknameErrorDisplayed;
exports.isAddressErrorDisplayed = isAddressErrorDisplayed;
exports.isContactNameErrorDisplayed = isContactNameErrorDisplayed;
