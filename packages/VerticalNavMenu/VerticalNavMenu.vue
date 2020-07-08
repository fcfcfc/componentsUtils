<template>
    <el-menu
            :default-active="defaultActive"
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
    import { Menu, MenuItem, Submenu } from "element-ui"
    export default {
        name: "VerticalNavMenu",
        components: {
            ElMenu: Menu,
            ElMenuItem: MenuItem,
            ElSubmenu: Submenu
        },
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
        data() {
            return {
            }
        },
        computed: {
            defaultActive() {
                return this.$route ? this.$route.name : '';
            },
            newClass() {
                let activeBgcColor = (this.activeBgcColor || '').replace(/#/g, '');
                let hoverBgcColor = (this.hoverBgcColor || '').replace(/#/g, '');
                if(activeBgcColor) activeBgcColor = 'a_' + activeBgcColor;
                if(hoverBgcColor) hoverBgcColor = 'b_' + hoverBgcColor;
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
                    hoverBgcColorRule = `.verticalNavMenu.b_${hoverBgcColor} .el-menu-item:hover, .el-submenu__title:hover`;
                }
                if(activeBgcColor) {
                    activeBgcColorRule = `.verticalNavMenu.a_${activeBgcColor} .el-menu-item.is-active`;
                }
                document.styleSheets.forEach(item => {
                    if(!item.href) item.rules.forEach(rule => {
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
