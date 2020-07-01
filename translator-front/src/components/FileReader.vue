<template>
  <label class="file-reader">
    <input type="file" accept=".txt" @change="loadText">
  </label>
</template>

<script>
  export default {
    methods: {
      loadText(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = ev => this.$emit("load", ev.target.result);
        reader.readAsText(file);
      }
    }
  };
</script>
