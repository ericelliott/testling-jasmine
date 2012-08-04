(function () {
  'use strict';

  var timedOut = false;

  setTimeout(function () {
    timedOut = true;
  }, 1000);

  describe('timer', function () {
    it('should not be timed out yet', function () {
      expect(timedOut).toEqual(false);
    });
  });

  describe('timer', function () {
    waitsFor(function () {
      return timedOut === true;
    });

    it('should be timed out', function () {
      expect(timedOut).toEqual(true);
    });
  });

}());
