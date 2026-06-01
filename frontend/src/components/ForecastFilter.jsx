import { useState,useContext } from "react"

import {
ThemeContext
}
from "../context/ThemeContext"

function ForecastFilter({

onFilter

}){

const {
theme
}
=
useContext(
ThemeContext
)

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

<div className="flex flex-wrap gap-4 mb-6">

<div className="flex flex-col">

<label

className={`

text-sm

font-medium

mb-2

${

theme==="dark"

?

"text-slate-300"

:

"text-slate-600"

}

`}

>

Forecast Model

</label>

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

className={`

px-4

py-3

rounded-2xl

outline-none

min-w-[220px]

transition

${

theme==="dark"

?

"bg-slate-900 text-white border border-slate-700"

:

"bg-white text-slate-900 border border-gray-300 shadow-sm"

}

`}

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

</div>

<div className="flex flex-col">

<label

className={`

text-sm

font-medium

mb-2

${

theme==="dark"

?

"text-slate-300"

:

"text-slate-600"

}

`}

>

Business Region

</label>

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

className={`

px-4

py-3

rounded-2xl

outline-none

min-w-[220px]

transition

${

theme==="dark"

?

"bg-slate-900 text-white border border-slate-700"

:

"bg-white text-slate-900 border border-gray-300 shadow-sm"

}

`}

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

</div>

)

}

export default ForecastFilter