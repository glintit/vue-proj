<template>
  <div class="demo-page">
    <div class="page-title">区域选择框</div>
    <organ :root="root" @selected="setOrgan" />
    <div class="desc">
      提供省、市、县三级选择。依赖服务：/edu/uc/comMemsOrgan/selectAll?parentCode=370000
    </div>
    <div class="page-title">教育机构选择框</div>
    <edu-organ @selected="setOrgan"/>
    <div class="desc">
      下拉选择教育机构（包括学校）。依赖服务：/edu/uc/organ/queryRootOrganNodes、/edu/uc/organ/querySubOrganNodes
    </div>

    <div class="page-title">级联选择教育机构</div>
    <edu-organ @selected="setEduOrgan" type="organ" />&nbsp;
    <edu-organ @selected="setSchool" type="school" :root="eduRoot"/>
    <div class="desc">
      同教育机构选择框，第一个选择教育机构，第二个根据第一个的选择项，查询当前选择项下属学校。<br/>
      属性：<br/>
      type: organ，查询机构（organLevel &lt; 12）；<br/>
      type: school，查询学校（organLevel = 12）
    </div>

    <div class="page-title">下拉选择框</div>
    <gl-select :list="database" @selected="setOrgan" title="MySQL"></gl-select>

  </div>
</template>

<script>
import {notify} from '@/plugins/message/notify';
export default {
  components: { },
  data() {
    return {
        root:{code:'370000',name:'山东省'},
        eduRoot:{},
        database:[
          {name:'MySQL',value:'mysql'},
          {name:'Oracle',value:'oracle'},
          {name:'pgsql',value:'pgsql'},
          {name:'SqlServer',value:'sqlserver'}
        ]
    };
  },
  methods: {
    test(){
      notify.alert('提示信息');
    },
    setOrgan(organ){
          console.log(organ);
    },
    setEduOrgan(organ){
      console.log(organ);
      this.eduRoot=organ;
    },
    setSchool(school){
        console.log(school,'school');
    }
  },
};
</script>

<style scoped>
 @import "../../../assets/css/demo.css";

</style>

