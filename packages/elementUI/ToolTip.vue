<template>
  <el-tooltip class="myToolTip" :effect="theme" :content="content" :placement="position">
    <slot/>
  </el-tooltip>
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
   * theme:主题，默认dark，暂时可选值为dark和light
   * content:显示的内容
   * position:位置，方向-对齐位置，四个方向：top、left、right、bottom；三种对齐位置：start, end，默认为空。如"left-end"
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
    name: 'ToolTip',
    props: {
      theme: {
        type: String,
        default: 'dark'
      },
      content: {
        type: String,
        default: ''
      },
      position: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
      }
    },
    methods: {
    },
    watch: {
    }
  }
</script>
<style lang="scss" scoped>
</style>