import React from "react"
import { create } from "react-test-renderer"
import Search from "../Search"

test("Snapshop of Search", () => {
  const c = create(<Search />)
  expect(c.toJSON()).toMatchSnapshot()
})
