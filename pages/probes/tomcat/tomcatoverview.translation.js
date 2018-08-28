/**
 * chaizq-neu
 * 2018.08.21
 * @group Translate
 * @name TomcatOverviewTranslation
 * @class
 */
angular.module('inspinia')
    .config(
        function config($translateProvider) {

            $translateProvider
                .translations('en', {

                    //TomcatOverview Label Translate
                    '全景视图': 'Top View',
                    'Tomcat':   'Tomcat',
                    '代码定位': 'Code Location',
                    '日志分析': 'Log Analysis',
                    '指标预测': 'Index Prediction',
                    '告警管理': 'Alarm Management',
                    '报告生成': 'Report Generation',


                    'Tomcat': 'Tomcat',
                    '代码定位':'Code location',
                });

            // $translateProvider.preferredLanguage('en');

        });
