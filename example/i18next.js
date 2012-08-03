(function (app) {
  describe('i18n', function () {
    it('should exist', function () {
      waitsFor(function () {
        return app.i18n && app.i18n.whenLoaded.isResolved();
      });
      runs(function () {
        expect(applitude.i18n).toBeDefined();
      });
    });

    it('should translate', function () {
      waitsFor(function () {
        return app.i18n && app.i18n.whenLoaded.isResolved();
      });
      runs(function () {
        expect(app.t('app.brand.name')).toEqual('Tout');
      });
    });
  });
}(applitude));
