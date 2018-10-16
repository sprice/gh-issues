import React from "react"
import { create } from "react-test-renderer"
import Viewer from "../Viewer"

test("Snapshop of Viewer", () => {
  const c = create(<Viewer owner="ethereum" repo="solidity" />)
  expect(c.toJSON()).toMatchSnapshot()
})
