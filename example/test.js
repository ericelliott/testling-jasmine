(function (app) {
  'use strict';

  applitude.register('mvc', {
    Models: {}
  });

  applitude.register('mixinTest', {
    mixins: 'mvc'
  });

  applitude.register('overrideTest', {
    Models: {
      override: true
    },
    mixins: 'mvc'
  });

  describe('mixinTest', function () {
    it('should add mixins', function () {
      expect(app.mixinTest.Models).toBeDefined();
    });
  });

  describe('mvc plugin', function () {
    it('should exist', function () {
      expect(app.mvc).toBeDefined();
    });
  });

  describe('overrideTest', function () {
    it('should let module override mixins', function () {
      expect(app.overrideTest.Models.override).toBeDefined();
    });
  });
}(applitude));
