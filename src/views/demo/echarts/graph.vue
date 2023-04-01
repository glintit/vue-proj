<template>
  <div class="demo-page">
    <div class="chartct" ref="chartct"></div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      preNodeId:-10
    };
  },
  created(){
    this.init();
  },
  mounted(){
    this.render();
  },
  methods: {
    init(){
      
    },
    render(){
        var charts=this.$echarts.init(this.$refs.chartct);
        axios.get('../mapdata/les-miserables.json').then((res)=>{
            var graph=res.data;

            var option = {
                tooltip: {},
                legend: [
                  {
                    data: graph.categories.map(function (a) {
                      return a.name;
                    })
                  }
                ],
                series: [
                  {
                    name: '关系图谱',
                    type: 'graph',
                    layout: 'force',
                    data: graph.nodes,
                    links: graph.links,
                    categories: graph.categories,
                    roam: true,
                    edgeSymbol: ['none', 'arrow'],
                    label: {
                      show: true,
                      position: 'right',
                      formatter: '{b}',
                      // color: 'rgba(0,0,0,0.8)',
                      fontWeight:'bold'
                    },
                    labelLayout: {
                      hideOverlap: true
                    },
                    selectedMode:'single',
                    select:{
                      // disabled:false,
                      itemStyle:{
                        color:'#f00',
                        // borderColor:'#ff0000',
                        borderWidth:0,
                        // borderType:'solid',
                        shadowColor: '#fff',
                        shadowBlur: 30
                      },
                      lineStyle:{
                        color:'#f00',
                        width:'2',
                        type:'solid'
                      }
                    },
                    scaleLimit: {
                      min: 0.4,
                      max: 10
                    },
                    draggable: true,
                    lineStyle: {
                      // color: 'rgba(0,0,0,0.6)',
                      curveness: 0  //边的曲度，支持从 0 到 1 的值，值越大曲度越大
                    },
                    force:{
                      initLayout:'circular',
                      repulsion:70,
                      gravity:0.8,
                      edgeLength: [10, 50],
                      friction:0.1
                    },
                    emphasis: {
                      focus: 'adjacency',
                      lineStyle: {
                        width: 10
                      }
                    },
                    symbol:'image://http://localhost:9527/vproj/img/ball.png'  // circle,rect,roundRect,triangle,diamond,pin,arrow, image://http://localhost:9527/vproj/img/ball.png

                  }
                ]
              };
              charts.setOption(option);

              charts.on('click',(param)=>{
                // console.log(param);
                if(param.dataType==='node'){ //节点
                    console.log(param.data);

                    /** 点击节点变大
                    var id=param.data.id;
                    if(id===this.preNodeId){
                        return;
                    }
                    var tag=0;
                    for(var i=0,size=graph.nodes.length;i<size;i++){
                      var item=graph.nodes[i];
                      if(item.id===id){
                        item.symbolSize+=5;
                        tag++
                      }else if(item.id===this.preNodeId){
                        item.symbolSize-=5;
                        tag++
                      }
                      if(tag===2){
                        break;
                      }
                    }
                    charts.setOption({
                      series: [
                        {
                          data: graph.nodes
                        }
                      ]
                    });
                    this.preNodeId=id;
                    **/
                    
                }else{
                  console.log('line');
                }
              });

        });

        window.addEventListener("resize", function () {
            charts.resize();
        });

    },
    getById(id,list){
      list.forEach(item => {
        if(item.id===id){
          return item;
        }
      });
      return null;
    }

  },
};
</script>

<style scoped>
 @import "../../../assets/css/demo.css";

.chartct {
  height: 700px;
  background-color: #000;
}
</style>

