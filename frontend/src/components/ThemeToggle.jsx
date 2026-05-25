import { useContext } from "react"

import {
ThemeContext
}
from "../context/ThemeContext"


function ThemeToggle(){

const {
theme,
toggleTheme
}
=
useContext(
ThemeContext
)

return(

<button

onClick={
toggleTheme
}

className="bg-slate-800 px-4 py-2 rounded-xl"

>

{

theme==="dark"

?

"🌙 Dark"

:

"☀ Light"

}

</button>

)

}

export default ThemeToggle