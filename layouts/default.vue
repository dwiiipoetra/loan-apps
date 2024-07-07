<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer>
      <v-list>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/loans">
          <v-list-item-icon>
            <v-icon>mdi-cash-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Loans List</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :elevation="2">
      <!-- <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template> -->

      <v-app-bar-title>Application Bar</v-app-bar-title>
      
      <!-- <v-breadcrumbs :items="items">
        <template v-slot:prepend>
          <v-icon icon="$vuetify" size="small"></v-icon>
        </template>
      </v-breadcrumbs> -->
    </v-app-bar>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <slot/>
    </v-main>
  </v-layout>
</template>