<template>
    <div class="mySendMessageBox">
        <my-btn
                :height="height"
                :font-size="fontSize"
                :not-used="!((ifCheckPwd ? checkPwd() : true) && checkPhone() && !validateDisabled)"
                @myClick="sendValidateCode"
                width="150px"
                :text="validateText"/>
    </div>
</template>

<script>
    /**
     * vue.config.js中需要的配置（无）
     */
    /**
     * 依赖的组件
     * @/utils/components/MyBtn
     * @/utils/js/main.js
     */
    /**
     * 该组件的配置项
     * ifCheckPwd:是否检查密码，默认不检查
     * password:密码
     * phoneNumber:手机号
     * fontSize:自定义字体大小，默认为18px
     * height:自定义高度，默认为48px
     */
    /**
     * 组件的监听方法
     * sendSms:点击了按钮
     */
    /**
     * 组件的方法
     * sendSmsSuccess:调接口，之后成功后调用此方法，开始倒计时并且不能点击
     * sendSmsFail:调接口，之后失败后调用此方法，重置为初始状态
     */
    /**
     * 需要注意的事项
     * 1.此组件需要在父组件中手动调用组件内的方法使用
     */
    import Main from 'js-utils-common'
    import MyBtn from '../../MyBtn'
    export default {
        name: "MySendMessageBox",
        props: {
            ifCheckPwd: {
                type: Boolean,
                default: false
            },
            password: {
                type: String,
                default: ''
            },
            phoneNumber: {
                type: String,
                default: ''
            },
            height: {
                type: String,
                default: '48px'
            },
            fontSize: {
                type: String,
                default: '18px'
            }
        },
        components: {
            MyBtn
        },
        data() {
            return {
                validateDisabled: false,
                validateText: '获取验证码'
            }
        },
        methods: {
            checkPhone() {
                return Main.checkMobile(this.phoneNumber, true)
            },
            checkPwd() {
                return Main.checkPassword(this.password, true)
            },
            /**
             * 调接口，成功后调用下面方法
             */
            sendSmsSuccess() {
                let that = this;
                let second = 59;
                let setIntervalFun;

                that.validateText = '60秒';
                Main.myToast('验证码已发送，请注意查收');

                setIntervalFun = setInterval(() => {
                    if (second === -1) {
                        that.validateDisabled = false;
                        that.validateText = '获取验证码';
                        return clearInterval(setIntervalFun);
                    }
                    that.validateText = second + '秒';
                    second--;
                }, 1000);
            },
            /**
             * 调接口，失败后调用下面方法
             */
            sendSmsFail() {
                this.validateDisabled = false;
            },
            sendValidateCode() {
                let that = this;
                let validateDisabled = that.validateDisabled;

                if (!Main.checkMobile(that.phoneNumber)) return;
                if (validateDisabled) return;

                that.validateDisabled = true;
                this.$emit('sendSms');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mySendMessageBox {
        padding-left: 10px;
    }
</style>
