import { useState, useEffect } from 'react';
import './App.css';
import { supabase } from './supabaseClient.js';
import Signup from './signup.jsx';
import PartySetup from './PartySetup.jsx';
import Hack from './hack.jsx';

function App() {
  const [session, setSession] = useState(null);
  const [partyId, setPartyId] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <div>
      {!session ? (
        <Signup />
      ) : !partyId ? (
        <PartySetup session={session} setPartyId={setPartyId} />
      ) : (
        <Hack session={session} partyId={partyId} setPartyId={setPartyId} />
      )}
    </div>
  );
}

export default App;