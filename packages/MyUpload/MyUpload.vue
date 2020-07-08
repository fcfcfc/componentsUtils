<template>
    <el-upload
            class="upload-demo"
            ref="upload"
            :limit="2"
            :disabled="disableStatus"
            :multiple="false"
            :show-file-list="false"
            :accept="accept"
            placeholder action="#"
            :http-request="httpRequest"
            :on-change="changeFn"
            :file-list="fileList"
            :auto-upload="autoUpload">
        <my-btn class="upBtnBtn"
                ref="myBtn"
                :background-color="backgroundColor"
                :background-color-hover="backgroundColorHover"
                :color="color"
                :width="btnWidth"
                :height="btnHeight"
                text="选择文件"/>
        <slot/>
    </el-upload>
</template>
<script>
    import MyBtn from '../MyBtn'
    import Main from "js-utils-common";
    import { Upload } from "element-ui"
    export default {
        name: "MyUpload",
        components: {
            ElUpload: Upload,
            MyBtn
        },
        props: {
            color: {
                type: String,
                default: ''
            },
            backgroundColor: {
                type: String,
                default: ''
            },
            backgroundColorHover: {
                type: String,
                default: ''
            },
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
