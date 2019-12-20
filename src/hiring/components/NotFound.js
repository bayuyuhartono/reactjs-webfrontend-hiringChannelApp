import React from 'react'
import { Container, Alert } from 'react-bootstrap'

function NotFound(props) {
  return (
    <>
      <Container>
        <Alert variant="dark">
          <Alert.Heading>
Sorry, we couldn't find any data for '
            {props.keyword}
'
          </Alert.Heading>
        </Alert>
      </Container>
    </>
  )
}

export default NotFound
