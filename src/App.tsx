import { Provider } from 'react-redux'
import store from './store/store'

function App() {
  return (
    <Provider store={store}>
      <h1>Task app</h1>
    </Provider>
  )
}

export default App
