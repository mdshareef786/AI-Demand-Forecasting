function KpiCard({

title,

value,

icon,

gradient

}){

return(

<div

className={`

bg-gradient-to-br

${gradient}

rounded-3xl

p-6

`}

>

<div className="flex justify-between items-center">

<div>

<p className="text-sm text-white/80">

{title}

</p>

<h2 className="text-2xl font-bold mt-3">

{value}

</h2>

</div>

<div>

{icon}

</div>

</div>

</div>

)

}

export default KpiCard