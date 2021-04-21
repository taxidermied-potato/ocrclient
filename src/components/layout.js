import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.scss"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `)

  return (
    <div className="layoutBody dark">
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main>
        {children}
      </main>
      <footer>
        <p>
          © {new Date().getFullYear()} <a href="https://ocr.io">ocr.io</a>
        </p>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout