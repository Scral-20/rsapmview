'use strict';
/**
 * wub-chaizq
 * 2018.08.21
 * @group Controller
 * @name  translationCtrl
 * @class
 */

//该config设置默认语言
function preferConfig($translateProvider) {
    $translateProvider.preferredLanguage('zh');
    //$translateProvider.preferredLanguage('en');
}
//该controller用于控制更改语言类型
function translationCtrl($scope, $translate) {
    $scope.changeLanguage = function(langKey) {
        $translate.use(langKey);
    };
}

angular
    .module('inspinia')
    .controller('translationCtrl', translationCtrl)
    .config(preferConfig);
