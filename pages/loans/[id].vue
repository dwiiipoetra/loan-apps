<script setup>
definePageMeta({
    layout: 'default'
})
import useLoans from '@/composables/useLoans'
const { getLoanByID } = useLoans()
const route = useRoute()
const id = route.params.id
let { loan, error } = getLoanByID(id)
</script>

<template>
    <v-container>
        <v-card v-if="!error" class="pa-4">
            <v-card-title>{{ loan?.borrower.name }}</v-card-title>
            <v-card-subtitle>{{ loan?.borrower.name }}</v-card-subtitle>
            <v-card-text>
                <!-- {{ item.description }} -->
            </v-card-text>
            <v-card-actions>
                <!-- Tombol atau aksi lainnya di sini -->
            </v-card-actions>
        </v-card>

        <v-alert v-else type="error" dismissible>
        {{ error }}
      </v-alert>
  </v-container>
</template>