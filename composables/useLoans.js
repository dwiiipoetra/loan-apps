const useLoans = () => {
    const getAllLoans = () => {
        const loans = ref(null)
        const headers = [
            { title: 'Borrower Name', value: 'name' },
            { title: 'Email', value: 'email' },
            { title: 'Amount (US$)', value: 'amount' },
            { title: 'Interest Rate (%)', value: 'interestRate' },
            { title: 'Term (times)', value: 'term' },
            { title: 'Loan Purpose', value: 'purpose' },
            { title: 'Risk Rating', value: 'riskRating' },
            { title: 'Assets Type', value: 'collateralType' },
            { title: 'Assets Value (US$)', value: 'collateralValue' },
            { title: 'Actions', value: 'actions', sortable: false },
        ]
        const items = ref([])
        const error = ref('')
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

        onMounted(() => {
            load()
        })
        return { headers, items, error }
    }

    const getLoanByID = (id) => {
        const loan = ref(null)
        const error = ref('')
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
        const formatted = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'USD'
        }).format(numb)
        
        return formatted
    }
    
    return { getAllLoans, getLoanByID, currencyFormatUSD }
}

export default useLoans