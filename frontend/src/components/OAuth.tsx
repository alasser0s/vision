import React from 'react'
import { Button } from './ui/button'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '@/redux/user/userslice'
import { useNavigate } from 'react-router-dom'
const OAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = getAuth(app)
  const handleCLickGoogle = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: "select_account" })
    try {

      const resultfromgoogle = await signInWithPopup(auth, provider)
   
      const res = await fetch('/api/auth/google', { // Ensure this URL is correct
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultfromgoogle.user.displayName,
          email: resultfromgoogle.user.email,
          PhotoUrl: resultfromgoogle.user.photoURL,
        }),
        
      })
      const data = await res.json()
      if(res.ok){
        dispatch(signInSuccess(data))
navigate('/')
      }
      console.log(resultfromgoogle);

    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div>
      <Button type='button' variant="outline" onClick={handleCLickGoogle}>auth</Button>
    </div>
  )
}

export default OAuth
