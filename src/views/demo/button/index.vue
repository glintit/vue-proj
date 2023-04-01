<template>
  <div class="demo-page">
    <div class="page-title">按钮</div>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <div class="code">
        <div class="title">HTML</div>
        <pre><code class="hljs" v-html="highlightedCode(codes[0], 'html')"></code></pre>
    </div>
    <div>其他参考element-ui：https://element.eleme.cn/#/zh-CN/component/button</div>

   
  </div>
</template>

<script>
import {notify} from '@/plugins/message/notify';
import hljs from "highlight.js/lib/highlight";
import "highlight.js/styles/github-gist.css";
hljs.registerLanguage("html", require("highlight.js/lib/languages/xml"));
hljs.registerLanguage("vue", require("highlight.js/lib/languages/xml"));
hljs.registerLanguage("javascript", require("highlight.js/lib/languages/javascript"));
export default {
  data() {
    return {
        codes:[
        '<el-button>默认按钮</el-button>\n\r<el-button type="primary">主要按钮</el-button>'
      ]
    };
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
 .gap {
    height: 30px;
 }
</style>

