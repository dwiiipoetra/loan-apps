const getAllLoans = () => {
    const loans = ref([])
    const headers = [
        { title: 'Borrower Name', value: 'name' },
        { title: 'Email', value: 'email' },
        { title: 'Amount', value: 'amount' },
        { title: 'Interest Rate', value: 'interestRate' },
        { title: 'Term', value: 'term' },
        { title: 'Purpose', value: 'purpose' },
        { title: 'Risk Rating', value: 'riskRating' },
        { title: 'Collateral Type', value: 'collateralType' },
    ]
    const items = ref([])

    const error = ref(null)
    const load = async () => {
        try {
            // const response = await fetch('https://raw.githubusercontent.com/andreascandle/p2p_json_test/main/api/json/loans.json')
            const response = await fetch('/data.json')
            if(!response.ok) throw new Error('Network error')
            loans.value = await response.json()
        } catch(err) {
            error.value = err.message
            console.log('Error while fetching data', error.value);
        }
    }

    watchEffect(() => {
        if(Array.isArray(loans.value)) {
            loans.value.forEach(item => {
                items.value.push({
                    name: item.borrower.name,
                    email: item.borrower.email,
                    amount: item.amount,
                    interestRate: item.interestRate,
                    term: item.term,
                    purpose: item.purpose,
                    riskRating: item.riskRating,
                    collateralType: item.collateral.type
                })
            });
        }
    })

    onMounted(() => {
        load()
    })
    return { headers, items, error, load }
}

export default getAllLoans