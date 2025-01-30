import React from 'react'
import { Card, Col, Container } from 'react-bootstrap'
import LoginForm from '../components/LoginForm'

const Login = () => {
  return (
    <Container fluid>
      <div className="d-flex justify-content-center align-items-center mt-4">
          <Col xs={12} lg={3}>
            <Card>
              <Card.Header>
                <h5>Login Form</h5>
              </Card.Header>
              <Card.Body className='p-4'>
                <LoginForm /> 
              </Card.Body>
            </Card>
          </Col>
      </div>
    </Container>
  )
}

export default Login