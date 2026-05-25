import { useState } from "react"

function ForecastFilter({

onFilter

}){

const [

model,

setModel

]=useState(
"All Models"
)

const [

region,

setRegion

]=useState(
"All Regions"
)



return(

<div className="flex gap-4">

<select

value={model}

onChange={(e)=>{

const value=

e.target.value

setModel(
value
)

onFilter(
value,
region
)

}}

className="bg-slate-900 text-white px-4 py-2 rounded-xl"

>

<option>

All Models

</option>

<option>

Prophet

</option>

<option>

Linear

</option>

<option>

Ensemble

</option>

</select>



<select

value={region}

onChange={(e)=>{

const value=

e.target.value

setRegion(
value
)

onFilter(
model,
value
)

}}

className="bg-slate-900 text-white px-4 py-2 rounded-xl"

>

<option>

All Regions

</option>

<option>

APAC

</option>

<option>

EMEA

</option>

<option>

LATAM

</option>

<option>

North America

</option>

</select>

</div>

)

}

export default ForecastFilter