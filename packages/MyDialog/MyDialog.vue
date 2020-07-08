<template>
    <div class="myDialog">
        <dialog-u-i @close="closeFn" :width="width" :title="title" :visible.sync="ifShowStatus">
            <slot/>
        </dialog-u-i>
    </div>
</template>

<script>
    import { Dialog } from 'element-ui'
    export default {
        name: "MyDialog",
        components: {
            DialogUI: Dialog
        },
        props: {
            ifShow: {
                type: Boolean,
                default: false
            },
            width: {
                type: String,
                default: '50%'
            },
            title: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                ifShowStatus: this.ifShow
            }
        },
        methods: {
            closeFn() {
                this.$emit('closeFn')
            }
        },
        watch: {
            ifShow(val) {
                this.ifShowStatus = val
            }
        }
    }
</script>

<style lang="scss" scoped>
    .myDialog {

    }
</style>
