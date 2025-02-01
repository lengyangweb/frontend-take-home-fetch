import { useEffect, useState } from "react"
import { Card } from "primereact/card"
import Grid, { Dog } from "../components/Grid"
import Search from "../components/Search"
import { Col, Container, Row } from "react-bootstrap"
import { Button } from "primereact/button"
import axios from "axios"
import DogView from "../components/DogView"

const HomeScreen = () => {
  const size = 100;
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [breeds, setBreeds] = useState<{field: string, value: string}[]>([]);
  const [zipCodes, setZipCodes] = useState<string>('');
  const [ageMin, setAgeMin] = useState<string>('');
  const [ageMax, setAgeMax] = useState<string>('');
  const [selection, setSelection] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [nextSelection, setNext] = useState<string>('');
  const [prevSelection, setPrevious] = useState<string>('');
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [sort, setSort] = useState<string>('asc');
  const [showDogView, setShowDogView] = useState<boolean>(false);

  useEffect(() => {
    if (nextSelection) {
      let count = parseInt(nextSelection.split('from=')[1]);
      if (count > total) count = total;
      setCurrentCount((current: any) => current = count);
    }
  }, [nextSelection])

  async function getDogs(paginator: 'prev'|'next') {
    try {
      setLoading((current: any) => current = true);
      const url = `https://frontend-take-home-service.fetch.com${paginator === 'prev' ? prevSelection : nextSelection}`;
      const response = await axios.get(url, { withCredentials: true });
      const { next, prev, resultIds, total } = response.data;
      if (next) setNext((current: string) => current = next);
      if (prev) setPrevious((current: string) => current = prev);
      if (total) setTotal((current: number) => current = total);
      
      const result: any = await axios.post(`https://frontend-take-home-service.fetch.com/dogs`, resultIds, { withCredentials: true });
      setLoading((current: any) => current = false);
      if (result.data) setDogs((current: any) => current = result.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container fluid>
      <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '80px' }}>
        <Row className="col-sm-12 col-md-8 col-lg-6 col-xl-12">
          <Col xs={12} lg={2} xl={3}>
            <Col xs={12}>
              <div className="d-flex justify-content-center">
                <Card title="Search Form">
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
                    setTotal={setTotal}
                    sort={sort}
                    setSort={setSort}
                  />
                </Card>
              </div>
            </Col>
          </Col>
          <Col xs={12} lg={10} xl={9}>
            {/* datatable */}
            { dogs.length === 0 && (
              <div className="d-flex flex-column">
                <strong>Information: </strong>
                <span>Use the search form to find dogs or click 'Search' button.</span>
              </div>
            )}
            { dogs.length > 0 && (
              <>
                <Grid dogs={dogs} selection={selection} setSelection={setSelection} isLoading={isLoading} setShow={setShowDogView} />
                <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                  <Button className="rounded" label="Prev" icon='pi pi-arrow-left' disabled={!prevSelection || nextSelection.includes('from=100')} onClick={async() => await getDogs('prev')} />
                  {nextSelection.length > 0 && (<strong>{currentCount} of {total}</strong>)}
                  <Button className="rounded" label="Next" icon="pi pi-arrow-right" iconPos="right" disabled={currentCount === total || currentCount > total} onClick={async() => await getDogs('next')} />
                </div>
              </>
            )}
          </Col>
          { showDogView && (
            <Col xs={12}>
              <DogView visible={showDogView} setVisible={setShowDogView} />
            </Col>
          )}
        </Row>
      </div>
    </Container>
  )
}

export default HomeScreen