
import { useState,useCallback, useEffect,useRef } from 'react'


function App() {
const [length, setlength] = useState(8)
const [NumberAllowed,setnumberAllowed] = useState(false) 
const [Character,setcharacter] = useState(false)
const [Password, setpassword] = useState("")

//useRef hook
const Passwordref = useRef(null)

const passwordgenerator = useCallback(()=>{
  
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  if(NumberAllowed) str +="0123456789"
  if(Character)  str += "@#{}~$%&*!^':;?"

 for (let i=0; i <= length; i++) {
     let char = Math.floor(Math.random()*str.length+1) 
     pass += str.charAt(char)

  
 }
  setpassword(pass)


},[length,NumberAllowed,Character,setpassword])

const copyPasswordToClipboard = useCallback(()=>{
  Passwordref.current.select()
  Passwordref.current.setSelectionRange(0,30)
   window.navigator.clipboard.writeText(Password)
},[Password])
useEffect(()=>{
  passwordgenerator()
},[length,NumberAllowed,Character,passwordgenerator])


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md
       rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'> Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden '>

          <input type='' value={Password} className='outline-none w-full py-1 px-3'
          placeholder='Password' readOnly ref={Passwordref}/>
       <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
        copy
       </button>

        
        </div>
        <div className='flex text-sm gap-x-2 '>
          <div className='flex items-center gap-x-1'>
            <input type='range' min={6} max={100} value={length} className='cursor-pointer' 
            onChange={(e)=>{setlength(e.target.value)}} />
            <label>length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            defaultChecked={NumberAllowed}
            id='numberinput'
            onChange={()=>setnumberAllowed((prev) => !prev)}
            />
            <label htmlFor='characterinput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            defaultChecked={Character}
            id='numberinput'
            onChange={()=>setnumberAllowed((prev) => !prev)}
            />
            <label htmlFor='characterinput'>Characters</label>
          </div>

        </div>


       </div>
    </>
  )
}

export default App
