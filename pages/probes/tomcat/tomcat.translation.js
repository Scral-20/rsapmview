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
                    '峰值': 'Peak Value',
                    '均值': 'Mean Value',
                    '谷值': 'Valley value',
                    '总资源值':'Total Resources',
                    '资源占用峰值百分比': 'Max Used Percentage',
                    '资源占用谷值百分比': 'Min Used Percentage'

                })

                .translations('zh', {

                    //basicinfo
                    'Application Name': '应用名称',
                    'Basic Info': '基本信息',
                    'Server Info': '服务器信息',
                    'Startup Time': '启动时间',
                    'Agent Version': 'Agent 版本',
                    'Service Type': '服务器类型',
                    'Running State': '运行状态',
                    'JVM (GC type)': 'JVM (GC 类型)',
                    'JVM Parameters': 'JVM 参数',
                    'Ports': '端口',



                    'CPU Load':'CPU负载',
                    'Transaction':'业务',
                    'Application Info':'应用信息',
                    'NonHeap Memory Used':'非堆内存使用率',
                    'Heap Memory Used':'堆内存使用率',

                    //report
                    'Logger Trend': '日志趋势信息',
                    'Active Trace': '探针响应时间与数量变化',
                    'Agent Response Time': '探针响应时间',
                    'Template info': '日志模板',
                    'Hinge Logger': '关键日志',
                    'App Response Info': '应用请求信息',
                    'Accept': '正常',
                    'Exception': '异常',
                    'Total Normal Count':'正常请求数统计',
                    'Total Normal Duration':'正常请求时间统计',
                    'Total Exception Count':'异常请求数统计',
                    'Total Exception Duration':'异常请求时间统计',
                    //button
                    'Reload Report':'刷新报表',

                    //agent_tab
                    "Statistics of Probes' Counts":'各级别探针响应数量统计',
                    "Probe response quantity info":'探针响应数量信息',

                    "FastCount(<1s)":'快速响应(<1s)',
                    "NormalCount(1s~3s)":'正常响应(1s~3s)',
                    "SlowCount(3s~5s)":'缓慢响应(3s~5s)',
                    "VerySlowCount(>5s)":'极慢响应(>5s)',

                    "Total Counts":'总响应次数',


                    // Gauge Translate
                    'CPU Utilization':'CPU资源占用',
                    'JVM Heap Used Proportion':'JVM堆内存使用报告',
                    'JVM NonHeap Used Proportion':'JVM非堆内存使用报告',
                });


            // $translateProvider.preferredLanguage('en');

        });
