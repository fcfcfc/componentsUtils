<template>
    <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item, index) in slidesArr" :key="item.id">
            <slot :itemInfo="{item, index}"/>
        </swiper-slide>
    </swiper>
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
     * slidesArr:slide数组，插槽为<template v-slot:default="slotProps"></template>，slotProps.itemInfo.item为对应的数据，slotProps.itemInfo.index为对应的下标
     * slidesPerView:设置slider容器能够同时显示的slides数量，可设的值为number or auto，默认1
     */
    /**
     * 组件的监听方法
     * getCurrentActiveIndex:监听activeIndex值的变化，返回activeIndex
     */
    /**
     * 组件的方法
     * slideToIndex:滑动到指定index
     */
    /**
     * 需要注意的事项
     * 1.需要安装以下依赖
     npm install --save vue-awesome-swiper
     */
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        name: "MySwiper",
        components: {
            swiper,
            swiperSlide
        },
        props: {
            slidesArr: {
                type: Array,
                default: function () {
                    return []
                }
            },
            slidesPerView: {
                type: Number,
                default: 1
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper || {}
            }
        },
        data() {
            return {
                swiperOption: {
                    slidesPerView: this.slidesPerView,
                    on:{
                        transitionEnd: () => this.$emit('getCurrentActiveIndex', this.swiper.activeIndex || 0),
                    }
                }
            }
        },
        methods: {
            slideToIndex(index) {
                this.swiper.slideTo(index)
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>