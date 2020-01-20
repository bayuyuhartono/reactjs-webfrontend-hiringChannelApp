import React from 'react'
import {
  Card, Button,Table,Row,Col
} from 'react-bootstrap'
import NumberFormat from 'react-number-format'
import Moment from 'react-moment'

function ProfileEngineer(props) {
  return (
    <>
    <Row>
      <Col xs={4}>
        <Card style={{ width: '18rem' }}>
          <Card.Img
            style={{
              borderRadius: '15px', objectFit: 'cover', objectPosition: 'top', height: '350px',
            }}
            variant="top"
            src={process.env.REACT_APP_SERVER_URL + props.list.showcase}
          />
        </Card>
        {props.editNeeded && <Button href={`/edit/${props.list.id}`} variant="primary" style={{width:"287px",marginTop:"10px",marginBottom:"10px"}}>Edit</Button>}
      </Col>
      <Col>
        <h2>{props.title}</h2>
        <Table striped bordered hover size="sm">
          <tbody>
            <tr>
              <td>Name</td>
              <td>{props.list.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{props.list.email}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>{props.list.location}</td>
            </tr>
            <tr>
              <td>Birth</td>
              <td><Moment format="MMMM / DD / YYYY">{props.list.dateOfBirth}</Moment></td>
            </tr>
            <tr>
              <td>Age</td>
              <td>{props.list.age}</td>
            </tr>
            <tr>
              <td>Skill</td>
              <td>{props.list.skill}</td>
            </tr>
            <tr>
              <td>Expected Sallary</td>
              <td><NumberFormat value={props.list.expectedSallary} displayType="text" thousandSeparator prefix="Rp." /></td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{props.list.description}</td>
            </tr>
            <tr>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
    </>
  )
}

export default ProfileEngineer
