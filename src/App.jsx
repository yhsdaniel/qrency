import './App.css'
import ConvertPage from './container/ConvertPage'
import ResultPage from './container/ResultPage'
import Header from './components/Header'
import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:8080'

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

	const [amount, setAmount] = useState(100)
	const [selectedBase, setSelectedBase] = useState(initialCurrency.at(0));
	const [selectedForeign, setSelectedForeign] = useState(initialCurrency.at(1));

	const fetchAPI = async () => {
		try {
			const res = await axios.get(`${API_URL}/currencies`)
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
			const res = await axios.post(`${API_URL}/convert?base=${base}&foreign=${foreign}&amount=${amount}`)
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

	useEffect(() => {
		Promise.all([handleConversion(), fetchAPI()])
	}, [])

	return (
		<>
			<Header />
			<div className='mx-[15%] flex flex-col md:flex-row justify-center items-center'>
				<ConvertPage
					data={data}
					amount={amount}
					selectedBase={selectedBase}
					setSelectedBase={setSelectedBase}
					selectedForeign={selectedForeign}
					setSelectedForeign={setSelectedForeign}
					handleChangeAmount={handleChangeAmount}
					handleConversion={handleConversion}
					swapCurrency={handleSwapCurrency}
				/>
				<ResultPage 
					result={result}
					loading={loading}
					setLoading={setLoading}
				/>
			</div>
		</>
	)
}

export default App
