<template>
  <div class="myRate">
    <el-rate
            @change="getValue()"
            :disabled="disabled"
            :disabled-void-color="disabledVoidColor"
            :colors="[color, color, color]"
            :allow-half="allowHalf"
            v-model="rateValue">

    </el-rate>
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
   * value:绑定值
   * disabled:是否为只读，默认值为false
   * disabledVoidColor:只读时未选中 icon 的颜色，默认为#EFF2F7
   * color:icon 的颜色，默认为#F7BA2A
   * allowHalf:是否允许半选，默认值为false
   */
  /**
   * 组件的监听方法
   * getValue:分值改变时触发，参数为改变后的分值
   */
  /**
   * 组件的方法（无）
   */
  /**
   * 需要注意的事项（无）
   */
  export default {
    name: 'Rate',
    props: {
      value: {
        type: Number,
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false
      },
      disabledVoidColor: {
        type: String,
        default: '#EFF2F7'
      },
      color: {
        type: String,
        default: '#F7BA2A'
      },
      allowHalf: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        rateValue: this.value
      }
    },
    methods: {
      getValue() {
        this.$emit('getValue', this.rateValue)
      }
    },
    watch: {
      value(n) {
        this.rateValue = n
      }
    }
  }
</script>
<style lang="scss" scoped>
  .myRate {
    /deep/ .el-rate {
      height: auto;

      .el-rate__item {
        margin-right: 35px;
        &:last-child {
          margin-right: 0;
        }
        .el-rate__icon {
          font-size: 30px;
          margin-right: 0;
        }
      }
    }
  }
</style>