<template>
    <div class="myDatePickerRange_Firefox myDatePickerRange"
         :class="newClass"
         :style="{'height': height, 'width': width}">
        <date-picker
                :style="{'height': (height ? height : '48px'), 'width': width}"
                @change="sendValueToFather"
                v-model="dateValue"
                type="daterange"
                unlink-panels
                range-separator="至"
                :format="format"
                :picker-options="options"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
        </date-picker>
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
     * format:显示在输入框中的格式，默认为yyyy-MM-dd
     * initValue:初始值，开始时间和结束时间数组，比如[new Date(), new Date()]
     * disableMaxDate:禁用的最大日期，默认不禁用，需要禁用时传入new Date()可以解析的字符串
     * disableMinDate:禁用的最小日期，默认不禁用，需要禁用时传入new Date()可以解析的字符串
     * width:自定义宽度(带单位)
     * height:自定义高度，默认为48px
     * inputHoverBorderColor:输入框在hover时的边框颜色
     */
    /**
     * 组件的监听方法
     * changeValue:值改变时触发，参数为开始时间和结束时间数组，Date类型
     */
    /**
     * 组件的方法（无）
     */
    /**
     * 需要注意的事项（无）
     */
    import Main from "js-utils-common"
    import { DatePicker } from "element-ui"
    export default {
        name: "MyDatePickerRange",
        components: {
          DatePicker
        },
        props: {
            format: {
                type: String,
                default: 'yyyy-MM-dd'
            },
            disableMaxDate: {
                type: String,
                default: ''
            },
            disableMinDate: {
                type: String,
                default: ''
            },
            width: [String],
            height: {
                type: String,
                default: '48px'
            },
            inputHoverBorderColor: {
                type: String,
                default: ''
            },
            initValue: {
                type: Array,
                default: function () {
                    return []
                }
            },
        },
        data() {
            return {
                dateValue: this.initValue,
                options: {}
            }
        },
        mounted() {
            this.setCssRules();
            if(this.disableMaxDate || this.disableMinDate) {
                this.options.disabledDate = time => {
                    if(this.disableMinDate && this.disableMaxDate) {
                        return time.getTime() < new Date(this.disableMinDate).getTime() || time.getTime() > new Date(this.disableMaxDate).getTime()
                    }
                    if(this.disableMaxDate) {
                        return time.getTime() > new Date(this.disableMaxDate).getTime()
                    }
                    if(this.disableMinDate) {
                        return time.getTime() < new Date(this.disableMinDate).getTime()
                    }
                };
            }
        },
        watch: {
            initValue(val) {
                this.dateValue = val
            }
        },
        computed: {
            newClass() {
                let inputHoverBorderColor = (this.inputHoverBorderColor || '').replace(/#/g, '');
                if(inputHoverBorderColor) inputHoverBorderColor = 'a_' + inputHoverBorderColor;
                return ` ${inputHoverBorderColor}`
            }
        },
        methods: {
            setCssRules() {
                let length = document.styleSheets.length;
                let inputHoverBorderColor = (this.inputHoverBorderColor || '').replace(/#/g, '');
                let inputHoverBorderColorRule = '';
                let fixFirFoxBugRule = '';
                if(inputHoverBorderColor) {
                  inputHoverBorderColorRule = `.myDatePickerRange.a_${inputHoverBorderColor} .el-date-editor--daterange.el-input > input:hover, .myDatePickerRange.a_${inputHoverBorderColor} .el-date-editor--daterange.el-input__inner > input:hover, .myDatePickerRange.a_${inputHoverBorderColor} .el-date-editor--timerange.el-input > input:hover, .myDatePickerRange.a_${inputHoverBorderColor} .el-date-editor--timerange.el-input__inner > input:hover`;
                }
                //解决火狐flex:1的兼容问题
                if(Main.getBrowserName() === 'Firefox') {
                    fixFirFoxBugRule = '.myDatePickerRange_Firefox .el-date-editor--daterange.el-input__inner > input';
                }
                document.styleSheets.forEach(item => {
                  //防止取到引用链接的样式，会跨域
                    if(!item.href) item.rules.forEach(rule => {
                        if(rule.selectorText === inputHoverBorderColorRule) inputHoverBorderColorRule = '';
                        if(rule.selectorText === fixFirFoxBugRule) fixFirFoxBugRule = '';
                    })
                })
                if(fixFirFoxBugRule) {
                    document.styleSheets[length - 1].addRule(fixFirFoxBugRule, 'flex: unset !important;flex-grow:1 !important;');
                }
                if(inputHoverBorderColorRule) {
                    document.styleSheets[length - 1].addRule(inputHoverBorderColorRule, `border-color: ${this.inputHoverBorderColor}`)
                }
            },
            sendValueToFather() {
                this.$emit('changeValue', this.dateValue)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .myDatePickerRange {
        /deep/ .el-date-editor--daterange.el-input,
        /deep/ .el-date-editor--daterange.el-input__inner,
        /deep/ .el-date-editor--timerange.el-input,
        /deep/ .el-date-editor--timerange.el-input__inner {
            width: 100%;
            border-width: 0;
            padding: 0;
            height: inherit;
            font-size: inherit;
            display: flex;
            &>input {
                flex: 1;
                color: #333333;
                height: inherit;
                font-size: inherit;
                border: 1px #cdcdcd solid;
                border-radius: 4px;
                line-height: 40px;
                &::-webkit-input-placeholder { /* WebKit browsers */
                    color: #999999;
                }
                &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                    color: #999999;
                }
                &::-moz-placeholder { /* Mozilla Firefox 19+ */
                    color: #999999;
                }
                &:-ms-input-placeholder { /* Internet Explorer 10+ */
                    color: #999999;
                }
            }

            .el-input__icon {
                display: none;
            }
            .el-range-separator {
                font-size: inherit;
                width: auto;
                padding: 0 9px;
            }
        }
    }
</style>
