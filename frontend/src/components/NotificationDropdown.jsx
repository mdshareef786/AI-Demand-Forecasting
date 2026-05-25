import {

Bell,
Trash2

}

from "lucide-react"

import {

useState,
useEffect

}

from "react"

import API from "../api/api"



function NotificationDropdown(){

const [

open,

setOpen

]=useState(false)

const [

notifications,

setNotifications

]=useState([])



useEffect(()=>{

loadNotifications()

},[])



const loadNotifications=async()=>{

try{

const token=

localStorage.getItem(
"token"
)

const response=

await API.get(

"/notifications/",

{

headers:{

Authorization:

`Bearer ${token}`

}

}

)



let data=

response.data



if(

Array.isArray(
data
)

){

setNotifications(
data
)

return

}



if(

data

&&

Array.isArray(
data.notifications
)

){

setNotifications(
data.notifications
)

return

}



if(

data

&&

typeof data==="object"

){

setNotifications(

Object.values(
data
)

)

return

}



setNotifications([])

}

catch(error){

console.log(error)

setNotifications([])

}

}



const clearNotifications=()=>{

setNotifications([])

}



return(

<div className="relative">

<button

onClick={()=>

setOpen(

!open

)

}

className="relative"

>

<Bell size={18}/>

{

notifications.length>0 && (

<span

className="

absolute

-top-2

-right-2

bg-red-500

rounded-full

text-xs

w-5

h-5

flex

items-center

justify-center

"

>

{

notifications.length

}

</span>

)

}

</button>



{

open && (

<div

className="

absolute

right-0

mt-4

w-96

bg-slate-900

border

border-slate-700

rounded-2xl

p-5

z-50

"

>


<div className="flex justify-between mb-4">

<h3 className="font-bold">

Notifications

</h3>


<button

onClick={clearNotifications}

className="text-red-400"

>

<Trash2 size={16}/>

</button>

</div>



<div className="space-y-3 max-h-80 overflow-y-auto">

{

notifications.length===0

?

(

<div className="text-center text-slate-400">

No Notifications

</div>

)

:

notifications.map(

(

item,

index

)=>(

<div

key={index}

className="bg-slate-800 p-4 rounded-xl"

>

<h4 className="font-semibold">

{

item.title

||

"Notification"

}

</h4>

<p className="text-sm text-slate-400 mt-2">

{

item.message

||

item.description

||

JSON.stringify(
item
)

}

</p>

</div>

)

)

}

</div>

</div>

)

}

</div>

)

}



export default NotificationDropdown