<template>
    <div class="process-bg">
        <div class="process-bar" :style="'width:'+data.count+';'+(data.bgcolor?'background-color:'+data.bgcolor+';':'')"></div>
        <div class="process-value">{{data.count}}</div>
    </div>
</template>

<script>

  export default {
    name: 'ProgressBar',
    props: {
        data: {
            type: Object,
            default: {}
        }
    },

    data() {
      return {
        
      };
    },

    methods: {

    },

    destroyed() {
      // remove DOM node after destroy
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  };
</script>
<style scoped>
.process-bg,
.process-bg > .process-bar {
  height: 12px;
  border-radius: 6px;
}
.process-bg {
    position: relative;
    top: 9px;
    background-color: rgba(0,0,0,0.2);
    box-shadow: 0 0 5px rgba(0,0,0,0.2) inset;
}
.process-bg > .process-bar {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #0078FC;
}
.process-bg > .process-value {
  position: absolute;
  top: 0;
  right: 5px;
  line-height: 12px;
  color: #fff;
  font-size: 12px;
}
</style>
