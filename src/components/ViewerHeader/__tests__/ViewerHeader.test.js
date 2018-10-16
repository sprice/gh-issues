import React from "react"
import { create } from "react-test-renderer"
import ViewerHeader from "../ViewerHeader"

test("Snapshop of ViewerHeader", () => {
  const c = create(
    <ViewerHeader githubUrl="https://github.com/ethereum/solidity" />
  )
  expect(c.toJSON()).toMatchSnapshot()
})
