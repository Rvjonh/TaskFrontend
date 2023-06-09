import { Provider } from 'react-redux'
import store from './store/store'
import './index.css';

import ProviderRouter from './routes/ProviderRouter'

function App() {
  return (
    <Provider store={store}>
      <ProviderRouter />
    </Provider>
  )
}

export default App
