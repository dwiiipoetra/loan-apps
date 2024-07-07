const useLoans = () => {
    // fungsi untuk melakukan fetch API get all loans
    const getAllLoans = () => {
        // menyimpan nilai loans
        const loans = ref(null)
        // menyimpan nilai error ketika fetch API
        const error = ref('')
        // menyimpan nilai table header
        const headers = ref([
            { title: 'Borrower Name', value: 'name', sortable: true },
            { title: 'Email', value: 'email', sortable: true },
            { title: 'Amount (US$)', value: 'amount' },
            { title: 'Interest Rate (%)', value: 'interestRate' },
            { title: 'Term (times)', value: 'term' },
            { title: 'Loan Purpose', value: 'purpose', sortable: true },
            { title: 'Risk Rating', value: 'riskRating', sortable: true  },
            { title: 'Assets Type', value: 'collateralType' },
            { title: 'Assets Value (US$)', value: 'collateralValue' },
            { title: 'Actions', value: 'actions', sortable: false },
        ])
        // menyimpan nilai table body
        const items = ref([])
        // melakukan fetch API, ketika berhasil simpan nilai response ke loans, ketika gagal simpan pesan error
        const load = async () => {
            try {
                // const response = await fetch('https://raw.githubusercontent.com/andreascandle/p2p_json_test/main/api/json/loans.json')
                const response = await fetch('/data.json')
                if(!response.ok) { 
                    throw new Error('Network response is not OK')
                } else {
                    loans.value = await response.json()
                }
            } catch(err) {
                error.value = err.message
                console.log('Error while fetching data', error.value);
            }
        }
        // digunakan untuk memantau nilai list loans ketika berhasil fetch API, kemudian ubah struktur array sesuai kolom table header
        watchEffect(() => {
            if(Array.isArray(loans.value)) {
                loans.value.forEach(item => {
                    items.value.push({
                        id: item.id,
                        name: item.borrower.name,
                        email: item.borrower.email,
                        amount: item.amount,
                        interestRate: item.interestRate,
                        term: item.term,
                        purpose: item.purpose,
                        riskRating: item.riskRating,
                        collateralType: item.collateral.type,
                        collateralValue: item.collateral.value
                    })
                });
            }
        })
        // panggil fungsi load ketika mounted
        onMounted(() => {
            load()
        })
        return { headers, items, error }
    }

    // fungsi untuk melakukan fetch API get loan by ID
    const getLoanByID = (id) => {
        // menyimpan nilai loan
        const loan = ref(null)
        // menyimpan nilai error ketika fetch API
        const error = ref('')
        // melakukan fetch API, ketika berhasil simpan nilai response ke loan, ketika gagal simpan pesan error
        const load = async () => {
            try {
                const response = await fetch('/data.json')
                if(!response.ok) {
                    throw new Error('Network response is not OK')
                } else {
                    const datas = await response.json()
                    loan.value = datas.find(item => item.id === id)
                }
            } catch(err) {
                error.value = err.message
                console.log('Error while fetching data', error.value);
            }
        }

        onMounted(() => {
            load()
        })
        return { loan, error }
    }

    const currencyFormatUSD = (numb) => {
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(numb)
        
        return formatted
    }
    
    return { getAllLoans, getLoanByID, currencyFormatUSD }
}
// export useLoans sebagai fungsi global
export default useLoans