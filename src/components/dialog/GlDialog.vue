<template>
    <div :class="['mask',{'on':opend}]" v-show="opening" @click.self="handleClick">
      <div :class="['dialog',{'on':opend}]" :style="style">
        <div class="title" v-if="title">{{title}}<span class="close" @click.self="handleClick">&times;</span></div>
        <slot></slot>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'GlDialog',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        width: String
    },

    data() {
      return {
        opening: false,
        opend: false
      };
    },

    watch: {
        visible(val) {
            if(val){
                this.open();
            }else{
                this.close();
            }
        }
    },

    computed: {
      style() {
        let style = {};
        if (this.width) {
            style.width = this.width;
        }
        return style;
      }
    },

    methods: {

        handleClick() {
            this.$emit('update:visible', false);
            this.close();
        },
        close() {
            var tt=this;
            tt.opend=false;
            window.setTimeout(function(){
                tt.opening=false;
            },300);
        },
        open(){
            var tt=this;
            tt.opening=true;
            window.setTimeout(function(){
                tt.opend=true;
            },10);
        }
    },

    mounted() {
      
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
.dialog > .title > span.close {
  top: 12px;
  height: 30px;
  width: 30px;
  line-height: 25px;
  border-radius: 50%;
  border: 1px solid #cdcdcd;
}
</style>