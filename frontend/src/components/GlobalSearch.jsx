import { useState,useEffect } from "react"

import { Search,X } from "lucide-react"

import { useNavigate } from "react-router-dom"

import API from "../api/api"



function GlobalSearch(){

const navigate=useNavigate()

const [

keyword,

setKeyword

]=useState("")

const [

results,

setResults

]=useState([])



useEffect(()=>{

if(

keyword.trim()===""

){

setResults([])

return

}

searchData()

},[keyword])



const searchData=async()=>{

try{

const response=

await API.get(

`/search/global?keyword=${keyword}`

)



let items=[]



items.push(

...(response.data.datasets || [])

)



items.push(

...(response.data.reports || [])

)



items.push(

...(response.data.users || [])

)



setResults(items)

}

catch(error){

console.log(error)

}

}



const openItem=(item)=>{



if(item.filename){

navigate(

"/upload",

{

state:{

dataset:item

}

}

)



setKeyword("")

setResults([])

return

}



if(item.report_name){

navigate(

"/reports",

{

state:{

report:item

}

}

)



setKeyword("")

setResults([])

return

}



if(item.user_name){

navigate(

"/admin"

)



setKeyword("")

setResults([])

return

}

}



return(

<div className="relative w-full max-w-md mb-6">



<Search

size={18}

className="absolute left-3 top-3 text-slate-400"

/>



<input

type="text"

value={keyword}

placeholder="Search datasets, reports, users"

onChange={(e)=>

setKeyword(

e.target.value

)

}

className="

w-full

pl-10

pr-10

py-3

bg-slate-900

border

border-slate-700

rounded-xl

text-white

outline-none

"

/>



{

keyword && (

<button

onClick={()=>{

setKeyword("")
setResults([])

}}

className="absolute right-3 top-3 text-slate-400"

>

<X size={16}/>

</button>

)

}



{

results.length>0 && (

<div

className="

absolute

top-14

w-full

bg-slate-900

border

border-slate-700

rounded-xl

z-50

max-h-72

overflow-y-auto

"

>

{

results.map(

(item,index)=>(

<div

key={index}

onClick={()=>

openItem(item)

}

className="

p-3

border-b

border-slate-800

hover:bg-slate-800

cursor-pointer

"

>

<div className="font-medium text-white">

{

item.filename

||

item.report_name

||

item.user_name

||

"Unknown"

}

</div>



<div className="text-xs text-slate-400">

{

item.file_path

||

item.email

||

"Search Result"

}

</div>

</div>

)

)

}

</div>

)

}



</div>

)

}



export default GlobalSearch