import { useState } from "react";
import { supabase } from "../libs/supabaseClient";
import { LoadingIcon } from "./Icons";

export default function Auth(){
    const [loading,setLoading]=useState(false);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState("");

    const handleLogin=async(event)=>{
        event.preventDefault();

        setLoading(true)
        const {error}=await supabase.auth.signInWithPassword({email,password});

        if(error){
            alert(error.error_description || error.message)
        } else {
            alert('Redireccionando...');
        }
        setLoading(false);
    }

    return(
        <div className="h-screen">
        <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-2x1 font-bold"> Weather Sattion Telem&aacute;tica</h1>
            <h1 className="text-x1 font-bold py-10">Inicio de sesi&oacute;n</h1>
            <form onSubmit={handleLogin}>
                <div className="flex flex-col justify-center space-y-2">

                <label htmlFor="email" className="font-bold">
                    Correo electr&oacute;nico
                </label>

                <input 
                className="border border-black px-4 py-2 rounded-lg"
                type="email" 
                placeholder="Correo electr&oacute;nico" 
                value={email} 
                required={true} 
                onChange={(e)=>setEmail(e.target.value)}/>

                <label htmlFor="email" className="font-bold">
                    Contrase&ntilde;a
                </label>

                <input 
                className="border border-black px-4 py-2 rounded-lg"
                type="password" 
                placeholder="Contrase&ntilde;a" 
                value={password} 
                required={true} 
                onChange={(e)=>setPassword(e.target.value)}/>

                <button disabled={loading} className="bg-indigo-600 text-white fond-bold rounded-lg px-4 py-2">
                    {loading 
                    ?<span className="inline-flex space-x4"><LoadingIcon/>Iniciando sesi&oacute;n</span>
                    :<span>Inicia sesi&oacute;n</span>}
                </button>
                </div>
            </form>
        </div>
        </div>
    )
}