import { useState } from 'react';
import { supabase } from './supabaseClient.js';

function PartySetup({ session, setPartyId }) {
  const [Name, setName] = useState("");
  const [ProjectName, setProjectName] = useState("");
  const [ProjectTime, setProjectTime] = useState("");
  const [code, setCode] = useState("");
  const [role, setRole] = useState("");

  async function enterParty() {
    await supabase
      .from('profiles')
      .update({ display_name: Name })
      .eq('id', session.user.id);

    let partyId;

    if (code === "") {
      const newCode = Math.floor(1000 + Math.random() * 9000);

      const { data, error } = await supabase
        .from('parties')
        .insert({ name: ProjectName, code: newCode, timer: ProjectTime })
        .select();

      if (error) {
        console.log("Error creating party:", error);
        return;
      }
      partyId = data[0].id;

    } else {
      const { data, error } = await supabase
        .from('parties')
        .select('*')
        .eq('code', code);

      if (data.length === 0) {
        console.log("wrong code");
        return;
      }
      partyId = data[0].id;
    }

    const { error: memberError } = await supabase
      .from('party_members')
      .insert({ party_id: partyId, user_id: session.user.id, role: role });

    if (memberError) {
      console.log("Error joining party:", memberError);
    } else {
      console.log("Successfully entered party:", partyId);
       setPartyId(partyId);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>

      <button
        onClick={handleSignOut}
        style={{ position: 'absolute', top: '20px', right: '20px' }}
      >
        Sign Out
      </button>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        gap: '20px'
      }}>
        <div>
          <p>Your Name</p>
          <input value={Name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
        </div>
        <div>
          <p>Project Name</p>
          <input value={ProjectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project Name" />
        </div>
        <div>
          <p>Project Time</p>
          <input value={ProjectTime} onChange={(e) => setProjectTime(e.target.value)} placeholder="Project Time in hours" />
        </div>
        <div>
          <p>Code</p>
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code (leave blank to create new, 4 digit number)" />
        </div>
        <div>
          <p>Role</p>
          <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Your Role" />
        </div>
        <button onClick={enterParty}>Enter</button>
      </div>

    </div>
  );
}

export default PartySetup;