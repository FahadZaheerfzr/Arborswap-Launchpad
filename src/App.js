import { BrowserRouter as Router } from 'react-router-dom'
import { SidebarProvider } from './context/SidebarContext/GlobalProvider'
import WebRouter from './route'
import 'react-datetime/css/react-datetime.css'
import { DAppProvider } from '@usedapp/core'
import { networkConfig } from './config/networks'
import { ModalProvider } from 'react-simple-modal-provider'
import modals from 'components/Modal'

function App() {
  return (
    <div className="">
      <DAppProvider config={networkConfig}>
        <ModalProvider value={modals}>
          <SidebarProvider>
            <Router>
              <WebRouter />
            </Router>
          </SidebarProvider>
        </ModalProvider>
      </DAppProvider>
    </div>
  )
}

export default App
