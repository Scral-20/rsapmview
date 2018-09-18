/**
 * chaizq-neu
 * 2018.08.21
 * @group Translate
 * @name ReportTranslation
 * @class
 */
angular.module('inspinia')
    .config(
        function config($translateProvider) {
            $translateProvider
                .translations('zh', {
                    //Probes
                    'Probe list': '探针列表',
                    'Probe Management': '探针管理',
                    'Probe Add': '探针添加'
                });
        });
