<template>
    <div class="form-item">
        <div class="label">{{label}}</div>
        <div class="item"><slot></slot></div>
    </div>
</template>

<script>
export default {
  name: "FormItem",
  props: {
      label:{
        type: String,
        default:''
      },
      labelWidth:{
          type: String,
          default:'100px'
      }
  },
  data() {
    return {
      
    }
  },
  created() {
    console.log(this.$parent.labelWidth,'fiiiiiiiii');
  },
  methods: {
    init(){
          
    }
  }
};
</script>

<style scoped>
.form-item {
    height: 32px;
    line-height: 30px;
    margin-bottom: 15px;
}
.form-item > .label {
    float: left;
    width: 100px;
    padding: 0 10px;
    text-align: right;
}
.form-item > .item {
    margin-left: 100px;
}
.form-item > .label.required::before {
    content:'*';
    color: #f00;
}
.form-item .text {
    height: 30px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 0 10px;
}
</style>
