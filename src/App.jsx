import { useCallback, useEffect, useState ,useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(6);
  const [password, setPassword] = useState('');
  const [number,setNumber]=useState("false");
  const [char,setChar]=useState("false");
  const passwordRef=useRef(null);

  const passwordGen=useCallback(()=>{
    let pass="";
    let charSet="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(number) charSet+="1234567890";
    if(char) charSet+="~#$%^&*()_-:\/?"

    for(let i=0;i<length;i++){
      pass+=charSet.charAt(Math.floor(Math.random()*charSet.length));
      setPassword(pass)
    }

  },[length,number,char,setPassword])

  useEffect(()=>{
    passwordGen()
  },[length,number,char,passwordGen])

  const passwordCopy=useCallback(()=>{
    passwordRef.current?.select()

   window.navigator.clipboard.writeText(password)
  },[password])

  return (
   <><div className='w-full max-w-md mx-auto bg-slate-800 rounded-xl p-7 shadow-lg'>
   <h1 className='text-3xl text-center text-white uppercase pt-6 pb-4 font-semibold'>
       Password Generator
   </h1>

   <div className='w-full flex flex-wrap justify-center items-center mb-4'>
       <input 
           className='w-full h-12 rounded-md py-2 px-3 text-center bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 transition duration-300' 
           type="text"  
           placeholder=' Password'
           value={password} 
           readOnly
           ref={passwordRef}
       />
       <button onClick={passwordCopy}
       className='ml-4 mt-4 w-32 h-12 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-medium rounded-xl hover:from-blue-700 hover:to-blue-900 transition duration-300'>
           Copy
       </button>
   </div>

   <div className='text-white flex flex-wrap justify-between items-center mt-6 text-lg pb-6'>
       <div className=' w-full sm:w-2/4 flex flex-col items-center'>
           <label className='mb-2 text-sm'>Length: {length}</label>
           <input 
               className='h-2 w-40 bg-gray-600 rounded-lg appearance-none cursor-pointer sm:mt-3' 
               type="range" 
               value={length}
               min={6}
               max={40}
               onChange={e => setLength(e.target.value)}
           />
       </div>

       <div className=' mt-4 sm:mt-0 flex items-center'>
           <input 
               className='mr-2 cursor-pointer' 
               type="checkbox" 
               onChange={() => setNumber(prev => !prev)}
               defaultChecked={number}
           />
           <label className='text-sm'>Numbers</label>
       </div>

       <div className='mt-4 sm:mt-0 flex items-center'>
           <input 
               className='mr-2 cursor-pointer' 
               type="checkbox" 
               onChange={() => setChar(prev => !prev)}
               defaultChecked={char}
           />
           <label className='text-sm'>Characters</label>
       </div>
   </div>
</div>

   </>
  )
}

export default App
