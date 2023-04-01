<template>
  <div class="demo-page">
    <div class="page-title">数据进度条</div>
    <gl-progress :data="list" />
    <div class="gap">&nbsp;</div>
    <div class="page-title">单个数据条</div>
    <progress-bar :data="bardata"/>
   
  </div>
</template>

<script>
export default {
  data() {
    return {
        list:[
          {name:'法学院',count:'80%'},
          {name:'商学院',count:'50%',bgcolor:'#5BD9FD'},
          {name:'计算机学院',count:'36%'},
          {name:'艺术学院',count:'61%',bgcolor:'#5BD9FD'},
          {name:'工程学院',count:'77%'},
          {name:'外语学院',count:'77%',bgcolor:'#5BD9FD'}
        ],
        bardata:{
            count:'77%'
        }
    };
  },
  methods: {
    
  },
};
</script>

<style scoped>
 @import "../../../assets/css/demo.css";
 .gap {
    height: 30px;
 }
</style>

