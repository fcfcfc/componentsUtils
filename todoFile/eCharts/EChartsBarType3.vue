<template>
    <div class="hello">
        <div :ref="myChartId" :style="{width: width, height: chartsHeight}"></div>
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
    export default {
        name: 'EChartsBarType3',
        props: [
            'itemScore',
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
            'barWidth',
            'yAxisData',
            'yAxisLabelLineHeight',
            'yAxisLabelFormatter',
            'seriesLabelDistance',
            'seriesLabelColor',
            'seriesLabelFormatter',
            'seriesColor1',
            'seriesColor2'
        ],
        data() {
            let barData1 = [];
            let barData2 = [];
            for (let i = 0; i < this.barData.length; i++) {
                let num = this.barData[i].goal === 0 ? 0 : (this.barData[i].point / this.barData[i].goal) * 100;
                num = parseInt(num);
                barData1.push(num);
                barData2.push(100 - num)
            }
            return {
                chartsHeight: this.height,
                myChartId: Math.random(),
                options: {
                    grid: {
                        left: this.gridLeft,
                        right: this.gridRight,
                        bottom: this.gridBottom,
                        top: this.gridTop
                    },
                    xAxis: {
                        type: 'value',
                        axisLabel: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false,
                            alignWithLabel: true
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        data: this.yAxisData,
                        type: 'category',
                        axisLabel: {
                            show: true,
                            color: this.fontColor,
                            fontSize: this.fontSize,
                            lineHeight: this.yAxisLabelLineHeight,
                            formatter: this.yAxisLabelFormatter
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false,
                            alignWithLabel: false
                        }
                    },
                    series: [
                        {
                            type: 'bar',
                            stack: '分数比值',
                            barWidth: this.barWidth,
                            data: barData1,
                            color: this.seriesColor1,
                            emphasis: {
                                itemStyle: {
                                    color: this.seriesColor1
                                }
                            }
                        },
                        {
                            type: 'bar',
                            stack: '分数比值',
                            color: this.seriesColor2,
                            label: {
                                show: true,
                                position: 'insideRight',
                                distance: this.seriesLabelDistance,
                                color: this.seriesLabelColor,
                                fontSize: this.fontSize,
                                formatter: this.seriesLabelFormatter
                            },
                            emphasis: {
                                itemStyle: {
                                    color: this.seriesColor2
                                }
                            },
                            barWidth: this.barWidth,
                            data: barData2
                        }
                    ]
                }
            }
        },
        mounted() {

        },
        watch: {
            yAxisData: {
                handler(val, oldVal) {
                    this.options.yAxis.data = val;
                    this.$nextTick(() => this.drawLine())
                },
                deep: true
            },
            barData: {
                handler(val, oldVal) {
                    let barData3 = [];
                    let barData4 = [];
                    for (let i = 0; i < val.length; i++) {
                        let num = val[i].goal === 0 ? 0 : (val[i].point / val[i].goal) * 100;
                        num = num > 100 ? 100 : num;
                        num = parseInt(num);
                        barData3.push(num);
                        barData4.push(100 - num)
                    }
                    this.options.series[0].data = barData3;
                    this.options.series[1].data = barData4;
                    this.$nextTick(() => this.drawLine())
                },
                deep: true
            },
            height(val) {
                this.chartsHeight = val
            }
        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = eCharts.init(this.$refs[this.myChartId]);
                // 绘制图表
                myChart.setOption(this.options);
            }
        }
    }
</script>
<style scoped lang="scss"></style>
