<template>
    <div class="myPagination">
        <el-pagination
                ref="elPagination"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                :current-page="pageInfo.pageNumber"
                :hide-on-single-page="total <= firstPageSize"
                :page-size="pageInfo.pageSize"
                :page-sizes="pageSizeArr"
                :pager-count="5"
                :layout="layout"
                :total="total">
            <div>123</div>
        </el-pagination>
    </div>
</template>

<script>
    /**
     * vue.config.js中需要的配置（无）
     */
    /**
     * 依赖的组件
     * @/config/config
     */
    /**
     * 该组件的配置项
     * $paginationBorderHoverColor:自定义hover时边框的颜色
     * total:总条目数
     * layout:自定义组件布局，子组件名用逗号分隔，默认为'prev, pager, next, sizes, jumper'，可选'prev, pager, next, jumper, ->, total'
     */
    /**
     * 组件的监听方法
     * pageInfoChange:分页信息改变时会触发，{currentPageSize,pageNumber}
     */
    /**
     * 组件的方法
     * setPaginationInfo:设置当前的分页信息，包含{pageSizeIndex,pageNumber}
     * setFlagFalse:设置flag为false（flag的作用是比如5条每页有三页，选中第三页时改成100页每条，不用flag控制会调用两次接口）
     * goToAjax:统一的调用ajax的方法，参数为callback(pageInfo)
     */
    /**
     * 需要注意的事项（无）
     */
    import Config from '@/config/config'
    export default {
        name: "MyPagination",
        props: {
            total: {
                type: Number,
                default: 0
            },
            layout: {
                type: String,
                default: 'prev, pager, next, sizes, jumper'
            }
        },
        data() {
            return {
                flag: false,
                pageSizeArr: Config.pageSizeArr,
                firstPageSize: Config.pageSizeArr[0],
                pageInfo: {
                    pageSize: Config.pageSizeArr[0],
                    pageNumber: 1
                }
            }
        },
        methods: {
            handleSizeChange(val) {
                this.pageInfo.pageSize = val;
            },
            handleCurrentChange(val) {
                this.pageInfo.pageNumber = val;
            },
            goToAjax(callback) {
                if(!this.flag) {
                    this.flag = true;
                    setTimeout(() => callback(this.pageInfo), 0)
                }
            },
            setPaginationInfo(val) {
                this.pageInfo = {
                    pageSize: this.pageSizeArr[val.pageSizeIndex],
                    pageNumber: val.pageNumber
                };
            },
            setFlagFalse() {
                this.flag = false;
            }
        },
        watch: {
            pageInfo: {
                handler() {
                    this.$emit('pageInfoChange', this.pageInfo)
                },
                deep: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .myPagination {
        /deep/ .el-pagination.is-background .btn-prev,
        /deep/ .el-pagination.is-background .btn-next,
        /deep/ .el-pagination.is-background .el-pager li {
            @include myBorder(all, #eaeaea);
            background-color: #FFFFFF;
        }
        /deep/ .el-pagination {
            font-weight: unset;
        }
        /deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover {
            border-color: $paginationBorderHoverColor
        }
        /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
            background-color: $theme_color1;
        }
    }
</style>