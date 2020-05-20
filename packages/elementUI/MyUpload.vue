<template>
    <el-upload
            class="upload-demo"
            ref="upload"
            :limit="2"
            :disabled="disableStatus"
            :multiple="false"
            :show-file-list="false"
            :accept="accept"
            action="#"
            :http-request="httpRequest"
            :on-change="changeFn"
            :file-list="fileList"
            :auto-upload="autoUpload">
        <my-btn class="upBtnBtn"
                ref="myBtn"
                :width="btnWidth"
                :height="btnHeight"
                text="选择文件"/>
        <slot/>
    </el-upload>
</template>
<script>
    /**
     * vue.config.js中需要的配置（无）
     */
    /**
     * 依赖的组件
     * @/utils/components/MyBtn
     * @/utils/js/main
     */
    /**
     * 该组件的配置项
     * uploadUrl:上传的地址
     * accept:接受上传的文件类型（thumbnail-mode 模式下此参数无效）
     * btnHeight:选择文件按钮高度，默认为48px
     * btnWidth:选择文件按钮宽度，默认为180px
     * useDiySuccess:启用上传成功的监听uploadComplete直接返回response，不做其它逻辑判断，默认不启用
     * ifDisable:是否禁用
     * autoUpload:是否在选取文件后立即进行上传，默认false
     * ajaxPlugin:axios对象
     * fileToBase64:文件是否转base64，默认不转
     * setDiyAjaxDataFn:文件转base64时可用，设置要传给接口的指定data，参数为转好的base64编码和上传文件的后缀
     */
    /**
     * 组件的监听方法
     * uploadComplete:上传成功，如果设置了useDiySuccess，返回response，否则返回response.data
     * uploadError:上传失败或者成功后返回的response的code不是'0000'
     * getFileName:文件变更的监听，参数为文件的名称
     * getCurrentFile:文件变更的监听，参数为当前文件
     */
    /**
     * 组件的方法
     * startUpload:手动开始上传
     * cancelUpload:取消上传
     * getFilesArr:获取当前已选择的文件数组
     */
    /**
     * 需要注意的事项
     * 1.加载此组件，只显示一个选择文件的按钮
     * 2.如需做文件的大小校验，可以将autoUpload设为false，在getCurrentFile这个监听中做完校验后调用startUpload方法
     * 3.该组件只支持单文件上传！
     */
    import MyBtn from '@/utils/components/MyBtn'
    import Main from '@/utils/js/main'
    export default {
        props: {
            uploadUrl: {
                type: String,
                default: ''
            },
            ajaxPlugin: {
                type: Function,
                default: function () {}
            },
            setDiyAjaxDataFn: {
                type: Function,
                default: function () {
                    return null
                }
            },
            accept: {
                type: String,
                default: ''
            },
            btnHeight: {
                type: String,
                default: '48px'
            },
            btnWidth: {
                type: String,
                default: '180px'
            },
            ifDisable: {
                type: Boolean,
                default: false
            },
            fileToBase64: {
                type: Boolean,
                default: false
            },
            autoUpload: {
                type: Boolean,
                default: false
            },
            useDiySuccess: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                disableStatus: this.ifDisable,
                fileList: [],
                fileReader: ''
            };
        },
        watch: {
            ifDisable(val) {
                this.disableStatus = val
            }
        },
        mounted() {
            if (!window.FileReader) {
                Main.myAlert('Your browser does not support FileReader API!');
                this.disableStatus = true;
            } else {
                this.fileReader = new FileReader();
            }
        },
        methods: {
            // eslint-disable-next-line no-unused-vars
            httpRequest (options) {

            },
            myUploadFn(config) {
                // eslint-disable-next-line no-undef
                this.ajaxPlugin(config)
                    .then(res => {
                        this.successFn(res)
                    })
                    .catch(err => {
                        this.errorFn(err)
                    })
            },
            myUpload() {
                let file = this.fileList[0].raw;
                if(this.fileToBase64) {
                    this.fileReader.readAsDataURL(file);
                    this.fileReader.onload = () => {
                        let base64Str = this.fileReader.result.split(',')[1];
                        this.myUploadFn({
                            url: this.uploadUrl,
                            method: 'post',
                            data: this.setDiyAjaxDataFn(base64Str, Main.getFileSuffix(file.name)) ? this.setDiyAjaxDataFn(base64Str, Main.getFileSuffix(file.name)) : {
                                file: base64Str,
                                suffix: Main.getFileSuffix(file.name)
                            },
                            onUploadProgress: this.progressFn
                        })
                    }
                } else {
                    const form = new FormData();
                    form.append('file', file);
                    this.myUploadFn({
                        url: this.uploadUrl,
                        method: 'post',
                        headers: {
                            'Content-Type': 'multipart/form-data;'
                        },
                        data: form,
                        onUploadProgress: this.progressFn
                    })
                }
            },
            startUpload() {
                this.myUpload()
            },
            cancelUpload(file) {
                this.$refs.upload.abort(file);
            },
            successFn(response) {
                if(this.useDiySuccess) {
                    this.$emit('uploadComplete', response)
                } else {
                    if(response.code !== '0000') {
                        this.$emit('uploadError');
                        Main.myAlert(response.msg)
                    }else {
                        this.$emit('uploadComplete', response.data)
                    }
                }
                this.cancelUpload()
            },
            errorFn(err) {
                // eslint-disable-next-line no-console
                console.log(err);
                if(!this.fileToBase64) Main.myAlert(err);
                this.$emit('uploadError');
                this.cancelUpload()
            },
            progressFn(event, file, fileList) {
                // eslint-disable-next-line no-console
                console.log(event, file, fileList)
            },
            changeFn(file, fileList) {
                if(file.status === 'success') return;
                this.fileList = fileList.slice(-1); //这步过后，fileList只剩下最新的一个，实现自动替换文件的功能，但是需设置limit为2
                this.$emit('getFileName', file.name);
                this.$emit('getCurrentFile', file);
                this.$nextTick(() => {
                    if(this.autoUpload) this.startUpload()
                })
            },
            getFilesArr() {
                return this.fileList
            }
        },
        components: {
            MyBtn
        }
    }
</script>
<style lang="scss" scoped>
    .upload-demo {
        /deep/ .el-upload {
            width: 100%;
        }
    }
</style>