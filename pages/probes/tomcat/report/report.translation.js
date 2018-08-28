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
                .translations('en', {
                    // Tabs Label Translate
                    '基本信息': 'Basic Info',
                    '应用信息': 'Application',
                    '日志信息': 'Log',
                    '探针信息': 'Agent',

                    // Basic Translate
                    '应用名': 'Application Name',
                    'Agent 版本': 'Agent Version',
                    '启动时间': 'Startup time',
                    'JVM (GC 类型)': 'JVM (GC type)',
                    'Service 类型': 'Service type',
                    '运行状态': 'Running state',
                    '数据图表':'Data chart',

                    // Gauge Translate
                    '最大值':'Max Value',
                    '最小值':'Min Value',

                });

            // $translateProvider.preferredLanguage('en');

        });
