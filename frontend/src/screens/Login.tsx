import LoginForm from '../components/LoginForm'
import { Card, Col, Container } from 'react-bootstrap'

const Login = () => {
  return (
    <Container fluid>
      <div className="d-flex justify-content-center align-items-center mt-4">
          <Col xs={12} lg={4}>
            <div className="d-flex justify-content-center my-3">
              <h3 className='bg-dark text-light rounded p-3'>Fetch Frontend Take-Home</h3>
            </div>
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