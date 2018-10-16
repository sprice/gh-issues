import React from "react"
import { create } from "react-test-renderer"
import IssueFilter from "../IssueFilter"
import constants from "../../../constants"

test("Snapshop of IssueFilter", () => {
  const c = create(
    <IssueFilter
      owner="ethereum"
      repo="solidity"
      visibilityFilter={constants.FILTER.OPEN}
    />
  )
  expect(c.toJSON()).toMatchSnapshot()
})
