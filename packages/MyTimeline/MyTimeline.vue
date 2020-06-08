<template>
    <div class="myTimeline">
        <el-timeline>
            <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index">
                <div flex="">
                    <div>{{(index + 1)}}.&nbsp;</div>
                    <div :style="{'width': (activity.width ? activity.width : '100%')}">
                        {{activity.content}}
                    </div>
                </div>
            </el-timeline-item>
        </el-timeline>
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
     * activities:展示的数据数组,数组中的对象为{
                                                width:自定义宽度（带单位），默认为100%
                                                content:显示的内容
                                           }
     */
    /**
     * 组件的监听方法（无）
     */
    /**
     * 组件的方法（无）
     */
    /**
     * 需要注意的事项（无）
     */
    import { Timeline, TimelineItem } from "element-ui"
    export default {
        name: 'MyTimeline',
        components: {
            ElTimeline: Timeline,
            ElTimelineItem: TimelineItem
        },
        props: {
            activities: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        data() {
            return {}
        }
    }
</script>
<style lang="scss" scoped>
    .myTimeline {
        /deep/ .el-timeline-item {
            line-height: 1.3;
            padding-bottom: 20px;

            .el-timeline-item__tail {
                border-color: #E2E2E2;
            }

            .el-timeline-item__node--normal {
                width: 8px;
                height: 8px;
                left: 1px;
                color: #E2E2E2;
            }

            .el-timeline-item__wrapper {
                padding-left: 20px;

                .el-timeline-item__timestamp.is-bottom {
                    margin: 0;
                }

                .el-timeline-item__content {
                    font-size: 16px;
                    color: #333333;
                }
            }
        }
    }
</style>
