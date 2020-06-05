import ComponentFadeOutIn from './ComponentFadeOutIn'
import MyAudio from './MyAudio'
import CollapseTransition from "./CollapseTransition";
import MyFlowChart from "./MyFlowChart";
import MyFlvVideo from "./MyFlvVideo";
import MyQRCode from "./MyQRCode";
import MySaveToPDF from "./MySaveToPDF";
import MyRate from "./elementUI/MyRate";
import MyBtn from "./MyBtn";
import MyMask from "./MyMask";
import MySendMessageBox from "./elementUI/MySendMessageBox";
import MySwiper from "./MySwiper";
import MyVideo from "./MyVideo";
import MyCheckbox from "./elementUI/MyCheckbox";
import MyDatePickerRange from "./elementUI/MyDatePickerRange";
import KeepOnRecordDom from "./KeepOnRecordDom";
import MyCascader from "./elementUI/MyCascader";
import MyDialog from "./elementUI/MyDialog";
import MyInput from "./elementUI/MyInput";
import MyPagination from "./elementUI/MyPagination";
import MySelect from "./elementUI/MySelect";
import MyUpload from "./elementUI/MyUpload";
import MyProgress from "./elementUI/MyProgress";
import MyRadio from "./elementUI/MyRadio";
import MyTable from "./elementUI/MyTable";
import MyTimeline from "./elementUI/MyTimeline";
import MyToolTip from "./elementUI/MyToolTip";
import VerticalNavMenu from "./elementUI/VerticalNavMenu";
import MyTree from "./elementUI/MyTree";
import MyBackTop from "./elementUI/MyBackTop";
import EChartsBarType1 from "./eCharts/EChartsBarType1";
import EChartsBarType2 from "./eCharts/EChartsBarType2";
import EChartsBarType3 from "./eCharts/EChartsBarType3";
import EChartsLineType1 from "./eCharts/EChartsLineType1";
import EChartsRadarType1 from "./eCharts/EChartsRadarType1";
const components = [
    ComponentFadeOutIn,
    MyAudio,
    CollapseTransition,
    MyFlowChart,
    MyFlvVideo,
    MyQRCode,
    MySaveToPDF,
    MyRate,
    MyBtn,
    MyMask,
    MySendMessageBox,
    MySwiper,
    MyVideo,
    MyCheckbox,
    MyDatePickerRange,
    KeepOnRecordDom,
    MyCascader,
    MyDialog,
    MyInput,
    MyPagination,
    MySelect,
    MyUpload,
    MyProgress,
    MyRadio,
    MyTable,
    MyTimeline,
    MyToolTip,
    VerticalNavMenu,
    MyTree,
    MyBackTop,
    EChartsBarType1,
    EChartsBarType2,
    EChartsBarType3,
    EChartsLineType1,
    EChartsRadarType1
]
const install = function (Vue, opts = {}) {
    components.map(component => {
        Vue.component(component.name, component)
    })
}
/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
export default {
    install,
    ComponentFadeOutIn,
    MyAudio,
    CollapseTransition,
    MyFlowChart,
    MyFlvVideo,
    MyQRCode,
    MySaveToPDF,
    MyRate,
    MyBtn,
    MyMask,
    MySendMessageBox,
    MySwiper,
    MyVideo,
    MyCheckbox,
    MyDatePickerRange,
    KeepOnRecordDom,
    MyCascader,
    MyDialog,
    MyInput,
    MyPagination,
    MySelect,
    MyUpload,
    MyProgress,
    MyRadio,
    MyTable,
    MyTimeline,
    MyToolTip,
    VerticalNavMenu,
    MyTree,
    MyBackTop,
    EChartsBarType1,
    EChartsBarType2,
    EChartsBarType3,
    EChartsLineType1,
    EChartsRadarType1
}
