import { motion } from "framer-motion"


function Loader() {

  return (

    <div className="flex justify-center items-center h-[300px]">

      <motion.div

        animate={{

          rotate: 360
        }}

        transition={{

          repeat: Infinity,

          duration: 1,

          ease: "linear"
        }}

        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
      />

    </div>
  )
}

export default Loader