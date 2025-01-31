import { useState } from "react"
import { Card } from "primereact/card"
import Grid from "../components/Grid"
import Search from "../components/search"
import { Col, Container, Row } from "react-bootstrap"
import DogBreeds from "../components/DogBreeds"

const HomeScreen = () => {
  const [selection, setSelection] = useState([]);

  return (
    <Container fluid>
      <div className="d-flex justify-content-center align-items-center mt-4">
        <Row className="col-sm-12 col-md-8 col-lg-6 col-xl-8">
          <Col xs={12}>
            <Card title="Search">
              <Search />
              <DogBreeds />
            </Card>
          </Col>
          <Col className="my-4" xs={12} lg={12}>
            {/* datatable */}
            <Grid selection={selection} setSelection={setSelection} />
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default HomeScreen