import React from "react"
import { create } from "react-test-renderer"
import Loading from "../Loading"

test("Snapshop of Loading", () => {
  const c = create(<Loading githubUrl="https://github.com/ethereum/soldity" />)
  expect(c.toJSON()).toMatchSnapshot()
})
