import { useState,useEffect} from 'react'
import { supabase } from './supabaseClient.js';

function Signup()
{
    const [email, setEmail] = useState("");
const [pass, setPass] = useState("");
const [sign, setSign] = useState("");
const [log, setLog] = useState("");

async function handleSignUp() {
  const { data, error } = await supabase.auth.signUp({ email, password: pass });
  if (error) console.log("Signup error:", error);
  else console.log("Signed up:", data);
}

async function handleLogin() {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
  if (error) console.log("Login error:", error);
  else console.log("Logged in:", data);
}

  return (
<div style={{
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  width: '100vw',
  gap: '20px'
}}>

  <div>
    <p>Email</p>
    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
  </div>

  <div>
    <p>Password</p>
    <input value={pass} onChange={(e) => setPass(e.target.value)} placeholder="pass" />
  </div>

  <div style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px'
  }}>
    <button onClick={handleSignUp}>Sign Up</button>
    <button onClick={handleLogin}>Log In</button>
  </div>

</div>

  )
}

export default Signup;