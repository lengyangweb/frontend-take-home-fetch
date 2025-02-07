import axios from "axios"
import { Card } from "primereact/card"
import Search from "../components/Search"
import { Button } from "primereact/button"
import { useEffect, useState } from "react"
import DogView from "../components/DogView"
import Grid, { Dog } from "../components/Grid"
import MatchList from "../components/MatchList"
import { Col, Container, Row } from "react-bootstrap"

const HomeScreen = () => {
  const size = 100;
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [breeds, setBreeds] = useState<{field: string, value: string}[]>([]);
  const [zipCodes, setZipCodes] = useState<string>('');
  const [ageMin, setAgeMin] = useState<string>('');
  const [ageMax, setAgeMax] = useState<string>('');
  const [selection, setSelection] = useState<Dog>();
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [nextSelection, setNext] = useState<string>('');
  const [prevSelection, setPrevious] = useState<string>('');
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [sort, setSort] = useState<string>('asc');
  const [showDogView, setShowDogView] = useState<boolean>(false);
  const [matchSelection, setMatchSelection] = useState<Dog[]>([]);
  const [myMatch, setMyMatch] = useState<Dog>();
  const [viewType, setViewType] = useState<string|undefined>('');

  useEffect(() => {
    if (nextSelection) {
      let count = parseInt(nextSelection.split('from=')[1]);
      if (count > total) count = total;
      setCurrentCount(count);
    }
  }, [nextSelection])

  async function getDogs(paginator: 'prev'|'next') {
    try {
      setLoading(true);
      const url = `https://frontend-take-home-service.fetch.com${paginator === 'prev' ? prevSelection : nextSelection}`;
      const response = await axios.get(url, { withCredentials: true });
      const { next, prev, resultIds, total } = response.data;
      if (next) setNext(next);
      if (prev) setPrevious(prev);
      if (total) setTotal(total);
      
      const result: any = await axios.post(`https://frontend-take-home-service.fetch.com/dogs`, resultIds, { withCredentials: true });
      setLoading(false);
      if (result.data) setDogs(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container fluid>
      <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '80px' }}>
        <Row className="col-12 col-md-8 col-lg-6 col-xl-12">
          <Col className="my-4" xs={12} md={12} lg={12} xl={3}>
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
          <Col className="my-3" xs={12} md={12} lg={12} xl={9}>
            {/* datatable */}
            { dogs.length === 0 && (
              <div className="d-flex flex-column">
                <strong>Information: </strong>
                <span>Use the search form to find dogs or click 'Search' button.</span>
              </div>
            )}
            { dogs.length > 0 && (
              <>
                <Grid 
                  dogs={dogs} 
                  selection={selection} 
                  setSelection={setSelection} 
                  isLoading={isLoading} 
                  setShow={setShowDogView} 
                  setViewType={setViewType} 
                />
                <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                  <Button className="rounded" label="Prev" icon='pi pi-arrow-left' disabled={!prevSelection || nextSelection.includes('from=100')} onClick={async() => await getDogs('prev')} />
                  {nextSelection.length > 0 && (<strong>{currentCount} of {total}</strong>)}
                  <Button className="rounded" label="Next" icon="pi pi-arrow-right" iconPos="right" disabled={currentCount === total || currentCount > total} onClick={async() => await getDogs('next')} />
                </div>
              </>
            )}
          </Col>
          { matchSelection.length > 0 && (
            <Col xs={12} md={12} xl={4}>
              <MatchList 
                matches={matchSelection} 
                setMatches={setMatchSelection} 
                setMyMatch={setMyMatch} 
                setShowDogView={setShowDogView} 
                setViewType={setViewType}
              />
            </Col>
          )}
          { showDogView && (
            <Col xs={12}>
              <DogView 
                viewType={viewType}
                visible={showDogView} 
                dog={selection} 
                match={myMatch}
                matchSelection={matchSelection} 
                setDogSelected={setSelection} 
                setVisible={setShowDogView} 
                setMatchSelection={setMatchSelection}
                setViewType={setViewType}
              />
            </Col>
          )}
        </Row>
      </div>
    </Container>
  )
}

export default HomeScreen