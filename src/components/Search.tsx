import axios from "axios";
import { Dog } from "./Grid";
import DogBreeds from "./DogBreeds";
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Col, Form, Row } from "react-bootstrap"
import { RadioButton } from "primereact/radiobutton";

type SearchProps = {
  size: number;
  dogs: Dog[];
  setDogs: (param: Dog[]) => void;
  breeds: {field: string; value:string}[];
  setBreeds: (param: {field: string; value:string}[]) => void;
  zipCodes: string;
  setZipCodes: (param: string) => void;
  ageMin: string;
  setAgeMin: (param: string) => void;
  ageMax: string;
  setAgeMax: (param: string) => void;
  isLoading: boolean;
  setLoading: (param: boolean) => void;
  setTotal: (param: number) => void;
  setPrevious: (param: string) => void;
  setNext: (param: string) => void;
  sort: string;
  setSort: (param: string) => void;
}

const Search = ({ size, setDogs, breeds, setBreeds, zipCodes, setZipCodes, ageMin, setAgeMin, ageMax, setAgeMax, isLoading, setLoading, setTotal, setPrevious, setNext, sort, setSort}: SearchProps) => {

  function buildURL() {
    let url = `https://frontend-take-home-service.fetch.com/dogs/search?size=${size}&sort=breed:${sort}`;
    const filterBreeds = breeds.map((breed) => {
      if (breed.value.includes(' ')) return `&breeds=${breed.value.split(' ').join('%20')}`;
      return `&breeds=${breed.value}`
    })

    if (breeds && breeds.length > 0) url += `${filterBreeds.join('')}`;
    if (zipCodes) url += `&zipCodes=${zipCodes}`;
    if (ageMin) url += `&ageMin=${ageMin}`;
    if (ageMax) url += `&ageMax=${ageMax}`;
    return url;
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const url = buildURL();
    setLoading(true);
    try {
      const response = await axios.get(url, { withCredentials: true });
      const { next, prev, resultIds, total } = response.data;
      if (next) setNext(next);
      if (prev) setPrevious(prev);
      if (total) setTotal(total);
      
      const result: any = await axios.post(`https://frontend-take-home-service.fetch.com/dogs`, resultIds, { withCredentials: true });
      setLoading(false);
      if (result.data) setDogs(result.data);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col xs={12} lg={12}>
          <Form.Group>
            <Form.Label htmlFor="search">Breeds:</Form.Label><br/>
            <DogBreeds selectedBreed={breeds} setSelectedBreed={setBreeds} />
          </Form.Group>
        </Col>
        <Col xs={12} lg={12}>
          <Row>
            <Col xs={12} className="pb-2">
              <div className="flex align-items-center">
                  <RadioButton inputId="sort1" name="sort" value="asc" onChange={(e) => setSort(e.value)} checked={sort === 'asc'} />
                  <label htmlFor="ingredient1" className="mx-2">Sort Breed Ascendingly</label>
              </div>
              <div className="flex align-items-center">
                  <RadioButton inputId="sort2" name="sort" value="desc" onChange={(e) => setSort(e.value)} checked={sort === 'desc'} />
                  <label htmlFor="sort2" className="mx-2">Sort Breed Descendingly</label>
              </div>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label htmlFor="zipCodes">ZipCodes:</Form.Label><br/>
                <InputText className="w-100" type="text" id="zipCodes" value={zipCodes} onChange={(e) => setZipCodes(e.target.value)} />
              </Form.Group>
            </Col>
            <Col xs={12} lg={12}>
              <Form.Group>
                <Form.Label htmlFor="ageMin">Minimum Age:</Form.Label><br/>
                <InputText className="w-100" type="number" id="ageMin" value={ageMin} onChange={(e) => setAgeMin(e.target.value)} />
              </Form.Group>
            </Col>
            <Col xs={12} lg={12}>
              <Form.Group>
                <Form.Label htmlFor="maxAge">Maximum Age:</Form.Label><br/>
                <InputText className="w-100" type="number" id="maxAge" value={ageMax} onChange={(e) => setAgeMax(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="mt-3 d-flex justify-content-center">
        <Button className="rounded" label="Search" icon="pi pi-search" disabled={isLoading} iconPos="right" />
      </div>
    </Form>
  )
}

export default Search