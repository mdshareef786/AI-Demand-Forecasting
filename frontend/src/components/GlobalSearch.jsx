import { useState,useEffect,useContext } from "react"

import { Search,X } from "lucide-react"

import { useNavigate } from "react-router-dom"

import API from "../api/api"

import {
ThemeContext
}
from "../context/ThemeContext"


function GlobalSearch(){

const navigate=useNavigate()

const {
theme
}
=
useContext(
ThemeContext
)

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

navigate("/admin")

setKeyword("")
setResults([])

return

}

}


return(

<div className="relative w-full max-w-xl mb-6">

<Search

size={18}

className="absolute left-4 top-4 text-slate-400"

/>

<input

type="text"

value={keyword}

placeholder="Search datasets, reports, users, analytics..."

onChange={(e)=>

setKeyword(
e.target.value
)

}

className={`

w-full

pl-12

pr-10

py-4

rounded-2xl

outline-none

transition

${

theme==="dark"

?

"bg-slate-900 border border-slate-700 text-white"

:

"bg-white border border-gray-300 text-slate-900 shadow-md"

}

`}

/>

{

keyword && (

<button

onClick={()=>{

setKeyword("")
setResults([])

}}

className="absolute right-4 top-4 text-slate-400"

>

<X size={16}/>

</button>

)

}


{

results.length>0 && (

<div

className={`

absolute

top-16

w-full

rounded-2xl

z-50

max-h-80

overflow-y-auto

shadow-2xl

${

theme==="dark"

?

"bg-slate-900 border border-slate-700"

:

"bg-white border border-gray-200"

}

`}

>

{

results.map(

(item,index)=>(

<div

key={index}

onClick={()=>

openItem(item)

}

className={`

p-4

cursor-pointer

transition

border-b

${

theme==="dark"

?

"border-slate-800 hover:bg-slate-800"

:

"border-gray-100 hover:bg-gray-50"

}

`}

>

<div

className={`

font-semibold

${

theme==="dark"

?

"text-white"

:

"text-slate-900"

}

`}

>

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

<div

className={`

text-xs mt-1

${

theme==="dark"

?

"text-slate-400"

:

"text-slate-500"

}

`}

>

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