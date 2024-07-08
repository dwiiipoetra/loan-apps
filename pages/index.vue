<!-- <script>
  const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]

  export default {
    data: () => ({
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
    }),
  }
</script>

<template>
    <v-container>
        <v-sparkline
            :auto-line-width="autoLineWidth"
            :fill="fill"
            :gradient="gradient"
            :gradient-direction="gradientDirection"
            :line-width="width"
            :model-value="value"
            :padding="padding"
            :smooth="radius || false"
            :stroke-linecap="lineCap"
            :type="type"
            auto-draw
        ></v-sparkline>
    </v-container>
</template> -->

<script setup>
// import useLoans composables
import useLoans from '@/composables/useLoans'
// desctructure getAllLoans
const { getAllLoans, arrayOfNumbersTo1K } = useLoans()
// destructure getAllLoans composables
let { loans, error } = getAllLoans()
// simpan data chart
const amountBorrowed = ref([])
const borrowerCreditScore = ref([])
const assetsValue = ref([])

// digunakan untuk memantau nilai list loans ketika berhasil fetch API, kemudian ubah struktur array sesuai chart
watchEffect(() => {
    if(Array.isArray(loans.value)) {
        amountBorrowed.value = arrayOfNumbersTo1K(loans.value.map(item => item.amount))
        borrowerCreditScore.value = loans.value.map(item => item.borrower.creditScore)
        assetsValue.value = arrayOfNumbersTo1K(loans.value.map(item => item.collateral.value))
    }
})
const value = ref([]);
</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="text-center">
                <h1 class="text-h4">Loan Dashboard</h1>
            </v-col>
        </v-row>
        <v-row v-if="!error">
            <v-col cols="12" md="12" lg="12">
                <v-card
                class="mx-auto text-center"
                color="indigo"
                max-width="1000"
                dark
                >
                <v-card-text>
                    <v-sheet color="rgba(0, 0, 0, .12)">
                    <v-sparkline
                        :model-value="amountBorrowed"
                        color="rgba(255, 255, 255, .7)"
                        height="100"
                        padding="24"
                        stroke-linecap="round"
                        type="bar"
                        :smooth="false"
                        labelSize="3"
                    >
                        <template v-slot:label="item">
                        ${{ item.value }}
                        </template>
                    </v-sparkline>
                    </v-sheet>
                </v-card-text>
            
                <v-card-text>
                    <div class="text-h5 font-weight-thin">
                        Amount Borrowed (k)
                    </div>
                </v-card-text>
            
                <v-divider></v-divider>
            
                <v-card-actions class="justify-center">
                    <v-btn
                    variant="text"
                    block
                    >
                    Go to Report
                    </v-btn>
                </v-card-actions>
                </v-card>
            </v-col>

            <v-col cols="12" md="12" lg="12">
                <v-card
                class="mx-auto text-center"
                color="orange"
                max-width="1000"
                dark
                >
                <v-card-text>
                    <v-sheet color="rgba(0, 0, 0, .12)">
                    <v-sparkline
                        :model-value="borrowerCreditScore"
                        color="rgba(255, 255, 255, .7)"
                        height="100"
                        padding="24"
                        stroke-linecap="round"
                        smooth
                        fill="true"
                        line-width="1"
                        :showLabels="false"
                        labelSize="3"
                    >
                        <template v-slot:label="item">
                        {{ item.value }}
                        </template>
                    </v-sparkline>
                    </v-sheet>
                </v-card-text>
            
                <v-card-text>
                    <div class="text-h5 font-weight-thin">
                        Borrower Credit Score
                    </div>
                </v-card-text>
            
                <v-divider></v-divider>
            
                <v-card-actions class="justify-center">
                    <v-btn
                    variant="text"
                    block
                    >
                    Go to Report
                    </v-btn>
                </v-card-actions>
                </v-card>
            </v-col>

            <v-col cols="12" md="12" lg="12">
                <v-card
                class="mx-auto text-center"
                color="green"
                max-width="1000"
                dark
                >
                <v-card-text>
                    <v-sheet color="rgba(0, 0, 0, .12)">
                    <v-sparkline
                        :model-value="assetsValue"
                        color="rgba(255, 255, 255, .7)"
                        height="100"
                        padding="24"
                        stroke-linecap="round"
                        line-width="2"
                        :smooth="false"
                        labelSize="3"
                    >
                        <template v-slot:label="item">
                        ${{ item.value }}
                        </template>
                    </v-sparkline>
                    </v-sheet>
                </v-card-text>
            
                <v-card-text>
                    <div class="text-h5 font-weight-thin">
                        Assets Value (k)
                    </div>
                </v-card-text>
            
                <v-divider></v-divider>
            
                <v-card-actions class="justify-center">
                    <v-btn
                    variant="text"
                    block
                    >
                    Go to Report
                    </v-btn>
                </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <!-- tampilkan alert error ketika ada error -->
        <v-alert v-else type="error" dismissible>
        {{ error }}
        </v-alert>
    </v-container>
</template>