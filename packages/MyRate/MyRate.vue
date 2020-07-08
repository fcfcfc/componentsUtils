<template>
  <div class="myRate">
    <rate
            @change="getValue()"
            :disabled="disabled"
            :disabled-void-color="disabledVoidColor"
            :colors="[color, color, color]"
            :allow-half="allowHalf"
            v-model="rateValue">

    </rate>
  </div>
</template>
<script>
  import { Rate } from 'element-ui'
  export default {
    name: 'MyRate',
    components: {
      Rate
    },
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
