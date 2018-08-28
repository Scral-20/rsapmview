/**
 * chaizq-neu
 * 2018.08.21
 * @group Translate
 * @name basicTranslation
 * @class
 */
angular.module('inspinia')
    .config(
        function config($translateProvider) {

            $translateProvider

                .translations('zh', {

                    'CPU Load':'CPU负载',
                    'Transaction':'业务',
                    'Application Info':'应用信息',
                    'NonHeap Memory Used':'非堆内存使用率',
                    'Heap Memory Used':'堆内存使用率',

                });

            // $translateProvider.preferredLanguage('en');

        });
