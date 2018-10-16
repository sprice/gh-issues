import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

import "./styles/normalize.css"
import "typeface-montserrat"
import "./styles/style.scss"

ReactDOM.hydrate(<App />, document.getElementById("root"))
