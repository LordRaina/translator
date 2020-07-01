<template>
  <v-container>
    <v-row justify="center">
      <div id="translator">
        <h3>Please write or upload the text you wish to translate</h3>
        <file-reader @load="textToTranslate = $event"/>
        <div id="language-selection">
          from
          <v-autocomplete class="lang-select" placeholder="source language"
            v-model="source" :items="languagesList"/>
          to <v-autocomplete class="lang-select" placeholder="target language"
            v-model="target" :items="languagesList"/>
        </div>
        <v-textarea solo no-resize :loading="loading"
          height="300"
          name="text" label="Text to translate"
          v-model="textToTranslate"
        />
        <v-btn :dark="validatedInputs" color="purple" :loading="loading"
          class="btn" :disabled="!validatedInputs" @click="handleSubmit">
          Translate
        </v-btn>
        <div id="translated-text" v-if="translatedText">
          <h3>Here's your translated text: </h3>
          {{ translatedText }}
        </div>
        <div id="error" v-if="error">
          <h3 style="color:red"> An error has occured (timeout or language not supported)</h3>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
  import myApi from '../api/api.js';
  import langCsv from '../assets/language_codes_csv.csv';
  import FileReader from './FileReader';

  export default {
    name: 'translator-form',
    components: {
      FileReader
    },
    data() {
      return {
        textToTranslate: '',
        translatedText: '',
        loading: false,
        error: false,
        languagesList: [],
        source: '',
        target: ''
      }
    },
    mounted() {
      this.languagesList = langCsv.map(arr => { return {value: arr[0], text: arr[1]}});
      this.languagesList.sort((a,b) => (a.text > b.text) ? 1 : -1);
    },
    methods: {
      handleSubmit() {
        this.loading = true;
        this.error = false;
        myApi.get(`translate?text=${encodeURI(this.textToTranslate)}&source=${this.source}&target=${this.target}`)
          .then(response => {
            this.translatedText = response.data.translatedText;
          })
          .catch(() => {
            this.translatedText = '';
            this.error = true;
          })
          .finally(() => this.loading = false);
      }
    },
    computed: {
      validatedInputs() {
        return !!this.textToTranslate && !!this.source && !!this.target;
      }
    }
  }
</script>

<style scoped>
  #translator {
    display: flex;
    flex-direction: column;
    width: 500px;
  }
  .btn {
    width: 200px;
    margin: 0 auto 30px auto;
  }
  #language-selection {
    display: flex;
    align-items: center;
  }
  .lang-select {
    margin-left: 10px;
    margin-right: 10px;
    height: 60px;
  }
</style>
