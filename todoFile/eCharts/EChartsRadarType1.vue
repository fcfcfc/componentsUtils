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
    require('echarts/lib/chart/radar');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/legend');
    export default {
        name: 'EChartsRadarType1',
        props: [
            'radarDataColor',
            'radarData',
            'width',
            'height',
            'radarRadius',
            'lineColor',
            'fontColor',
            'fontSize',
            'radarSplitLineColor',
            'radarSplitAreaColorArr',
            'radarSplitNumber',
            'radarIndicator',
            'radarMax',
            'radarNamePadding',
            'symbolSize',
            'legendData',
            'legendOrient',
            'legendRight',
            'legendBottom'
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
                let radarIndicatorArr = [];
                let seriesOptions = [];
                let legendOptions = {
                    show: false
                };

                for (let i = 0; i < this.radarIndicator.length; i++) {
                    radarIndicatorArr.push({
                        name: this.radarIndicator[i],
                        max: this.radarMax
                    })
                }
                for (let i = 0; i < this.radarDataColor.length; i++) {
                    seriesOptions.push({
                        name: this.radarDataColor[i].name,
                        type: 'radar',
                        lineStyle: {
                            normal: {
                                color: this.radarDataColor[i].color
                            }
                        },
                        itemStyle: {
                            color: this.radarDataColor[i].color
                        },
                        data: this.radarData[i],
                        symbolSize: this.symbolSize
                    })
                }
                if(this.legendData || this.legendOrient || this.legendRight || this.legendBottom) {
                    legendOptions = {};
                    if(this.legendData) {
                        legendOptions.data = this.legendData;
                        legendOptions.textStyle = {
                            color: this.fontColor,
                            fontSize: this.fontSize
                        }
                    }
                    if(this.legendOrient) legendOptions.orient = this.legendOrient;
                    if(this.legendRight) legendOptions.right = this.legendRight;
                    if(this.legendBottom) legendOptions.bottom = this.legendBottom;
                }
                // 绘制图表
                myChart.setOption({
                    tooltip: {},
                    legend: legendOptions,
                    radar: {
                        radius: this.radarRadius,
                        indicator: radarIndicatorArr,
                        shape: 'polygon',
                        splitNumber: this.radarSplitNumber,
                        name: {
                            textStyle: {
                                color: this.fontColor,
                                fontSize: this.fontSize,
                                padding: this.radarNamePadding
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: this.radarSplitLineColor
                            }
                        },
                        splitArea: {
                            areaStyle: {
                                color: this.radarSplitAreaColorArr
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: this.radarSplitLineColor
                            }
                        }
                    },
                    series: seriesOptions
                });
            }
        }
    }
</script>
<style scoped lang="scss"></style>
