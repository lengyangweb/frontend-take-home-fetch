import { useState } from "react";
import DogBreeds from "./DogBreeds";
import { toast } from "react-toastify";
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Col, Form, Row } from "react-bootstrap"
import axios from "axios";
import { Dog } from "./Grid";

type SearchProps = {
  size: number;
  dogs: Dog[];
  setDogs: (param: any) => void;
  breeds: {field: string; value:string}[];
  setBreeds: (param: {field: string; value:string}[]) => void;
  zipCodes: string;
  setZipCodes: (param: any) => void;
  ageMin: string;
  setAgeMin: (param: any) => void;
  ageMax: string;
  setAgeMax: (param: any) => void;
  isLoading: boolean;
  setLoading: (param: any) => void;
  setTotal: (param: any) => void;
  setPrevious: (param: any) => void;
  setNext: (param: any) => void;
}

const Search = ({ size, dogs, setDogs, breeds, setBreeds, zipCodes, setZipCodes, ageMin, setAgeMin, ageMax, setAgeMax, setLoading, setTotal, setPrevious, setNext  }: SearchProps) => {

  function buildURL() {
    let url = `https://frontend-take-home-service.fetch.com/dogs/search?size=${size}`;
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
    setLoading((current: any) => current = true);
    try {
      const response = await axios.get(url, { withCredentials: true });
      const { next, prev, resultIds, total } = response.data;
      if (next) setNext((current: string) => current = next);
      if (prev) setPrevious((current: string) => current = prev);
      if (total) setTotal((current: number) => current = total);
      
      const result: any = await axios.post(`https://frontend-take-home-service.fetch.com/dogs`, resultIds, { withCredentials: true });
      setLoading((current: any) => current = false);
      if (result.data) setDogs((current: any) => current = result.data);
    } catch (error) {
      setLoading((current: any) => current = false);
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
            <Col xs={12}>
              <Form.Group>
                <Form.Label htmlFor="zipCodes">ZipCodes:</Form.Label><br/>
                <InputText className="w-100" type="text" id="zipCodes" value={zipCodes} onChange={(e) => setZipCodes((current: any) => current = e.target.value)} />
              </Form.Group>
            </Col>
            <Col xs={12} lg={12}>
              <Form.Group>
                <Form.Label htmlFor="ageMin">Minimum Age:</Form.Label><br/>
                <InputText className="w-100" type="number" id="ageMin" value={ageMin} onChange={(e) => setAgeMin((current: any) => current = e.target.value)} />
              </Form.Group>
            </Col>
            <Col xs={12} lg={12}>
              <Form.Group>
                <Form.Label htmlFor="maxAge">Maximum Age:</Form.Label><br/>
                <InputText className="w-100" type="number" id="maxAge" value={ageMax} onChange={(e) => setAgeMax((current: any) => current = e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="mt-3 d-flex justify-content-center">
        <Button className="rounded" label="Search" icon="pi pi-search" iconPos="right" />
      </div>
    </Form>
  )
}

export default Search