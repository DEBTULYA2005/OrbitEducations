import { useState, useEffect } from 'react'
import Modal from '@/components/common/Modal'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }) {
  const [tab, setTab] = useState(initialTab)

  useEffect(() => {
    if (isOpen) setTab(initialTab)
  }, [isOpen, initialTab])

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={tab === 'login' ? 'Log in to Orbit' : 'Create your account'}>
      <div className="mb-5 flex rounded-full bg-orbit-blue-50 p-1">
        <button
          onClick={() => setTab('login')}
          className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
            tab === 'login' ? 'bg-white text-orbit-blue-700 shadow-sm' : 'text-orbit-mist'
          }`}
        >
          Log in
        </button>
        <button
          onClick={() => setTab('signup')}
          className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
            tab === 'signup' ? 'bg-white text-orbit-blue-700 shadow-sm' : 'text-orbit-mist'
          }`}
        >
          Sign up
        </button>
      </div>

      <div className="max-h-[65vh] overflow-y-auto pr-1">
        {tab === 'login' ? <LoginForm onSuccess={onClose} /> : <SignupForm onSuccess={onClose} />}
      </div>
    </Modal>
  )
}
