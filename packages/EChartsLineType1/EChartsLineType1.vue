<template>
    <div class="hello">
        <div :ref="myChartId" :style="{width: width, height: height}"></div>
    </div>
</template>

<script>
    /**
     * vue.config.js中需要的配置（无）
     */
    /**
     * 依赖的组件
     * @/utils/js/main
     */
    /**
     * 该组件的配置项
     */
    /**
     * 组件的监听方法（无）
     */
    /**
     * 组件的方法
     */
    /**
     * 需要注意的事项
     * 1.需要安装以下依赖
     npm install --save echarts
     */
    let eCharts = require('echarts/lib/echarts');
    require('echarts/lib/chart/line');
    require('echarts/lib/component/legend');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    import Main from "js-utils-common";
    export default {
        name: 'EChartsLineType1',
        props: [
            'width',
            'height',
            'gridLeft',
            'gridRight',
            'gridBottom',
            'gridTop',
            'lineData',
            'xAxisData',
            'fontColor',
            'fontSize',
            'subtext',
            'titleLeft',
            'titleTop',
            'symbolSize',
            'areaOpacity',
            'lineColor',
            'lineWidth',
            'splitLineColor',
            'legendOrient',
            'legendRight',
            'legendBottom',
            'dataArr',
            'showLoading',
            'yAxisSilent',
            'yAxisMax',
            'yAxisMin'
        ],
        data() {
            return {
                myChartId: Math.random(),
                options: {
                    grid: {
                        left: this.gridLeft,
                        right: this.gridRight,
                        bottom: this.gridBottom,
                        top: this.gridTop
                    },
                    legend: {
                        textStyle: {
                            color: this.fontColor,
                            fontSize: this.fontSize
                        },
                        right: this.legendRight,
                        bottom: this.legendBottom || 'auto',
                        orient: this.legendOrient || 'horizontal'
                    },
                    title: {
                        subtext : this.subtext,
                        subtextStyle: {
                            color: this.fontColor,
                            fontSize: this.fontSize
                        },
                        left: this.titleLeft,
                        top: this.titleTop
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    xAxis: {
                        axisPointer: {
                            type: 'line',
                            show: true,
                            lineStyle: {
                                color: this.lineColor,
                                type: 'solid',
                                width: this.lineWidth,
                            }
                        },
                        axisLabel: {
                            show: true,
                            color: this.fontColor,
                            fontSize: this.fontSize
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: this.lineColor,
                                width: this.lineWidth,
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: this.splitLineColor
                            }
                        },
                        axisTick: {
                            show: false,
                            alignWithLabel: true
                        },
                        data: this.xAxisData,
                        type: 'category',
                        boundaryGap: false,
                    },
                    yAxis: {
                        axisPointer: {
                            type: 'line',
                            show: true,
                            label: {
                                show: false
                            },
                            lineStyle: {
                                color: this.lineColor,
                                type: 'solid',
                                width: this.lineWidth,
                            },
                            triggerTooltip: false
                        },
                        splitNumber: 10,
                        boundaryGap: false,
                        axisLabel: {
                            color: this.fontColor,
                            fontSize: this.fontSize
                        },
                        axisLine: {
                            lineStyle: {
                                color: this.lineColor,
                                width: this.lineWidth,
                            }
                        },
                        axisTick: {
                            show: false,
                            alignWithLabel: false
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: this.splitLineColor
                            }
                        }
                    },
                    series: {}
                },
                myChart: null
            }
        },
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            this.myChart = eCharts.init(this.$refs[this.myChartId]);
            if(this.yAxisSilent) this.options.yAxis.silent = true;
            if(this.yAxisMax) this.options.yAxis.max = this.yAxisMax;
            if(this.yAxisMin || this.yAxisMin === 0) this.options.yAxis.min = this.yAxisMin;
        },
        watch: {
            showLoading(n) {
                if(n) {
                    this.myChart.showLoading({
                        text : '正在加载数据'
                    });
                } else {
                    this.myChart.hideLoading()
                }
            },
            xAxisData() {
                let options = Main.objectDeepClone(this.options);
                let length = this.xAxisData.length;
                let dataArr = this.dataArr;
                let seriesOptions = [];

                for (let i = 0; i < dataArr.length; i++) {
                    seriesOptions.push({
                        name: dataArr[i].name,
                        data: this.lineData[i],
                        type: 'line',
                        areaStyle: {
                            color: dataArr[i].color,
                            opacity: this.areaOpacity
                        },
                        hoverAnimation: false,
                        symbolSize: length > 10 ? 0 : this.symbolSize
                    })
                }

                options.series = seriesOptions;
                //改变x轴值
                options.xAxis.data = this.xAxisData;
                //数据大于十条时去掉x轴的label和x、y轴的辅助线
                if(length > 10) {
                    options.yAxis.splitLine = {
                        show: false
                    };
                    options.xAxis.splitLine = {
                        show: false
                    };
                    options.xAxis.axisLabel = {
                        show: false
                    }
                }
                // 绘制图表
                this.myChart.setOption(options);
            }
        },
        methods: {
        }
    }
</script>
<style scoped lang="scss"></style>
