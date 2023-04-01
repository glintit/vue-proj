<template>
  <div ref="chartct"></div>
</template>

<script>
export default {
  name: "PieChart",
  props: {
      chartData:{
          type: Array,
          default:[]
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
        var charts = this.$echarts.init(this.$refs.chartct);
        charts.setOption({
            title: {
                text: '',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                show: false,
                orient: 'vertical',
                left: 'left'
            },
            color: ['#009CE5', '#F7B547','#FF7F50','#87CEFA'],
            series: [
                {
                    // name: '',
                    type: 'pie',
                    radius: '50%',
                    data: this.chartData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
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
.chartct {
    height: 250px;
}
</style>
