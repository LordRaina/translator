<template>
  <v-app>
    <v-app-bar
      app
      color="purple"
      dark
    >
      <v-spacer></v-spacer>
      <h2>Translator</h2>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <translate-form @translate="translate"/>
    </v-main>
  </v-app>
</template>

<script>
import TranslateForm from './components/TranslateForm';

export default {
  name: 'App',

  components: {
    TranslateForm,
  },
  data: () => ({
    //
  }),
  methods: {
    translate(text) {
      console.log(text)
    }
  }
};
</script>
