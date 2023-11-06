import React, { useEffect,useState,useRef } from "react";
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();


    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
            userRef.current.focus();
    }
    , [])

    useEffect(() => {
        setErrMsg('');
    }
    , [user, pwd]);


    const handleSubmit = () => {
        if(user === 'admin' && pwd === 'admin'){
            setSuccess(true);
            navigate('/Home')
        }else{
            setErrMsg('Invalid username or password');
        }
    }



  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "white",
        }}
      >
        <div className="mx-auto max-w-screen-md bg-gradient-to-br from-cyan-500 to-white py-5 px-32 h-fit shadow-xl border rounded-3xl">
            <div className="flex items-center justify-center mt-7">
                <p className="text-black text-lg font-medium">Login</p>
            </div>
            <hr className="my-8" />
    
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                <p className="font-light text-sm">Email</p>
                <input
                    type="text"
                    id ="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange ={(e)=>setUser(e.target.value)}
                    value={user}
                    required
                    className="w-80 my-1 h-10 border rounded-lg px-3"
                />
                </div>
                <div className="flex flex-col items-center justify-center">
                <p className="font-light text-sm">Password</p>
                <input
                    type="password"
                    id ="password"
                    onChange ={(e)=>setPwd(e.target.value)}
                    value={pwd}
                    required
                    className="w-80 my-1 h-10 border rounded-lg px-3"
                />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-7">
                <button 
                onClick={handleSubmit}
                className="bg-gradient-to-br from-cyan-500 to-white py-2 mb-4 px-10 rounded-full text-black shadow-3xl font-medium">
                Login
                </button>
                <p ref = {errRef} className={errMsg ? "errmsg " : " offscreen"  } aria-live="assertive">{errMsg}</p>

            </div>


        </div>
        
      </div>
    </div>
  );
}
