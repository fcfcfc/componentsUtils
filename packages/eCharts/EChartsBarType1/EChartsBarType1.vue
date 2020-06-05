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
    require('echarts/lib/chart/bar');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    export default {
        name: 'EChartsBarType1',
        props: [
            'barData',
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
            'tooltip',
            'titleLeft',
            'barWidth',
            'xAxisData',
            'yAxisMinInterval',
            'yAxisMax',
            'yAxisSilent',
            'yAxisMin',
            'yAxisLabelFormatter',
            'yAxisSplitNumber'
        ],
        data() {
            return {
                myChartId: Math.random()
            }
        },
        mounted() {

        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = eCharts.init(this.$refs[this.myChartId]);
                let that = this;
                let yAxisOptions = {
                    axisLabel: {
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
                if(that.yAxisSilent) yAxisOptions.silent = true;
                if(that.yAxisMin || that.yAxisMin === 0) yAxisOptions.min = that.yAxisMin;
                if(that.yAxisMinInterval) yAxisOptions.minInterval = that.yAxisMinInterval;
                if(that.yAxisMax) yAxisOptions.max = that.yAxisMax;
                if(that.yAxisLabelFormatter) yAxisOptions.axisLabel.formatter = that.yAxisLabelFormatter;
                if(that.yAxisSplitNumber) yAxisOptions.splitNumber  = that.yAxisSplitNumber;
                // 绘制图表
                myChart.setOption({
                    grid: {
                        left: that.gridLeft,
                        right: that.gridRight,
                        bottom: that.gridBottom,
                        top: that.gridTop
                    },
                    title: {
                        subtext : that.subtext,
                        subtextStyle: {
                            color: that.fontColor,
                            fontSize: that.subtextFontSize
                        },
                        left: that.titleLeft
                    },
                    tooltip : {
                        formatter: that.tooltip
                    },
                    xAxis: {
                        axisLabel: {
                            color: that.fontColor,
                            fontSize: that.fontSize
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
                        data: that.xAxisData
                    },
                    yAxis: yAxisOptions,
                    series: [{
                        type: 'bar',
                        barWidth: that.barWidth,
                        data: that.barData
                    }]
                });
            }
        }
    }
</script>
<style scoped lang="scss"></style>
