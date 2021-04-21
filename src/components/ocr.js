import React, { useState, useRef } from "react"
import { HiCloudUpload, HiCamera, HiOutlineX, HiAnnotation } from "react-icons/hi"
import Select from "react-select"
import { motion, AnimatePresence } from "framer-motion"

const Ocr = () => {
  const fileInput = useRef(null);
  const [uploaded, setUploaded] = useState([])

  const languages = [
    { value: 'eng', label: 'English' },
    { value: 'esp', label: 'Spanish' },
    { value: 'ex3', label: 'ex3' },
    { value: 'ex4', label: 'ex4' },
  ]
  const outputs = [
    { value: 'docx', label: '.docx' },
    { value: 'txt', label: '.txt' },
    { value: 'pdf', label: '.pdf' }
  ]

  const [language, setLanguage] = useState(null)
  const [outputType, setOutputType] = useState(null)

  function handleClick() {
    fileInput.current.click();
  }

  function handleChange(e) {
    let files = e.target.files
    setUploaded([...uploaded, ...files])
    e.target.value = null
  }

  function onDrop(e) {
    e.preventDefault();

    const {
      dataTransfer: { files }
    } = e;

    setUploaded([...uploaded, ...files])
    e.target.value = null
  }

  function getFileSize(bytes) {
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat(bytes / Math.pow(1024, i)).toFixed(i) + " " + sizes[i];
  }

  function generateFile(file, i) {
    if (typeof file !== "undefined") {
      return (
        <motion.div
          className="uploadedFile"
          key={i}
          animate={{
            opacity: [0, 1],
            scale: [0.5, 1],
          }}
          exit={{ opacity: 0 }}
        >
          <HiCamera />
          <div className="info">
            <h2>{file.name}</h2>
            {`${getFileSize(file.size)} / ${getFileSize(file.size)}`}
          </div>
          <div className="spacer" />
          <HiOutlineX className="end" onClick={() => setUploaded([
            ...uploaded.slice(0, i), ...uploaded.slice(i + 1)
          ])} />
        </motion.div>
      )
    }
  }

  return (
    <>
      <section>
        <motion.div
          className="card"
          id="ocrCard"
          initial={{
            opacity: 0,
            scale: 1.5,
            rotate: 50,
            borderRadius: "25px"
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            borderRadius: "15px"
          }}
          transition={{ type: "spring", stiffness: 90, delay: 0.5 }}
        >
          <div className="upload">
            <div
              className="fileZone"
              onDrop={e => onDrop(e)}
              onDragOver={e => e.preventDefault()}
              role="button"
              tabIndex="0"
            >
              <HiCloudUpload />
              drag files here or
            </div>
            <button onClick={() => handleClick()}>
              browse
            </button>
            <input
              type="file"
              multiple
              style={{ display: "none" }}
              ref={fileInput}
              onChange={e => handleChange(e)}
            />
          </div>
          {uploaded.length === 0 ?
            <div className="instructions">
              <HiAnnotation />
              <h2>No files uploaded</h2>
              Please add files and specify a language and output format
            </div>
            :
            <div className="uploadedTray">
              <AnimatePresence>
                {uploaded.map((f, i) => generateFile(f, i))}
              </AnimatePresence>
            </div>
          }
        </motion.div>
      </section>
      <motion.section
        initial={{
          y: 100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 90, delay: 1 }}
      >
        <Select className="select" classNamePrefix="reactSelect" placeholder="Language" instanceId="lselect"
          options={languages} value={language} onChange={item => setLanguage(item)} />
        <Select className="select" classNamePrefix="reactSelect" placeholder="Output" instanceId="oselect"
          options={outputs} value={outputType} onChange={item => setOutputType(item)} />
        <button id="convertButton">
          convert
        </button>
      </motion.section>
    </>
  )
}

export default Ocr