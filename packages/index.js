import ComponentFadeOutIn from './ComponentFadeOutIn'
import MyAudio from './MyAudio'
import CollapseTransition from "./CollapseTransition";
import MyFlowChart from "./MyFlowChart";
import MyFlvVideo from "./MyFlvVideo";
import MyQRCode from "./MyQRCode";
import MySaveToPDF from "./MySaveToPDF";
import MyRate from "./MyRate";
import MyBtn from "./MyBtn";
import MyMask from "./MyMask";
import MySendMessageBox from "./MySendMessageBox";
import MySwiper from "./MySwiper";
import MyVideo from "./MyVideo";
import MyCheckbox from "./MyCheckbox";
import MyDatePickerRange from "./MyDatePickerRange";
import MyCascader from "./MyCascader";
import MyDialog from "./MyDialog";
import MyInput from "./MyInput";
import MyPagination from "./MyPagination";
import MySelect from "./MySelect";
import MyUpload from "./MyUpload";
import MyProgress from "./MyProgress";
import MyRadio from "./MyRadio";
import MyTable from "./MyTable";
import MyTimeline from "./MyTimeline";
import MyToolTip from "./MyToolTip";
import VerticalNavMenu from "./VerticalNavMenu";
import MyTree from "./MyTree";
import MyBackTop from "./MyBackTop";
import EChartsBarType1 from "./EChartsBarType1";
import EChartsBarType2 from "./EChartsBarType2";
import EChartsBarType3 from "./EChartsBarType3";
import EChartsLineType1 from "./EChartsLineType1";
import EChartsRadarType1 from "./EChartsRadarType1";
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
