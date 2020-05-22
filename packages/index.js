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
import KeepOnRecordDom from "./KeepOnRecordDom";
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
  KeepOnRecordDom
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
  KeepOnRecordDom
}
