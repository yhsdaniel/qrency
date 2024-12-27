import './App.css'
import Header from './components/Header'
import { Suspense, lazy, useEffect, useState } from 'react'
import axios from 'axios'

const ResultPage = lazy(() => import('./container/ResultPage'))
const ConvertPage = lazy(() => import('./container/ConvertPage'))

const initialCurrency = [
	{
		id: 147,
		name: "US Dollar",
		short_code: "USD",
		symbol: "$",
	},
	{
		id: 64,
		name: "Indian Rupee",
		short_code: "INR",
		symbol: "₹",
	},
]

function App() {
	const [data, setData] = useState([])
	const [result, setResult] = useState({})
	const [loading, setLoading] = useState(false)
	const [searchQuery, setSearchQuery] = useState("")
	const [searchResult, setSearchResult] = useState({})

	const [amount, setAmount] = useState(100)
	const [selectedBase, setSelectedBase] = useState(initialCurrency.at(0));
	const [selectedForeign, setSelectedForeign] = useState(initialCurrency.at(1));

	const fetchAPI = async () => {
		try {
			const res = await axios.get(`/api/currencies`)
			setData(Object.values(res.data))
		} catch (error) {
			console.error(error)
		}
	}

	const handleChangeAmount = (e) => {
		setAmount(e.target.value)
	}

	const handleSwapCurrency = () => {
		setSelectedBase(selectedForeign)
		setSelectedForeign(selectedBase)
	}

	const handleConversion = async () => {
		const base = selectedBase.short_code.toUpperCase()
		const foreign = selectedForeign.short_code.toUpperCase()
		try {
			setLoading(true)
			const res = await axios.post(`/api/convert?base=${base}&foreign=${foreign}&amount=${amount}`)
			setResult(
				{
					amount: amount,
					base_short_code: selectedBase.short_code,
					foreign_short_code: selectedForeign.symbol,
					foreign_name: selectedForeign.name,
					amount_result: new Intl.NumberFormat().format(res.data.value),
				}
			)
			setLoading(false)
		} catch (error) {
			console.error(error)
		}
	}

	const handleSearchChange = (query) => {
		let results = data.filter(item => item.name?.toLowerCase().includes(query.toLowerCase()) || item.short_code?.toLowerCase().includes(query.toLowerCase()))
		setSearchQuery(query)
		setSearchResult(results)
	}

	useEffect(() => {
		Promise.all([handleConversion(), fetchAPI()])
	}, [])

	return (
		<>
			<Header />
			<div className='mx-[10%] xl:mx-[15%] py-4 flex flex-col md:flex-row justify-center items-center gap-8'>
				<ConvertPage
					data={searchQuery ? searchResult : data}
					amount={amount}
					selectedBase={selectedBase}
					setSelectedBase={setSelectedBase}
					selectedForeign={selectedForeign}
					setSelectedForeign={setSelectedForeign}
					handleChangeAmount={handleChangeAmount}
					handleConversion={handleConversion}
					swapCurrency={handleSwapCurrency}
					query={searchQuery}
					setSearchQuery={setSearchQuery}
					searchQuery={handleSearchChange}
				/>
				<Suspense fallback={<div>Loading...</div>}>
					<ResultPage
						result={result}
						loading={loading}
						setLoading={setLoading}
					/>
				</Suspense>
			</div>
		</>
	)
}

export default App
