<template>
  <div class="padding">
    <!-- <gl-tree :list="list" ref="gtree"/>

     <button @click="test()">确定</button>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      list:[
          {id:'101',pid:'0',name:'根菜单',icon:'root'},
          {id:'1001',pid:'101',name:'菜单1',icon:'app'},
          {id:'100101',pid:'1001',name:'菜单11',icon:'module',url:'',leaf:true},
          {id:'100102',pid:'1001',name:'菜单12',icon:'module',url:'',leaf:true},
          {id:'100103',pid:'1001',name:'菜单13',icon:'module',url:''},
          {id:'10010301',pid:'100103',name:'菜单131',icon:'operation',url:'',leaf:true},
          {id:'10010302',pid:'100103',name:'菜单132',icon:'operation',url:'',leaf:true},
          {id:'10010303',pid:'100103',name:'菜单133',icon:'operation',url:'',leaf:true},
          {id:'1002',pid:'101',name:'菜单2',icon:'module'},
          {id:'100201',pid:'1002',name:'菜单21',icon:'operation',url:'',leaf:true},
          {id:'100202',pid:'1002',name:'菜单22',icon:'operation',url:'',leaf:true},
          {id:'100203',pid:'1002',name:'菜单23',icon:'operation',url:'',leaf:true},
          {id:'1003',pid:'101',name:'菜单3',icon:'app'},
          {id:'1004',pid:'101',name:'菜单4',icon:'app'},
          {id:'1005',pid:'101',name:'菜单5',icon:'app'}
      ],
    };
  },
  methods: {
    test(){
        var ids=this.$refs.gtree.getCheckedKeys().join(',');
        console.log(ids);
    }
  },
};
</script>

<style scoped>
.padding {
    padding: 15px;
}
</style>