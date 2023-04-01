import Vue from 'vue';

import PieChart from "./echarts/PieChart";
import BarChart from "./echarts/BarChart";
import MapChart from "./echarts/MapChart";
import GlDialog from './dialog/GlDialog';
import GlDrawer from './drawer/GlDrawer';
import GlSelect from './select/GlSelect';
import GlForm from './form/GlForm';
import FormItem from './form/FormItem';
import GlProgress from './progress/GlProgress';
import ProgressBar from './progress/ProgressBar';
import GlTree from './tree/GlTree.vue';
import Organ from './organ/Organ';
import EduOrgan from './organ/EduOrgan';
import ImageList from './image/ImageList';

const components = [
    PieChart,
    BarChart,
    MapChart,
    GlDialog,
    GlDrawer,
    GlSelect,
    GlForm,
    FormItem,
    GlProgress,
    ProgressBar,
    GlTree,
    Organ,
    EduOrgan,
    ImageList
];
components.forEach(component => {
    Vue.component(component.name, component)
});
// Vue.component('PieChart', PieChart);
