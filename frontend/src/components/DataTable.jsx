function DataTable({

  columns,

  data

}) {

  return (

    <div className="overflow-x-auto">

      <table className="w-full text-white">

        <thead>

          <tr>

            {columns.map((col) => (

              <th
                key={col}
                className="p-3 text-left"
              >
                {col}
              </th>

            ))}

          </tr>

        </thead>

        <tbody>

          {data.map((row, index) => (

            <tr
              key={index}
              className="border-t border-slate-700"
            >

              {columns.map((col) => (

                <td
                  key={col}
                  className="p-3"
                >
                  {row[col]}
                </td>

              ))}

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}

export default DataTable