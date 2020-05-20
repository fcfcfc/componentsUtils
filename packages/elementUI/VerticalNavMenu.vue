<template>
    <el-menu
            :default-active="this.$route.name"
            class="verticalNavMenu"
            :class="newClass"
            :style="{
                'height': height,
                'width': width
            }"
            :background-color="bgcColor"
            :text-color="fontColor"
            :unique-opened="true"
            :router="true"
            :active-text-color="activeFontColor">
        <div v-for="(item, index) in menuList" :key="index">
            <el-submenu :index="index + ''" v-if="item.children" :disabled="item.ifDisable">
                <template slot="title">
                    <i class="el-icon-" :class="item.iconClass" v-if="item.iconClass"></i>
                    <span>{{item.label}}</span>
                </template>
                <el-menu-item :index="child.toUrl"
                              v-for="(child, i) in item.children"
                              :disabled="child.ifDisable"
                              :key="i">{{child.label}}</el-menu-item>
            </el-submenu>
            <el-menu-item :index="item.toUrl" v-else :disabled="item.ifDisable">
                <i class="el-icon-" :class="item.iconClass" v-if="item.iconClass"></i>
                <span>{{item.label}}</span>
            </el-menu-item>
        </div>
    </el-menu>
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
     * menuList:菜单的数组，例：
     [
     {
            ifDisable: true, //禁用
            toUrl: 'home', //对应的路由
            label: '首页', //菜单显示的名称
            iconClass: '1' //菜单前的图标class，不使用图标不设置此属性。例如el-icon-document
        },
     {
            label: '基础参数维护',
            iconClass: '2',
            children: [ //有二级菜单时，子菜单数组，没有不设置此属性
                {
                    toUrl: 'interrogation1',
                    label: '问诊项目'
                },
                {
                    toUrl: 'interrogation2',
                    label: '问诊项目'
                },
                {
                    toUrl: 'interrogation3',
                    label: '问诊项目'
                }
            ]
        }
     ]
     * width:自定义宽度（带单位）
     * height:自定义高度，默认为100%（带单位）
     * bgcColor:背景颜色
     * fontColor:文字颜色
     * activeFontColor:选中的文字颜色
     * activeBgcColor:自定义菜单的选中背景颜色样式
     * hoverBgcColor:自定义菜单的hover背景颜色样式
     * itemHeight:菜单的高度，默认为56px
     * iconSize:图标的大小，默认为18px
     * iconMarginRight:图标和标题中间的间距，默认为5px
     * itemPaddingRight:菜单的右边距，默认为20px
     * itemPaddingLeft:菜单的左边距，默认为20px
     * subItemPaddingLeft:子菜单的左边距，默认为20px
     * arrowIconUrl:下拉箭头图标路径，尽量使用require
     * arrowIconWidth:下拉箭头图标宽度（带单位）
     * arrowIconHeight:下拉箭头图标高度（带单位）
     */
    /**
     * 组件的监听方法（无）
     */
    /**
     * 组件的方法（无）
     */
    /**
     * 需要注意的事项
     * 1.菜单的图标使用阿里巴巴矢量库的图标，font-family为font-family: "font_family" !important;
     */
    export default {
        name: "VerticalNavMenu",
        props: {
            width: {
                type: String,
                default: ''
            },
            height: {
                type: String,
                default: '100%'
            },
            bgcColor: {
                type: String,
                default: ''
            },
            fontColor: {
                type: String,
                default: ''
            },
            activeFontColor: {
                type: String,
                default: ''
            },
            activeBgcColor: {
                type: String,
                default: ''
            },
            hoverBgcColor: {
                type: String,
                default: ''
            },
            itemHeight: {
                type: String,
                default: '56px'
            },
            iconSize: {
                type: String,
                default: '18px'
            },
            iconMarginRight: {
                type: String,
                default: '5px'
            },
            itemPaddingRight: {
                type: String,
                default: '20px'
            },
            itemPaddingLeft: {
                type: String,
                default: '20px'
            },
            arrowIconUrl: {
                type: String,
                default: ''
            },
            arrowIconWidth: {
                type: String,
                default: ''
            },
            arrowIconHeight: {
                type: String,
                default: ''
            },
            subItemPaddingLeft: {
                type: String,
                default: '20px'
            },
            menuList: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        computed: {
            newClass() {
                let activeBgcColor = (this.activeBgcColor || '').replace(/#/g, '');
                let hoverBgcColor = (this.hoverBgcColor || '').replace(/#/g, '');
                if(activeBgcColor) activeBgcColor = 'a_' + activeBgcColor;
                if(hoverBgcColor) hoverBgcColor = 'a_' + hoverBgcColor;
                return ` ${activeBgcColor} ${hoverBgcColor}`
            }
        },
        mounted() {
            this.setCssRules();
            this.setStyles()
        },
        methods: {
            setCssRules() {
                let length = document.styleSheets.length;
                let activeBgcColor = (this.activeBgcColor || '').replace(/#/g, '');
                let hoverBgcColor = (this.hoverBgcColor || '').replace(/#/g, '');
                let hoverBgcColorRule = '';
                let activeBgcColorRule = '';
                if(hoverBgcColor) {
                    hoverBgcColorRule = `.verticalNavMenu.a_${hoverBgcColor} .el-menu-item:hover, .el-submenu__title:hover`;
                }
                if(activeBgcColor) {
                    activeBgcColorRule = `.verticalNavMenu.a_${activeBgcColor} .el-menu-item.is-active`;
                }
                document.styleSheets.forEach(item => {
                    item.rules.forEach(rule => {
                        if(rule.selectorText === hoverBgcColorRule) hoverBgcColorRule = '';
                        if(rule.selectorText === activeBgcColorRule) activeBgcColorRule = '';
                    })
                })
                if(hoverBgcColorRule) {
                    document.styleSheets[length - 1].addRule(hoverBgcColorRule, `background-color: ${this.hoverBgcColor} !important`);
                }
                if(activeBgcColorRule) {
                    document.styleSheets[length - 1].addRule(activeBgcColorRule, `background-color: ${this.activeBgcColor} !important`)
                }
            },
            setStyles() {
                document.getElementsByClassName('el-menu-item').forEach(item => {
                    item.style.height = this.itemHeight;
                    item.style.lineHeight = this.itemHeight;
                    item.style.paddingRight = this.itemPaddingRight;
                    item.style.paddingLeft = this.itemPaddingLeft;
                });
                document.getElementsByClassName('el-menu--inline').forEach(item => {
                    item.style.paddingLeft = this.subItemPaddingLeft;
                });
                document.getElementsByClassName('el-submenu__title').forEach(item => {
                    item.style.height = this.itemHeight;
                    item.style.lineHeight = this.itemHeight;
                    item.style.paddingRight = this.itemPaddingRight;
                    item.style.paddingLeft = this.itemPaddingLeft;
                });
                document.getElementsByClassName('el-submenu__icon-arrow').forEach(item => {
                    item.style.height = this.arrowIconHeight;
                    item.style.width = this.arrowIconWidth;
                    item.style.backgroundImage = `url(${this.arrowIconUrl})`;
                });
                document.getElementsByClassName('el-icon-').forEach(item => {
                    item.style.fontSize = this.iconSize;
                    item.style.width = this.iconSize;
                    item.style.marginRight = this.iconMarginRight;
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .verticalNavMenu {
        .el-icon- {
            font-family: "font_family" !important;
        }
        /deep/.el-submenu__icon-arrow:before {
            content: '';
        }
    }
</style>