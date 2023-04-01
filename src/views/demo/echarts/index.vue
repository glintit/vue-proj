<template>
  <div class="demo-page">
    <div class="page-title">地图</div>
    <map-chart style="height: 400px;"/>
    <div class="code">
        <div class="title">HTML</div>
        <pre><code class="hljs" v-html="highlightedCode(codes[4], 'html')"></code></pre>
    </div>

    <div class="page-title">饼图</div>
    <pie-chart :chartData="pieData" style="height: 300px;"/>
    <div class="code">
        <div class="title">HTML</div>
        <pre><code class="hljs" v-html="highlightedCode(codes[0], 'html')"></code></pre>
        <div class="title">JavaScript</div>
        <pre><code class="hljs" v-html="highlightedCode(codes[1], 'javascript')"></code></pre>
    </div>

    <!-- -->
    <div class="page-title">柱图</div>
    <bar-chart :chartData="barData" style="height: 300px;"/>
    <div class="code">
        <div class="title">HTML</div>
        <pre><code class="hljs" v-html="highlightedCode(codes[2], 'html')"></code></pre>
        <div class="title">JavaScript</div>
        <pre><code class="hljs" v-html="highlightedCode(codes[3], 'javascript')"></code></pre>
    </div>
  </div>
</template>

<script>
import hljs from "highlight.js/lib/highlight";
import "highlight.js/styles/github-gist.css";
hljs.registerLanguage("html", require("highlight.js/lib/languages/xml"));
hljs.registerLanguage("vue", require("highlight.js/lib/languages/xml"));
hljs.registerLanguage("javascript", require("highlight.js/lib/languages/javascript"));
export default {
  data() {
    return {
      pieData:[
        { value: 108, name: '校本教研数' },
        { value: 235, name: '县域教研数' },
        { value: 380, name: '市级教研数' },
        { value: 356, name: '省级教研数' }
      ],
      barData:{
        xdata:['济南市','青岛市','淄博市','枣庄市','东营市','烟台市','潍坊市','济宁市','泰安市','威海市','日照市','临沂市','德州市','滨州市','聊城市','菏泽市'],
        ydata:[588,500,498,491,501,517,304,378,391,312,367,410,491,451,391,290]
      },
      codes:[
        '<pie-chart :chartData="pieData" style="height: 300px;"/>',
        "pieData:[\n    { value: 105, name: '校本教研数' },\n    { value: 235, name: '县域教研数' },\n    { value: 380, name: '市级教研数' },\n    { value: 356, name: '省级教研数' }\n]",
        '<bar-chart :chartData="barData" style="height: 300px;"/>',
        "barData:{\n    xdata:['济南市','青岛市','淄博市','枣庄市','东营市','烟台市','潍坊市','济宁市','泰安市','威海市','日照市','临沂市','德州市','滨州市','聊城市','菏泽市'],\n    ydata:[567,500,498,491,501,517,304,378,391,312,367,410,491,451,391,290]\n}",
        '<map-chart style="height: 400px;"/>'
      ]
    };
  },
  created(){
    this.init();
  },
  methods: {
    init(){
      
    },
    highlightedCode(code,language){
        const result = hljs.highlight(language, code || "", true);
        return result.value || '&nbsp;';
    }
  },
};
</script>

<style scoped>
 @import "../../../assets/css/demo.css";

</style>

