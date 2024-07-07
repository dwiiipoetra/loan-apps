<script setup>
// menggunakan layout default
definePageMeta({
    layout: 'default'
})
// import useLoans composables
import useLoans from '@/composables/useLoans'
// desctructure getAllLoans
const { getAllLoans } = useLoans()
// destructure getAllLoans composables
let { headers, items, error } = getAllLoans()

// menyimpan nilai input pencarian
const search = ref('')
// membuat items yang difilter berdasarkan input pencarian menjadi computed property
const filteredItems = computed(() => {
  // jika tidak ada hasil pencarian, tampilkan semua items
  if(!search.value) return items.value
  // jika ada hasil pencarian, items akan difilter berdasarkan salah satu nilai dalam objek item cocok dengan nilai pencarian non case-sensitive
  return items.value.filter(item => {
    return Object.values(item).some(val =>
      String(val).toLowerCase().includes(search.value.toLowerCase())
    )
  })
})
</script>

<template>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="filteredItems"
        :items-per-page="5"
        density="compact"
        item-key="name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Loans List</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-responsive
              class="mx-auto"
              max-width="344"
            >
              <v-text-field
                v-model="search"
                label="Search"
                density="compact"
                variant="solo"
                hide-details="auto"
                single-line
                clearable
                class="mr-6"
              ></v-text-field>
            </v-responsive>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <nuxt-link :to="`/loans/${item.id}`">
            <v-icon small>mdi-eye</v-icon>
          </nuxt-link>
        </template>
      </v-data-table>
      
      <!-- tampilkan alert error ketika ada error -->
      <v-alert v-if="error" type="error" dismissible>
        {{ error }}
      </v-alert>
    </v-container>
</template>