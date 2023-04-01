<template>
  <div class="demo-page">
    <div class="page-title">图片预览</div>
    <image-list :img-list="list"/>

  </div>
</template>

<script>
import {notify} from '@/plugins/message/notify';
export default {
  data() {
    return {
        list:[
            {url:'http://'+window.location.host+'/vproj/img/demo/1.jpg'},
            {url:'http://'+window.location.host+'/vproj/img/demo/2.jpg'},
            {url:'http://'+window.location.host+'/vproj/img/demo/3.jpg'},
            {url:'http://'+window.location.host+'/vproj/img/demo/jeep.jpg'}
        ]
    };
  },
  methods: {
    test(){
      notify.alert('提示信息');
    }
  },
};
</script>

<style scoped>
 @import "../../../assets/css/demo.css";

</style>

