<template>
    <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide :style="{'width': slideWidth}" v-for="(item, index) in slidesArr" :key="item.id">
            <slot :itemInfo="{item, index}"/>
        </swiper-slide>
        <div class="swiper-scrollbar" v-if="useScrollbar" slot="scrollbar"></div>
    </swiper>
</template>

<script>
    import 'swiper/css/swiper.css'
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    export default {
        name: "MySwiper",
        components: {
          Swiper,
          SwiperSlide
        },
        props: {
            slidesArr: {
                type: Array,
                default: function () {
                    return []
                }
            },
            slidesPerView: {
                type: [Number, String],
                default: 1
            },
            freeMode: {
                type: Boolean,
                default: false
            },
            useScrollbar: {
                type: Boolean,
                default: false
            },
            scrollbarDragBgc: {
                type: String,
                default: 'rgba(0, 0, 0, 0.5)'
            },
            slideWidth: {
                type: String,
                default: ''
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper || {}
            }
        },
        data() {
            return {
                swiperOption: {
                    freeMode: this.freeMode,
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
            },
            updateSize() {
                this.swiper.updateSize()
            }
        },
        beforeMount() {
            if(this.useScrollbar) this.swiperOption.scrollbar = {
                el: '.swiper-scrollbar',
                hide: true
            }
        },
        mounted() {
            let swiperScrollbarDrag = document.getElementsByClassName('swiper-scrollbar-drag') || [];
            if(swiperScrollbarDrag.length > 0) swiperScrollbarDrag[0].style.backgroundColor = this.scrollbarDragBgc
        }
    }
</script>

<style lang="scss" scoped>
</style>
