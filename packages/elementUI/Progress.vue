<template>
  <div class="myProgress">
    <el-progress
            :color="color"
            :stroke-width="strokeWidth"
            :percentage="percentage"
            :show-text="showText"></el-progress>
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
   * color:自定义进度条背景色（会覆盖 status 状态颜色）
   * strokeWidth:进度条的宽度值（px），默认值为6
   * percentage:百分比，可选值为0-100，默认为0
   * showText:是否显示进度条文字内容，默认值为true
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
  export default {
    name: 'Progress',
    props: {
      color: {
        type: String,
        default: ''
      },
      strokeWidth: {
        type: Number,
        default: 6
      },
      percentage: {
        type: Number,
        default: 0
      },
      showText: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {

      }
    }
  }
</script>
<style lang="scss" scoped>
</style>