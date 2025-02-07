import axios from "axios";
import { AutoComplete } from "primereact/autocomplete";
import { useMemo, useState } from "react";
import { Col } from "react-bootstrap";

type DogBreedsProps = { selectedBreed: any; setSelectedBreed: (param: any) => void }

const DogBreeds = ({ selectedBreed, setSelectedBreed }: DogBreedsProps) => {
  const [breeds, setBreeds] = useState<{field: string; value: string}[]>([]);
  const [breedSuggestion, setBreedsSuggestion] = useState<any[]>([]);

  useMemo(() => getBreeds(), [])

  async function getBreeds() {
    try {
      const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', { withCredentials: true });
      setBreeds(response.data.map((breed: any) => ({ field: breed, value: breed })));
    } catch (error) {
      console.error(error);
    }
  }

  function search(event: any) {
        // Timeout to emulate a network connection
        setTimeout(() => {
          let _filteredBreeds;

          if (!event.query.trim().length) {
              _filteredBreeds = [...breeds];
          }
          else {
              _filteredBreeds = breeds.filter((breed) => {
                  return breed.value.toLowerCase().startsWith(event.query.toLowerCase());
              });
          }

          setBreedsSuggestion(_filteredBreeds);
      }, 250);
  }
    
  return (
    <Col xs={12}>
      <AutoComplete
        field="field"
        multiple
        placeholder="Select a breeds"
        value={selectedBreed}
        suggestions={breedSuggestion}
        completeMethod={search}
        onChange={(e) => setSelectedBreed(e.value)}
      />
    </Col>
  )
}

export default DogBreeds