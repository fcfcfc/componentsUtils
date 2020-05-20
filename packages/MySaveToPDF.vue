<template>
    
</template>

<script>
    /**
     * vue.config.js中需要的配置（无）
     */
    /**
     * 依赖的组件（无）
     */
    /**
     * 该组件的配置项（无）
     */
    /**
     * 组件的监听方法（无）
     */
    /**
     * 组件的方法
     * saveToPDFFn:将指定dom转为pdf并下载，参数为pdf文档名称和要转的dom
     * printPDFFn:将指定dom转为pdf后打印（只能在弹出的新窗口打印），参数为要打印的dom
     */
    /**
     * 需要注意的事项
     * 1.安装依赖
        npm install --save html2canvas //将页面html转换成图片
        npm install jspdf --save //将图片生成pdf
     * 2.使用方法
         import MySaveToPDF from "@/utils/components/MySaveToPDF";
         MySaveToPDF.methods.saveToPDFFn('我的模拟实践训练成绩', this.$refs.myTable)
         MySaveToPDF.methods.printPDFFn(this.$refs.myTable)
     */
    import html2Canvas from 'html2canvas'
    import JsPDF from 'jspdf'
    export default {
        name: "MySaveToPDF",
        methods: {
            toPdfFn(domObj, callback) {
                window.pageYOffset = 0;
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                html2Canvas(domObj, {
                    scale: window.devicePixelRatio * 2,
                    allowTaint: true
                }).then(function (canvas) {
                    let pdf = new JsPDF('p', 'mm', 'a4');    //A4纸，纵向
                    let ctx = canvas.getContext('2d'),
                        a4w = 190, a4h = 277, //A4大小，210mm x 297mm，四边各保留10mm的边距，显示区域190x277
                        imgHeight = Math.floor(a4h * canvas.width / a4w), //按A4显示比例换算一页图像的像素高度
                        renderedHeight = 0;

                    while(renderedHeight < canvas.height) {
                        let page = document.createElement("canvas");
                        page.width = canvas.width;
                        page.height = Math.min(imgHeight, canvas.height - renderedHeight);//可能内容不足一页

                        //用getImageData剪裁指定区域，并画到前面创建的canvas对象中
                        page.getContext('2d').putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0);
                        //添加图像到页面，保留10mm边距
                        pdf.addImage(page.toDataURL('image/jpeg', 1.0), 'JPEG', 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width));

                        renderedHeight += imgHeight;
                        if(renderedHeight < canvas.height) pdf.addPage(); //如果后面还有内容，添加一个空页
                    }

                    callback && callback(pdf);
                })
            },
            saveToPDFFn(title, domObj) {
                this.toPdfFn(domObj, PDF => PDF.save(title + '.pdf'))
            },
            printPDFFn(domObj) {
                this.toPdfFn(domObj, PDF => {
                    PDF.autoPrint();
                    PDF.output("dataurlnewwindow");
                })
            }
        }
    }
</script>

<style scoped>

</style>