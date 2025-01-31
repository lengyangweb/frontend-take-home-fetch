import { useState } from "react";
import DogBreeds from "./DogBreeds";
import { toast } from "react-toastify";
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Col, Form, Row } from "react-bootstrap"

const Search = () => {
  const [breeds, setBreeds] = useState<{field: string, value: string}[]>([]);
  const [zipCodes, setZipCodes] = useState<string>('');
  const [ageMin, setAgeMin] = useState<string>('');
  const [ageMax, setAgeMax] = useState<string>('');

  function buildURL() {
    let url = `https://frontend-take-home-service.fetch.com/dogs/search`;
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(breeds);
    const queryParams = new URLSearchParams();
    
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
        <Col xs={12} lg={4}>
          <Form.Group>
            <Form.Label htmlFor="zipCodes">ZipCodes:</Form.Label><br/>
            <InputText type="text" id="zipCodes" />
          </Form.Group>
        </Col>
        <Col xs={12} lg={4}>
          <Form.Group>
            <Form.Label htmlFor="ageMin">Minimum Age:</Form.Label><br/>
            <InputText type="text" id="ageMin" />
          </Form.Group>
        </Col>
        <Col xs={12} lg={4}>
          <Form.Group>
            <Form.Label htmlFor="maxAge">Maximum Age:</Form.Label><br/>
            <InputText type="text" id="maxAge" />
          </Form.Group>
        </Col>
      </Row>
      <div className="mt-3">
        <Button className="rounded" label="Search" icon="pi pi-search" iconPos="right" />
      </div>
    </Form>
  )
}

export default Search