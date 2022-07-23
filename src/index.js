import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { useDispatch, useSelector, Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'
import './index.css'
const container = document.getElementById('root')
const root = createRoot(container)

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
)
