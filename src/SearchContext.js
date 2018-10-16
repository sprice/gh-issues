import React from "react"
import constants from "./constants"

const SearchContext = React.createContext({
  visibilityFilter: constants.FILTER.ALL,
  loading: false,
  githubUrl: "",
  owner: "",
  repo: "",
  issues: [],
  error: null,
  handleUrlChange() {},
  searchIssues() {},
  getIssues() {},
  updateStateFromUrl() {},
  clearState() {}
})

export const Provider = SearchContext.Provider
export const Consumer = SearchContext.Consumer
