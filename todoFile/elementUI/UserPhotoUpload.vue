<template>
    <div class="userPhotoUpload">
        <el-upload
                class="avatar-uploader"
                :action="apiUrl"
                :headers="headers"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
     * apiUrl:上传调用的完整接口地址
     * headers:上传调用的接口所需设置的header
     * initImg:初始图片地址
     * successTip:成功上传后的提示语
     * successTipOffset:成功上传后的提示语框的偏移量
     */
    /**
     * 组件的监听方法
     * successFn:上传成功，参数为接口返回的data
     */
    /**
     * 组件的方法（无）
     */
    /**
     * 需要注意的事项
     * 1.上传头像图片只能是 png 格式并且大小不能超过 2MB
     */
    import Main from '@/utils/js/main'
    export default {
        name: "UserPhotoUpload",
        props: {
            successTipOffset: {
                type: Number,
                default: 20
            },
            initImg: {
                type: String,
                default: ''
            },
            successTip: {
                type: String,
                default: '已成功上传头像！'
            },
            apiUrl: {
                type: String,
                default: ''
            },
            headers: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
        data() {
            return {
                imageUrl: this.initImg
            };
        },
        methods: {
            handleAvatarSuccess(res, file) {
                if(res.code === '0000') {
                    Main.myMessage(this.successTip, this.successTipOffset);
                    this.imageUrl = URL.createObjectURL(file.raw);
                    this.$emit('successFn', res.data)
                }else {
                    Main.myAlert(res.msg)
                }
            },
            beforeAvatarUpload(file) {
                const isPng = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isPng) {
                    Main.myAlert('上传头像图片只能是 png 格式!')
                }
                if (!isLt2M) {
                    Main.myAlert('上传头像图片大小不能超过 2MB!')
                }
                return isPng && isLt2M;
            }
        },
        watch: {
            initImg(val) {
                this.imageUrl = val;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .userPhotoUpload {
        /deep/ .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        /deep/ .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        /deep/ .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        /deep/ .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
</style>