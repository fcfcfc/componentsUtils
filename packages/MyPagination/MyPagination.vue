<template>
    <div class="myPagination" :class="newClass">
        <pagination
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
        </pagination>
    </div>
</template>

<script>
    import { Pagination } from "element-ui"
    export default {
        name: "MyPagination",
        components: {
            Pagination
        },
        props: {
            total: {
                type: Number,
                default: 0
            },
            myPageSizeArr: {
                type: Array,
                default: function () {
                    return [10, 20, 30, 50]
                }
            },
            selectActiveItemColor: {
                type: String,
                default: ''
            },
            paginationBgcActiveColor: {
                type: String,
                default: ''
            },
            paginationBorderHoverColor: {
                type: String,
                default: ''
            },
            layout: {
                type: String,
                default: 'prev, pager, next, sizes, jumper'
            }
        },
        data() {
            return {
                flag: false,
                pageSizeArr: this.myPageSizeArr,
                firstPageSize: this.myPageSizeArr[0],
                pageInfo: {
                    pageSize: this.myPageSizeArr[0],
                    pageNumber: 1
                }
            }
        },
        computed: {
            newClass() {
                let paginationBgcActiveColor = (this.paginationBgcActiveColor || '').replace(/#/g, '');
                if(paginationBgcActiveColor) paginationBgcActiveColor = 'a_' + paginationBgcActiveColor;
                let paginationBorderHoverColor = (this.paginationBorderHoverColor || '').replace(/#/g, '');
                if(paginationBorderHoverColor) paginationBorderHoverColor = 'b_' + paginationBorderHoverColor;
                return ` ${paginationBorderHoverColor} ${paginationBgcActiveColor}`
            }
        },
        mounted() {
            this.setCssRules()
        },
        methods: {
            setCssRules() {
                let length = document.styleSheets.length;
                let paginationBgcActiveColor = (this.paginationBgcActiveColor || '').replace(/#/g, '');
                let paginationBgcActiveColorRule = '';
                let paginationBorderHoverColor = (this.paginationBorderHoverColor || '').replace(/#/g, '');
                let paginationBorderHoverColorRule = '';
                let selectActiveItemColor = (this.selectActiveItemColor || '').replace(/#/g, '');
                let selectActiveItemColorRule = '';
                if(paginationBgcActiveColor) {
                    paginationBgcActiveColorRule = `.myPagination.a_${paginationBgcActiveColor} .el-pagination.is-background .el-pager li:not(.disabled).active`;
                }
                if(paginationBorderHoverColor) {
                    paginationBorderHoverColorRule = `.myPagination.b_${paginationBorderHoverColor} .el-select .el-input.is-focus .el-input__inner, .myPagination.b_${paginationBorderHoverColor} .el-input__inner:focus, .myPagination.b_${paginationBorderHoverColor} .el-input__inner:hover, .myPagination.b_${paginationBorderHoverColor} .el-pagination.is-background .el-pager li:not(.disabled):hover`;
                }
                if(selectActiveItemColor) {
                    selectActiveItemColorRule = `.el-select-dropdown__item.selected`;
                }
                document.styleSheets.forEach(item => {
                    //防止取到引用链接的样式，会跨域
                    if(!item.href) item.rules.forEach(rule => {
                        if(rule.selectorText === paginationBgcActiveColorRule) paginationBgcActiveColorRule = '';
                        if(rule.selectorText === paginationBorderHoverColorRule) paginationBorderHoverColorRule = '';
                    })
                })
                if(paginationBgcActiveColorRule) {
                    document.styleSheets[length - 1].addRule(paginationBgcActiveColorRule, `background-color: ${this.paginationBgcActiveColor} !important`)
                }
                if(selectActiveItemColorRule) {
                    document.styleSheets[length - 1].addRule(selectActiveItemColorRule, `color: ${this.selectActiveItemColor} !important`)
                }
                if(paginationBorderHoverColorRule) {
                    document.styleSheets[length - 1].addRule(paginationBorderHoverColorRule, `border-color: ${this.paginationBorderHoverColor} !important`)
                }
            },
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
    @import "../../css/mixins";
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
        /*/deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover {*/
        /*   !* border-color: $paginationBorderHoverColor*!*/
        /*}*/
        /*/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {*/
        /*    !*background-color: $theme_color1;*!*/
        /*}*/
    }
</style>
