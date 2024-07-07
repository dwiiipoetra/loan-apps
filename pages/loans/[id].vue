<script setup>
definePageMeta({
    layout: 'default'
})
import useLoans from '@/composables/useLoans'
const { getLoanByID, currencyFormatUSD } = useLoans()
const route = useRoute()
const id = route.params.id
let { loan, error } = getLoanByID(id)
</script>

<style scoped>
</style>

<template>
    <v-container>
        <v-row v-if="!error">
            <v-col cols="12" lg="3">
                <v-card variant="flat" color="indigo" class="pa-4" style="text-align:center; height: 100%;">
                    <v-card-title>{{ loan?.borrower.name }}</v-card-title>
                    <v-card-subtitle>
                        <span class="font-weight-bold">ID: </span>
                        {{ loan?.id }}
                    </v-card-subtitle>
                    <v-avatar image="/avatar/john-smirk.png" class="mt-3" size="50"></v-avatar>
                    <v-card-text>
                        {{ loan?.borrower.email }}
                    </v-card-text>
                    <v-card-actions>
                        Purpose: 
                        {{ loan?.purpose }}
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" lg="3">
                <v-row>
                <v-col cols="12">
                    <v-card variant="tonal" color="indigo" class="pa-4">
                        <v-card-text>
                            Borrowed
                        </v-card-text>
                        <v-card-title>{{ currencyFormatUSD(loan?.amount) }}</v-card-title>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card variant="tonal" color="indigo" class="pa-4">
                        <v-card-text>
                            Interest Rate
                        </v-card-text>
                        <v-card-title>{{ loan?.interestRate }} %</v-card-title>
                    </v-card>
                </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" lg="3">
                <v-row>
                <v-col cols="12">
                    <v-card variant="tonal" color="indigo" class="pa-4">
                        <v-card-text>
                            Term
                        </v-card-text>
                        <v-card-title>{{ loan?.term }} x payment</v-card-title>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card variant="tonal" color="indigo" class="pa-4">
                        <v-card-text>
                            Collateral ({{ loan?.collateral.type }})
                        </v-card-text>
                        <v-card-title>{{ currencyFormatUSD(loan?.collateral.value) }}</v-card-title>
                    </v-card>
                </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" lg="3">
                <v-row>
                <v-col cols="12">
                    <v-card variant="tonal" color="indigo" class="pa-4">
                        <v-card-text>
                            Documents
                        </v-card-text>
                        <v-card-title>
                            <v-btn density="comfortable" prepend-icon="mdi-link" variant="outlined">
                                    {{ loan?.documents[0].type }}
                                </v-btn>
                        </v-card-title>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card variant="tonal" color="indigo" class="pa-4">
                        <v-card-text>
                            Credit Score
                        </v-card-text>
                        <v-card-title class="font-weight-bold">{{ loan?.borrower.creditScore }}</v-card-title>
                    </v-card>
                </v-col>
                </v-row>
            </v-col>
        </v-row>

        <v-alert v-else type="error" dismissible>
        {{ error }}
      </v-alert>
  </v-container>
</template>