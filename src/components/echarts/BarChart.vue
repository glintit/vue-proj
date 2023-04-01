<template>
  <div class="chartct" ref="chartct"></div>
</template>

<script>
export default {
  name: "BarChart",
  props: {
      chartData:{
          type: Object,
          default:{}
      }
  },
  watch: {
	    chartData: {
			handler(newVal, oldVal) {
				this.chartData=newVal
			},
			deep: true
		}
  },
  data() {
    return {
      
    }
  },
  created() {
    
  },
  mounted(){
    this.init();
  },
  // 方法
  methods: {
      init(){
        this.render();
      },
      render(){
        var colorList = [ "#7A91D1","#6184C4","#6DA3DB","#82C0DC", "#85D2C0","#82CBB1","#82CBB1","#7A91D1","#6184C4","#6DA3DB","#82C0DC", "#85D2C0","#82CBB1","#82CBB1","#7A91D1","#6184C4","#6DA3DB"];
        // var xdata=['济南市','青岛市','淄博市','枣庄市','东营市','烟台市','潍坊市','济宁市','泰安市','威海市','日照市','临沂市','德州市','滨州市','聊城市','菏泽市'];
        // var ydata=[567,500,498,491,501,517,304,378,391,312,367,410,491,451,391,290]
        var charts = this.$echarts.init(this.$refs.chartct);
        charts.setOption({
            tooltip: {
                trigger: "axis",
                axisPointer: {
                type: "shadow",
                },
                backgroundColor: "rgba(0,0,0,0.5)",
                borderWidth: "0",
                textStyle: {
                    color: "#fff",
                    fontStyle: "normal",
                }
            },
            xAxis: {
                data: this.chartData.xdata,
                axisLine: {
                    lineStyle: {
                    color: "#A9A9A9",
                    },
                },
                axisLabel: {
                    interval: "auto",
                    rotate: 0,
                    textStyle: {
                    color: "#111",
                    },
                },
                axisTick: {
                    show: false,
                },
            },
            yAxis: {
                axisLine: {
                    lineStyle: {
                    color: "#111",
                    },
                },
                axisTick: {
                    show: false,
                }
            },
            grid: {
            top: "15%",
            left: "10px",
            bottom: "10px",
            right: "10px",
            containLabel: true,
            },
            series: [
            {
                name: "",
                type: "bar",
                barMaxWidth: 20,
                data: this.chartData.ydata,
                itemStyle: {
                    normal: {
                            label: {
                            show: true, //是否显示
                            position: "top",
                            },
                            // //barBorderRadius: [10, 10, 10, 10],
                            color: function (params) {
                                return colorList[params.dataIndex];
                            },
                    },
                }
            }
            ]
        });
        window.addEventListener("resize", function () {
            charts.resize();
        });

      }

  }
};
</script>

<style scoped>

</style>
