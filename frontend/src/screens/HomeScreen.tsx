import { useState } from "react"
import { Card } from "primereact/card"
import Grid from "../components/Grid"
import Search from "../components/search"
import { Col, Container, Row } from "react-bootstrap"
import { Button } from "primereact/button"

const HomeScreen = () => {
  const [size, setSize] = useState(100);
  const [selection, setSelection] = useState([]);

  return (
    <Container fluid>
      <div className="d-flex justify-content-center align-items-center mt-4">
        <Row className="col-sm-12 col-md-8 col-lg-6 col-xl-8">
          <Col xs={12}>
            <Col xs={8}>
              <div className="d-flex justify-content-center">
                <Card title="Search">
                  <Search />
                </Card>
              </div>
            </Col>
          </Col>
          <Col className="my-4" xs={12} lg={12}>
            {/* datatable */}
            <Grid size={size} selection={selection} setSelection={setSelection} />
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button label="Pev" disabled={size === 100}/>
              <Button label="Next" onClick={() => setSize((size) => size += 100)} />
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default HomeScreen