import React, { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion"
import CountUp from 'react-countup';

const Stat = (children) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [start, setStart] = useState(0)

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      setStart(1)
    }
  }, [controls, inView]);

  return (
    <motion.div
      className="card"
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 }
      }}
    >
      <CountUp start={start} end={420} duration={3} delay={0} redraw>
        <h2>0</h2>
      </CountUp>
      <p>
        files converted
    </p>
    </motion.div>
  )
}

export default Stat