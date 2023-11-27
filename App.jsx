import { useState,useEffect } from "react";
import { supabase } from "./libs/supabaseClient";
import Auth from "./componentes/Auth";
import Dashboard from "./componentes/Dashboard";

function SignOut(){
  return(
    <>
    <span>Autenticado</span>
    <button onClick={()=>supabase.auth.signOut()}>Cerrar sesion</button>
    </>
  )

}

function App() {
  const [session,setSession]=useState(null);

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event,session)=>{
      setSession(session);
    });
  
  }, []);
  

  return (
    <>
      {!session ? (
        <Auth />
      ) : (
        <Dashboard title={"Dashboard"} email={session.user.email}>
        
        </Dashboard>
      )}
    </>
  )
}

export default App