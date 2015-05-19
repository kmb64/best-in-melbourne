'use strict';

describe('delivery address', function () {
  var page = require('./place.page.js');

  beforeEach(function () {
    browser.setWindowSizeMobile();
    page.get();
  });

  it('should display the correct level 1 heading', function () {
    expect(page.getHeader()).toBe('Melbourne');
  });

  it('should show a list of the best places', function(){
    browser.sleep(3000);
    page.isPlaceListDisplayed().then(function(result){
      expect(result).toBeTruthy();
    });
  });

});
