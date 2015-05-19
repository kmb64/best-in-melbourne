/*global browser, $*/
'use strict';

var url = '/',
  header = $('#header'),
  firstPlace = $('li:nth-child(1)>.place-title'),
  placeList = $('#place-list');

exports.get = function () {
  return browser.get(url);
};

exports.getHeader = function () {
  return header.getText();
};

exports.getFirstPlace = function(){
  return firstPlace.getText();
};

exports.isPlaceListDisplayed = function(){
  return placeList.isDisplayed();
};

