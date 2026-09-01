import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient.js';

function hack({ session, partyId, setPartyId }) {
  const [partyName, setPartyName] = useState("");
  const [partyCode, setPartyCode] = useState("");
  const [publicNote, setPublicNote] = useState("");
  const [privateNote, setPrivateNote] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

    async function publicNotes() {
        const {data:notes, error: NotesError} = await supabase
            .from('notes')
            .select('*')
            .eq('party_id', partyId )

        let content;

        

    }
    async function privateNotes() {
        
    }

    async function Chehcklist() {
        
    }

    async function api(params) {
        
    }

    async function timer(){

    }

    async function timer(){

    }

    async function leaveParty() {

        const { error: leaveError } = await supabase
            .from('party_members')
            .delete()
            .eq('party_id', partyId)
            .eq('user_id', session.user.id);

        if (leaveError) {
            console.log("Error leaving party:", leaveError);
            return;
        }

        const { data: remaining, error: countError } = await supabase
            .from('party_members')
            .select('*')
            .eq('party_id', partyId);

        if (countError) {
            console.log("Error checking remaining members:", countError);
            return;
        }

        if (remaining.length === 0) {
            await supabase
            .from('parties')
            .delete()
            .eq('id', partyId);
        }

        setPartyId(null);
    }

  useEffect(() => {
    async function fetchParty() {
      const { data, error } = await supabase
        .from('parties')
        .select('*')
        .eq('id', partyId);

      if (error) {
        console.log("Error fetching party:", error);
        return;
      }
      setPartyName(data[0].name);
      setPartyCode(data[0].code);
    }
    fetchParty();
  }, [partyId]);

  return (
    <div>
        <div>
            <button
                onClick={leaveParty}
                style={{ position: 'absolute', top: '20px', right: '20px' }}
            >
            Leave
            </button>
        </div>

    <p>Party: {partyName}
    Code: {partyCode}
    </p>     

    <div style={{
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden'
    }}>
        <div style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden'  // prevents any scroll, forces everything to fit
        }}>

        <div style={{ flex: 1, border: '1px solid #ccc', padding: '20px', position: 'relative' }}>
            {<div>
                <p>NOTES</p>

                <button
                    onClick={privateNotes}
                    style={{ position: 'absolute', top: '20px', right: '70px' }}
                    >
                    Private
                </button>
                <button
                    onClick={publicNotes}
                    style={{ position: 'absolute', top: '20px', right: '20px' }}
                    >
                    Public
                </button>

                {isPrivate ? (
                <textarea value={privateNote} onChange={(e) => setPrivateNote(e.target.value)} />
                ) : (
                <textarea value={publicNote} onChange={(e) => setPublicNote(e.target.value)} />
                )}
                
            </div>
            }
        </div>

        <div style={{ flex: 1, border: '1px solid #ccc', padding: '20px' }}>
            {/* another region — e.g. checklist */}
        </div>

        <div style={{ flex: 1, border: '1px solid #ccc', padding: '20px' }}>
            {/* another region — e.g. api */}
        </div>
    </div>
    
    <div>
        <div style={{
        display: 'flex',
        flexDirection: 'row',
        height: '80px',
        borderTop: '1px solid #ccc',
        alignItems: 'center',
        padding: '0 20px',
        gap: '10px'
        }}>
    {/* each member rendered here, side by side */}
    </div>
    </div>
    
    </div> 
    


    </div>
    
  );
}

export default hack;


