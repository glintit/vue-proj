<template>
    <div>
      <div class="process-ct" v-for="(item,i) in data" :key="i">
          <div class="process-title">{{item.name}}</div>
          <progress-bar :data="item" />
      </div>
    </div>
</template>

<script>

  export default {
    name: 'GlProgress',
    props: {
        data: {
            type: Array,
            default: []
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
.process-ct {
    height: 28px;
}
.process-ct .process-title {
    float: left;
    width: 60px;
    line-height: 28px;
    color: #333;
    font-size: 12px;
    overflow: hidden;
    text-align: right;
}
.process-bg,
.process-bg > .process-bar {
  height: 12px;
  border-radius: 6px;
}
.process-bg {
    position: relative;
    margin-left: 70px;
    top: 9px;
    background-color: rgba(0,0,0,0.2);
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
}
</style>
