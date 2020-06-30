<template>
  <v-container>
    <v-row justify="center">
      <div id="translator">
        <h3>Please write the text you wish to translate</h3>
        <v-textarea v-bind:loading="loading" solo no-resize
          height="300" style="width:500px"
          name="text" label="Text to translate"
          v-model="textToTranslate"
        />
        <v-btn dark color="purple" v-bind:loading="loading"
          class="btn" @click="handleSubmit">
          Translate
        </v-btn>
        <div id="translated-text" v-if="translatedText">
          <h3>Here's your translated text: </h3>
          {{ translatedText }}
        </div>
        <div id="error" v-if="error">
          <h3 style="color:red"> An error has occured</h3>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
  import myApi from '../api/api.js';
  export default {
    name: 'translator-form',
    data() {
      return {
        textToTranslate: '',
        translatedText: '',
        loading: false,
        error: false
      }
    },
    methods: {
      handleSubmit() {
        if (this.textToTranslate) {
          this.loading = true;
          this.error = false;
          myApi.get(`translate?text=${encodeURI(this.textToTranslate)}&source=fr&target=en`)
            .then(response => {
              this.translatedText = response.data.translatedText;
            })
            .catch(() => {
              this.translatedText = '';
              this.error = true;
            })
            .finally(() => this.loading = false);
        }
      }
    }
  }
</script>

<style scoped>
  #translator {
    display: flex;
    flex-direction: column;
  }
  .btn {
    width: 200px;
    margin: 0 auto 30px auto;
  }
</style>
