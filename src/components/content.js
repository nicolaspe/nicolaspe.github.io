import React from "react"
import { Link } from "gatsby"

export default ( {children} ) => (
  <div className="content">
    <header>
      <span className="title"><Link to ="/">NE</Link></span>
      <nav>
        <Link to ="/">work</Link>
        <a href="https://www.behance.net/nicolaspe">experiments</a>
        <Link to ="/about">about</Link>
      </nav>
    </header>

    {children}
  </div>
)
