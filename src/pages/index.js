import * as React from "react"
import { motion } from "framer-motion"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Ocr from "../components/ocr"
import Stat from "../components/stat"

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <section>
        <motion.div
          className="smallContainer"
          animate={{
            x: [-100, 0],
            opacity: [0, 1],
          }}
          transition={{ type: "spring", stiffness: 90 }}
        >
          <p>
            <span> ocr.io </span>
          is a free, open source web client that extracts text from your files and converts them into editable formats
        </p>
        </motion.div>
      </section>
      <Ocr />
      <section className="large">
        <Stat />
      </section>
    </Layout>
  )
}

export default IndexPage
