<template>
    <div class="gl-form">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: "GlForm",
  props: {
      labelWidth:{
          type: String,
          default:'110px'
      }
  },
  data() {
    return {
      
    }
  },
  created() {
    
  },
  methods: {
    init(){
          
    }
  }
};
</script>

<style scoped>
.gl-form {
    clear: both;
}
</style>
