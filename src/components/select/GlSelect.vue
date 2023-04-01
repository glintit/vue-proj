<template>
    <div class="gl-select" ref="glselect">
        <span @click="showOptions()">{{cv.name}}</span><i :class="{'slide':show}" @click="showOptions()"></i>
        <div class="options" v-show="show">
            <div class="option" v-for="(item,i) in list" :key="i" @click="setCV(item)">
                {{item.name}}
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'GlSelect',
    props: {
        title: {
            type: String,
            default:'请选择...'
        },
        list: {
            type: Array,
            default: []
        },
        width: String
    },

    data() {
      return {
        show:false,
        cv:{}
      };
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
    created() {
        if(this.title){
            this.cv.name=this.title;
        }
        this.bodyListener = (e) => {
        if (this.show) {
            var tt = this.$refs.glselect;
            if (e.target !== tt && !tt.contains(e.target)) {
            this.show = false;
            }
        }
        };
        document.body.addEventListener("click", this.bodyListener, false);
  },
    mounted() {
    },
    methods: {
        showOptions(){
            this.show=true;
        },
        setCV(item){
            this.cv=item;
            this.$emit("selected", this.cv);
            this.show=false;
        }
    },
    destroyed() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
};
</script>
<style scoped>
.gl-select {
    position: relative;
    display: inline-block;
    line-height: 30px;
    min-width: 120px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
}
.gl-select > span {
    display: block;
    height: 30px;
    padding-right: 20px;
    padding-left: 10px;
    cursor: pointer;
}
.gl-select > i {
    position: absolute;
    right: 0;
    top: 0;
    display: block;
    height: 30px;
    width: 16px;
    cursor: pointer;
}
.gl-select > i::after {
    position: absolute;
    top: 8px;
    left: 4px;
    box-sizing: content-box;
    content: "";
    border: 1px solid #bbb;
    border-left: 0;
    border-top: 0;
    height: 6px;
    width: 6px;
    transform: rotate(45deg) scaleY(1);
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
}
.gl-select > i.slide::after {
    top: 11px;
    transform: rotate(225deg) scaleY(1);
}
.gl-select > .options {
    position: absolute;
    left: 0;
    top: 30px;
    width: 100%;
    margin: 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    overflow: hidden;
}
.gl-select > .options > .option {
    padding: 0 15px;
    background-color: #fff;
    cursor: pointer;
}
.gl-select > .options > .option:hover {
    background-color: #f2f2f2;
}
</style>