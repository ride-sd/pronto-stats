import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StateManager from './StateManager'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='flex justify-center items-center h-screen'>
      <div className='glaze md:rounded-lg h-screen md:h-[94vh] w-screen md:w-[40vw] text-center md:border-4 border-accent overflow-y-scroll'>
        <StateManager />
      </div>
    </div>
  </StrictMode>,
)
