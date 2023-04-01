<template>
  <div class="padding">
    dfdsfdsfdsfdsfds
  </div>
</template>

<script>
import {notify} from '@/plugins/message/notify';
export default {
  components: { },
  data() {
    return {
      
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
.padding {
  padding: 15px;
}

</style>

