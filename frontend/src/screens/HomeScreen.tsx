import { useState } from "react"
import { Card } from "primereact/card"
import Grid, { Dog } from "../components/Grid"
import Search from "../components/search"
import { Col, Container, Row } from "react-bootstrap"
import { Button } from "primereact/button"

const HomeScreen = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [size, setSize] = useState(100);
  const [breeds, setBreeds] = useState<{field: string, value: string}[]>([]);
  const [zipCodes, setZipCodes] = useState<string>('');
  const [ageMin, setAgeMin] = useState<string>('');
  const [ageMax, setAgeMax] = useState<string>('');
  const [selection, setSelection] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [next, setNext] = useState();
  const [previous, setPrevious] = useState();

  return (
    <Container fluid>
      <div className="d-flex justify-content-center align-items-center mt-4">
        <Row className="col-sm-12 col-md-8 col-lg-6 col-xl-12">
          <Col xs={12} xl={4}>
            <Col xs={12}>
              <div className="d-flex justify-content-center">
                <Card title="Search">
                  <Search 
                    size={size} 
                    isLoading={isLoading}
                    setLoading={setLoading}
                    dogs={dogs}
                    setDogs={setDogs}
                    breeds={breeds} 
                    setBreeds={setBreeds} 
                    zipCodes={zipCodes} 
                    setZipCodes={setZipCodes} 
                    ageMin={ageMin}
                    setAgeMin={setAgeMin}
                    ageMax={ageMax}
                    setAgeMax={setAgeMax}
                    setNext={setNext}
                    setPrevious={setPrevious}
                  />
                </Card>
              </div>
            </Col>
          </Col>
          <Col xs={12} lg={12} xl={8}>
            {/* datatable */}
            <Grid size={size} dogs={dogs} setDogs={setDogs} selection={selection} setSelection={setSelection} isLoading={isLoading} setLoading={setLoading} />
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button className="rounded" label="Pev" icon='pi pi-arrow-left' disabled={size === 100} onClick={() => setSize((size) => size -= 100)} />
              <Button className="rounded" label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => setSize((size) => size += 100)} />
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default HomeScreen