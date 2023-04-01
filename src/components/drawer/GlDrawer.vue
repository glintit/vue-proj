<template>
    <div :class="['mask',{'on':opend}]" v-show="opening" @click.self="handleClick">
      <div :class="['drawer',cls,{'on':opend}]" :style="style">
        <slot></slot>
      </div>
    </div>
</template>

<script>

  export default {
    name: 'GlDrawer',

    props: {
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        direction:String,
        width: String,
        height: String
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
        if (this.height) {
            style.height = this.height;
        }
        return style;
      },
      cls(){
          if(this.direction==='bottom'){
              return 'btm';
          }
          return 'def';
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
            },100);
        },
        open(){
            var tt=this;
            tt.opening=true;
            window.setTimeout(function(){
                tt.opend=true;
            },10);
        }
    },

    destroyed() {
      // remove DOM node after destroy
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  };
</script>
