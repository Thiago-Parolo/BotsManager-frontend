import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './App'
import { BotProvider } from './contexts/bot';

import "./global.scss";

ReactDOM.render(
  <React.StrictMode>
    <BotProvider>
      <App />
    </BotProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
