angular.module("stache", ["sky", "ui.bootstrap", "ui.select"]);
angular.module('stache').controller('PaletteTestController', [
    'bbPaletteConfig', 'bbPalette', function (bbPaletteConfig, bbPalette) {
        var self = this;
        self.paletteService = bbPalette;
    }
]);
