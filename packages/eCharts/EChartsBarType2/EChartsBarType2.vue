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
     * 依赖的组件（无）
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
    let myChart = null;
    require('echarts/lib/chart/bar');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');
    export default {
        name: 'EChartsBarType3',
        props: [
            'dataset',
            'colorArr',
            'width',
            'height',
            'gridLeft',
            'gridRight',
            'gridBottom',
            'gridTop',
            'lineColor',
            'fontColor',
            'fontSize',
            'subtext',
            'subtextFontSize',
            'titleLeft',
            'titleTop',
            'barWidth',
            'xAxisLabelMargin',
            'yAxisLabelPadding',
            'ifLegend',
            'legendOrient',
            'legendRight',
            'legendBottom',
            'yAxisSilent',
            'yAxisMax',
            'yAxisMin',
            'tooltip'
        ],
        data() {
            return {
                myChartId: Math.random()
            }
        },
        mounted() {

        },
        methods: {
            legendToggleSelect(name) {
                myChart.dispatchAction({
                    type: 'legendToggleSelect',
                    // 图例名称
                    name: name
                })
            },
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                myChart = eCharts.init(this.$refs[this.myChartId]);
                let that = this;
                let seriesArr = [];
                let legendOptions = {
                    show: false
                };
                let yAxisOptions = {
                    axisLabel: {
                        padding: that.yAxisLabelPadding,
                        color: that.fontColor,
                        fontSize: that.fontSize
                    },
                    axisLine: {
                        lineStyle: {
                            color: that.lineColor
                        }
                    },
                    axisTick: {
                        show: false,
                        alignWithLabel: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: that.lineColor
                        }
                    }
                };

                for (let i = 0; i < that.colorArr.length; i++) {
                    seriesArr.push({
                        type: 'bar',
                        barWidth: that.barWidth
                    })
                }
                if(this.ifLegend) {
                    legendOptions = {
                        textStyle: {
                            color: this.fontColor,
                            fontSize: this.fontSize
                        }
                    };
                    if(this.legendOrient) legendOptions.orient = this.legendOrient;
                    if(this.legendRight) legendOptions.right = this.legendRight;
                    if(this.legendBottom) legendOptions.bottom = this.legendBottom;
                }
                if(this.yAxisSilent) yAxisOptions.silent = true;
                if(this.yAxisMax) yAxisOptions.max = this.yAxisMax;
                if(this.yAxisMin || this.yAxisMin === 0) yAxisOptions.min = this.yAxisMin;
                // 绘制图表
                myChart.setOption({
                    grid: {
                        left: that.gridLeft,
                        right: that.gridRight,
                        bottom: that.gridBottom,
                        top: that.gridTop
                    },
                    legend: legendOptions,
                    color: that.colorArr,
                    title: {
                        subtext : that.subtext,
                        subtextStyle: {
                            color: that.fontColor,
                            fontSize: that.subtextFontSize
                        },
                        left: that.titleLeft,
                        top: that.titleTop
                    },
                    tooltip : {
                        formatter: that.tooltip
                    },
                    dataset: {
                        source: that.dataset
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            margin: that.xAxisLabelMargin,
                            color: that.fontColor,
                            fontSize: that.fontSize,

                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: that.lineColor
                            }
                        },
                        axisTick: {
                            show: false,
                            alignWithLabel: true
                        },
                        splitLine: {
                            interval: 0,
                            show: true,
                            lineStyle: {
                                color: that.lineColor
                            }
                        }
                    },
                    yAxis: yAxisOptions,
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: seriesArr
                });
            }
        }
    }
</script>
<style scoped lang="scss"></style>
