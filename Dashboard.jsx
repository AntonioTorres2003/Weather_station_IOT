import { supabase } from "../libs/supabaseClient.js";
import { useState } from "react";
import { useSessionContext } from "../Hooks/useSession";
import Table from "./table.jsx";
import Forecasting from "./forecasting.jsx";

export default function Dashboard({ email }) {
  const [section, setSection]=useState("Dashboard")
  const {session}=useSessionContext();
    return (
      <>
        <div className="bg-slate-900 w-full text-white">
          <div className="flex justify-between px-5">
            {/* Left section */}
            <div className="inline-flex items-center space-x-4">
              <h3 className="text-2xl font-bold">Telematica Weather Station</h3>
            
              
                <p className="cursor-pointer" onClick={()=> setSection("Dashboard")}>Dashboard</p>
                <p className="cursor-pointer" onClick={()=> setSection("Forecasting")}>Forecasting</p>

            </div>
  
            {/* Right section */}
            <div className="py-4 inline-flex items-center">
                
              <p className="p-4 rounded-full bg-slate-100 font-bold text-black">
                
                {email}
              </p>
              <p onClick={()=>supabase.auth.signOut() }className="p-4 m-0 rounded-full bg-slate-100 text-black cursor-pointer">Cerrar sesion</p>
            </div>
          </div>
        </div>
  
        {/* Section */}
        <div className="w-full">
          <div className="px-5 py-4 border-b border-black">
            <h1 className="text-4xl font-bold">{section}</h1>
          </div>
        </div>
  
        <div className="px-5 py-8">
          {section == "Dashboard" && <Table/>}
          {section == "Forecasting" && <Forecasting/>}
        </div>
      </>
    );
  }