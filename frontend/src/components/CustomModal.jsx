function CustomModal({

  isOpen,

  title,

  children,

  onClose

}) {

  if (!isOpen) return null

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-slate-900 rounded-2xl p-6 w-full max-w-lg">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-xl font-bold text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-red-400"
          >
            ✕
          </button>

        </div>

        {children}

      </div>

    </div>

  )
}

export default CustomModal