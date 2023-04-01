<template>
    <div class="chartct" ref="chartct"></div>
</template>

<script>
import axios from 'axios';
export default {
  name: "MapChart",
  data() {
    return {
      
    }
  },
  created() {
    
  },
  mounted(){
      this.drawMap();
  },
  // 方法
  methods: {
    init(){
          
    },
    drawMap() {
        var charts=this.$echarts.init(this.$refs.chartct);
        var name='山东';
        axios.get('../mapdata/370000000000.json').then((res)=>{
            if(!res.data){
              return;
            }
            let min = 0;
            let max = 100;
            this.$echarts.registerMap(name, res.data);
            charts.setOption({
            tooltip: {
              trigger: "item",
              formatter: function (params) {
                var name = params.name;
                return name;
              },
            },
            dataRange: {
              show: false,
              min: min,
              max: max,
              x: "right",
              y: "bottom",
              text: ["高", "低"], // 文本，默认为数值文本
              calculable: true,
              textStyle: {
                color: "#111",
              },
              color: ["#2670C5", "#008FEB", "#00B8EE", "#7ECDF4"],
            },
            // geo: {
            //   map: name,
            //   // aspectScale: 0.75, //长宽比
            //   zoom: 1.1,
            //   roam: false,
            //   itemStyle: {
            //     normal: {
            //       areaColor: "#013C62",
            //       shadowColor: "#182f68",
            //       shadowOffsetX: 0,
            //       shadowOffsetY: 5,
            //     },
            //     emphasis: {
            //       areaColor: "#2AB8FF",
            //       borderWidth: 0,
            //       color: "green",
            //       label: {
            //         show: false,
            //       },
            //     },
            //   },
            // },
            series: [
              {
                map: name,
                type: "map",
                name: name,
                zoom: 1.1,
                roam: false,
                selectedMode: "single",
                showLegendSymbol: false,
                viewControl: {
                  autoRotate: false,
                  alpha: 50
                },
                label: {
                  normal: {
                    show: true,
                    color: "transparent",
                    distance: 0,
                    textStyle: {
                      color: "#fff",
                      fontSize: 12,
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    borderColor: "#fff",
                    borderWidth: 1,
                    areaColor: "#2670C5",
                  }
                },
                emphasis: {
                  label: {
                    normal: {
                      show: true,
                      textStyle: {
                        color: "#333",
                        fontSize: 14,
                      }
                    }
                  },
                  itemStyle: {
                    color: "#FFF100",
                    normal: {
                      borderColor: "#fff",
                      borderWidth: 1,
                    }
                  }
                },
                animation: false,
                data: []
              },
            ],
          });
        });

        window.addEventListener("resize", function () {
            charts.resize();
        });

    }
  }
};
</script>

<style scoped>
.chartct {
    height: 500px;
}
</style>
