import { useContext } from "react"

import {
ThemeContext
}
from "../context/ThemeContext"

function KpiCard({

title,

value,

icon,

gradient

}) {

const {
theme
} = useContext(
ThemeContext
)

return (

<div

className={`

rounded-3xl

p-6

transition-all

duration-300

hover:scale-[1.02]

hover:shadow-2xl

${

theme === "dark"

?

`bg-gradient-to-br ${gradient}`

:

"bg-white shadow-lg border border-gray-200"

}

`}

>

<div className="flex justify-between items-center">

<div>

<p

className={`

text-sm

font-medium

${

theme === "dark"

?

"text-white/80"

:

"text-slate-500"

}

`}

>

{title}

</p>

<h2

className={`

text-2xl

font-bold

mt-3

${

theme === "dark"

?

"text-white"

:

"text-slate-900"

}

`}

>

{value}

</h2>

</div>

<div

className={`

p-3

rounded-2xl

${

theme === "dark"

?

"bg-white/20"

:

"bg-slate-100"

}

`}

>

<div

className={

theme === "dark"

?

"text-white"

:

"text-slate-700"

}

>

{icon}

</div>

</div>

</div>

</div>

)

}

export default KpiCard