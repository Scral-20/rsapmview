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
                    '数据图表': 'Data chart',

                    // Gauge Translate
                    '最大值': 'Max Value',
                    '最小值': 'Min Value',
                    '资源占用峰值百分比': 'Max Used Percentage',
                    '资源占用谷值百分比': 'Min Used Percentage'

                })

                .translations('zh', {

                    //report 图表标题
                    'Logger Trend': '日志趋势信息',
                    'Active Trace': '探针响应时间与数量变化',
                    'Agent Response Time': '探针响应时间',
                    'Template info': '日志模板',
                    'Hinge Logger': '关键日志',

                    // Gauge Translate
                    'CPU Used Report':'CPU资源使用报告',
                    'JVM HEAP Used Report':'JVM堆内存使用报告',
                    'JVM NonHEAP Used Report':'JVM非堆内存使用报告'

                });


            // $translateProvider.preferredLanguage('en');

        });
