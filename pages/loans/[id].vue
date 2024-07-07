<script setup>
// menggunakan layout default
definePageMeta({
    layout: 'default'
})
// import useLoans composables
import useLoans from '@/composables/useLoans'
// desctructure getLoanByID, currencyFormatUSD
const { getLoanByID, currencyFormatUSD } = useLoans()
// menggunakan useRoute dan mengambil id dari route (digunakan untuk mengirim param ke getLoanID composables)
const route = useRoute()
const id = route.params.id
// destructure getLoanID composables
let { loan, error } = getLoanByID(id)
</script>

<style scoped>
</style>

<template>
    <v-container>
        <!-- tampilkan loan data ketika tidak ada error -->
        <v-row v-if="!error">
            <v-col cols="12" lg="3">
                <v-card variant="flat" color="indigo" class="pa-4" style="text-align:center; height: 100%;">
                    <v-card-title class="text-h6 text-md-h5 text-lg-h5 font-weight-bold">{{ loan?.borrower.name }}</v-card-title>
                    <v-card-subtitle>
                        ID: {{ loan?.id }}
                    </v-card-subtitle>
                    <v-avatar image="/avatar/john-smirk.png" class="mt-3" size="50"></v-avatar>
                    <v-card-text class="text-caption">
                        {{ loan?.borrower.email }}
                    </v-card-text>
                    <v-card-actions class="text-uppercase text-body-2">
                        <v-fab extended variant="tonal" :text="loan?.purpose"></v-fab>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" lg="3">
                <v-row>
                <v-col cols="12">
                    <v-card variant="tonal" color="indigo" class="pa-4">
                        <v-card-text class="text-caption font-weight-bold">
                            Borrowed
                        </v-card-text>
                        <v-card-title class="text-h6 text-md-h5 text-lg-h5 font-weight-bold">{{ currencyFormatUSD(loan?.amount) }}</v-card-title>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card variant="tonal" color="indigo" class="pa-4">
                        <v-card-text class="text-caption font-weight-bold">
                            Interest Rate
                        </v-card-text>
                        <v-card-title class="text-h6 text-md-h5 text-lg-h5 font-weight-bold">{{ loan?.interestRate }} %</v-card-title>
                    </v-card>
                </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" lg="3">
                <v-row>
                <v-col cols="12">
                    <v-card variant="tonal" color="indigo" class="pa-4">
                        <v-card-text class="text-caption font-weight-bold">
                            Term
                        </v-card-text>
                        <v-card-title class="text-h6 text-md-h5 text-lg-h5 font-weight-bold">{{ loan?.term }} x payment</v-card-title>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card variant="tonal" color="indigo" class="pa-4">
                        <v-card-text class="text-caption font-weight-bold">
                            Collateral ({{ loan?.collateral.type }})
                        </v-card-text>
                        <v-card-title class="text-h6 text-md-h5 text-lg-h5 font-weight-bold">{{ currencyFormatUSD(loan?.collateral.value) }}</v-card-title>
                    </v-card>
                </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" lg="3">
                <v-row>
                <v-col cols="12">
                    <v-card variant="tonal" color="indigo" class="pa-4">
                        <v-card-text class="text-caption font-weight-bold">
                            Documents
                        </v-card-text>
                        <v-card-title class="text-h6 text-md-h5 text-lg-h5 font-weight-bold">
                            <v-btn density="comfortable" prepend-icon="mdi-link" variant="outlined">
                                    {{ loan?.documents[0].type }}
                                </v-btn>
                        </v-card-title>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card variant="tonal" color="indigo" class="pa-4">
                        <v-card-text class="text-caption font-weight-bold">
                            Credit Score
                        </v-card-text>
                        <v-card-title class="text-h6 text-md-h5 text-lg-h5 font-weight-bold">{{ loan?.borrower.creditScore }}</v-card-title>
                    </v-card>
                </v-col>
                </v-row>
            </v-col>
        </v-row>

        <!-- tampilkan alert error ketika ada error -->
        <v-alert v-else type="error" dismissible>
        {{ error }}
      </v-alert>
  </v-container>
</template>