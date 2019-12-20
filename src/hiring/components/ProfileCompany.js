import React from 'react'
import {
  ListGroup, ListGroupItem, Card, Button,
} from 'react-bootstrap'

function ProfileCompany(props) {
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img
          style={{
            borderRadius: '15px', objectFit: 'cover', objectPosition: 'top', maxHeight: '350px',
          }}
          variant="top"
          src={props.list.logo}
        />
        <Card.Body>
          <Card.Title>{props.list.name}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            {props.list.email}
          </ListGroupItem>
          <ListGroupItem>
            {props.list.location}
          </ListGroupItem>
          <ListGroupItem>
                Description:
            {' '}
            <br />
            {' '}
            {props.list.description}
          </ListGroupItem>
        </ListGroup>
        <Button href={`/edit/${props.list.id}`} variant="primary">Edit</Button>
      </Card>
    </>
  )
}

export default ProfileCompany
