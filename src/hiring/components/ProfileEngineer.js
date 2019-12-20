import React from 'react'
import {
  ListGroup, ListGroupItem, Card, Button,
} from 'react-bootstrap'
import NumberFormat from 'react-number-format'

function ProfileEngineer(props) {
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img
          style={{
            borderRadius: '15px', objectFit: 'cover', objectPosition: 'top', maxHeight: '350px',
          }}
          variant="top"
          src={props.list.showcase}
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
                Birth:
            {' '}
            {props.list.dateOfBirth}
          </ListGroupItem>
          <ListGroupItem>
                Age:
            {' '}
            {props.list.age}
          </ListGroupItem>
          <ListGroupItem>
                Skills:
            {' '}
            {props.list.skill}
          </ListGroupItem>
          <ListGroupItem>
                Sallary:
            {' '}
            <NumberFormat value={props.list.expectedSallary} displayType="text" thousandSeparator prefix="Rp." />
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

export default ProfileEngineer
