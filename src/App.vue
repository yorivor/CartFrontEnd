<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title>
        {{ appTitle }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn>
          <v-icon left dark>home</v-icon>
          Home
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    appTitle: 'Awesome Store',
  }),
};
</script>