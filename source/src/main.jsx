import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'

// 从 GitHub Pages 404 回退回来后恢复原路由。
const redirectedPath = sessionStorage.getItem('phytwin_redirect')
if (redirectedPath) {
  sessionStorage.removeItem('phytwin_redirect')
  history.replaceState(null, '', redirectedPath)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter><App /></BrowserRouter>,
)
