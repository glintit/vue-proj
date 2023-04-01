<template>
    <div>

        <div v-for="(item,i) in array" :key="i" :class="{'gl-tree-item':true,'open':item.open}">
          <div class="node" @click.stop="showSub(item)">
            <i class="arr"></i>
            <span class="name">{{item.name}}</span>
          </div>
          <div class="sub-tree" :ref="'subtree'+item.id">
            <gl-tree-item :list="list" :tree-id="item.id"/>
          </div>
        </div>

    </div>
</template>

<script>

export default {
    name: 'GlTreeItem',
    props: {
        list: {
            type: Array,
            default: (res)=>{return [];}
        },
        treeId:{
            type:String,
            default:'0'
        },
        //是否展开
        opend:{
            type: Boolean,
            default: false
        }
    },

    data() {
      return {
        array:[],
        lh:26 // default line-height
      };
    },
    created() {
        this.array=this.getChildren(this.treeId);
    },
    mounted() {
    },
    methods: {
        showSub(item){
          if(item.open){
            this.hide(item);
            item.open=false;
          }else{
            if(!item.children || item.children.length===0){
              item.children=this.getChildren(item.id);
              this.$forceUpdate();
            }
            this.show(item);
            item.open=true;
          }
          this.$forceUpdate();
        },
        show(item){
          var div=this.$refs['subtree'+item.id][0];
         
          div.style.height='0px';
          div.style.display='block';

          //then open
          setTimeout(()=>{
              if(!item.height){
                  item.height=item.children.length*this.lh;
              }
              div.style.height=item.height+'px';
              setTimeout(()=>{
                  div.style.removeProperty('height');
              },300);
          },3);

        },
        hide(item){
          var div=this.$refs['subtree'+item.id][0];
          var size=div.getBoundingClientRect();
            //first give a height;
          div.style.height=size.height+'px';
          item.height=size.height;

            //then hide
          setTimeout(()=>{
               div.style.height='0px';
               setTimeout(()=>{
                 div.style.removeProperty('height');
                   div.style.display='none';
              },300);
          },3);
        },
        getChildren(id){
          if(!id){
            id=this.treeId;
          }
          var buf=[];
          for(var i=0,size=this.list.length;i<size;i++){
            var item=this.list[i];
            if(item.pid===id){
              // item.children=[];
              buf.push(item);
            }
          }
          return buf;
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
.gl-tree-item > .node {
  height: 26px;
  line-height: 26px;
  cursor: pointer;
}
.gl-tree-item > .node > i.arr,
.gl-tree-item > .node > span {
  float: left;
  display: block;
  height: 26px;
}
.gl-tree-item > .node > i.arr {
  position: relative;
  width: 10px;
  cursor: pointer;
}
.gl-tree-item > .node > i.arr::after {
  position: absolute;
  top: 8px;
  left: 0;
  content:'';
  display: block;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  height:0;width:0;
  border-left: 6px solid #bbb;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
}
.gl-tree-item > .sub-tree {
  padding-left: 15px;
  display: none;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.gl-tree-item.open > .node > i.arr::after {
  top: 9px;
  transform: rotate(90deg);
}
</style>