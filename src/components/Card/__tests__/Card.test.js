import React from "react"
import { create } from "react-test-renderer"
import Card from "../Card"

test("Snapshop of Card", () => {
  const labels = [
    {
      id: 42,
      name: "awesome"
    },
    {
      id: 21000000,
      name: "sauce"
    }
  ]
  const c = create(
    <Card isClosed={true} isPullRequest={true}>
      <Card.Icons />
      <Card.Title>Issue Title</Card.Title>
      <Card.Body>Issue Body</Card.Body>
      {labels.map(label => (
        <Card.Label key={label.id}>{label.name}</Card.Label>
      ))}
    </Card>
  )
  expect(c.toJSON()).toMatchSnapshot()
})
