<script setup>
definePageMeta({
    layout: 'default'
})
import useLoans from '@/composables/useLoans'
const { getAllLoans, currencyFormatUSD } = useLoans()
let { headers, items, error } = getAllLoans()
</script>

<template>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Loans List</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <nuxt-link :to="`/loans/${item.id}`">
            <v-icon small>mdi-eye</v-icon>
          </nuxt-link>
        </template>
      </v-data-table>
      
      <v-alert v-if="error" type="error" dismissible>
        {{ error }}
      </v-alert>
    </v-container>
</template>