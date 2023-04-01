<template>
    <div class="gl-tree">

        <div v-for="(item,i) in array" :key="i" :class="{'gl-tree-item':true,'open':item.open}">
          <div class="node">
            <i class="arr" v-if="!item.leaf" @click.stop="showSub(item)"></i>
            <span :class="{'checkbox':true,'on':item.checked}" @click.stop="checkthis(item)"><b></b></span>
            <span :class="['icon',item.icon]" v-if="item.icon"></span>
            <span class="name" @click.stop="showSub(item)">{{item.name}}</span>
          </div>
          <div class="sub-tree" :ref="'subtree'+item.id" :id="'subtree'+item.id">
            <gl-tree :list="list" :tree-id="item.id" ref="subtree"/>
          </div>
        </div>

    </div>
</template>

<script>

export default {
    name: 'GlTree',
    props: {
        defList: {
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
        list:[],//tree data
        array:[],
        lh:26 // default line-height
      };
    },
    created() {
        this.list=this.defList;
        this.array=this.getChildren(this.treeId);
        console.log(this.list,'gltree created.........');
    },
    mounted() {
    },
    methods: {
        init(newArray){
          this.list=newArray;
          this.array=this.getChildren(this.treeId);
          console.log(this.list,'gltree init.........');
          this.$forceUpdate();
        },
        showSub(item){
          if(item.open){
            this.hide(item);
            item.open=false;
          }else{
            if(!item.children || item.children.length===0){
              item.children=this.getChildren(item.id);
              this.$forceUpdate();
              console.log(item.children);
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

        checkthis(item){
          if(item.checked){
            item.checked=false;
          }else{
            item.checked=true;
          }
          this.$forceUpdate();
        },

        getCheckedKeys(){
          var ids=[];
          for(var i=0,size=this.list.length;i<size;i++){
            var item=this.list[i];
            if(item.checked){
              ids.push(item.id);
            }
          }
          return ids;
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

/* checkbox */
.node > .checkbox {
  padding: 6px 6px 0 1px;
}
.node > .checkbox > b {
  display: block;
  height: 14px;
  width: 14px;
  border: 1px solid #ccc;
}
.node > .checkbox:hover > b {
  border-color: #1890ff;
}
.node > .checkbox.on > b {
  position: relative;
  background-color: #1890ff;
  border-color: #1890ff;
}
.node > .checkbox.on > b::after {
  position: absolute;
  top: 1px;
  left: 4px;
	box-sizing: content-box;
  content: "";
  border: 1px solid #fff;
  border-left: 0;
  border-top: 0;
  height: 7px;
  transform: rotate(45deg) scaleY(1);
  width: 3px;
}
/** icon */
.gl-tree-item > .node > span.icon {
  width: 20px;
  background-repeat: no-repeat;
  background-position: center 6px;
}
.gl-tree-item > .node > span.icon.root {
  background-image: url(../../assets/img/tree/root_close.png);
}
.gl-tree-item.open > .node > span.icon.root {
  background-image: url(../../assets/img/tree/root_open.png);
}
.gl-tree-item > .node > span.icon.folder {
  background-image: url(../../assets/img/tree/folder_close.png);
}
.gl-tree-item.open > .node > span.icon.folder {
  background-image: url(../../assets/img/tree/folder_open.png);
}

.gl-tree-item > .node > span.icon.app {
  background-image: url(../../assets/img/tree/app_close.png);
}
.gl-tree-item.open > .node > span.icon.app {
  background-image: url(../../assets/img/tree/app_open.png);
}

.gl-tree-item > .node > span.icon.module {
  background-image: url(../../assets/img/tree/module_close.png);
}
.gl-tree-item.open > .node > span.icon.module {
  background-image: url(../../assets/img/tree/module_open.png);
}

.gl-tree-item > .node > span.icon.operation {
  background-image: url(../../assets/img/tree/operation.png);
}
</style>
