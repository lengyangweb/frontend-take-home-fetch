import { Col } from "react-bootstrap";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { AutoComplete } from "primereact/autocomplete";
import { useGetBreedsMutation } from "../slices/apiSlice";

export type TError = {
  status: string;
  data: string;
  originalStatus: number;
  error: string;
}
type TField = { field: string; value: string };
type DogBreedsProps = { selectedBreed: TField; setSelectedBreed: (param: TField) => void }

const DogBreeds = ({ selectedBreed, setSelectedBreed }: DogBreedsProps) => {
  const [breeds, setBreeds] = useState<TField[]>([]);
  const [breedSuggestion, setBreedsSuggestion] = useState<TField[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getDogBreeds] = useGetBreedsMutation();

  useMemo(() => getBreeds(), [])

  async function getBreeds() {
    try {
      // const response = await axios.get(, { withCredentials: true });
      const url = `https://frontend-take-home-service.fetch.com/dogs/breeds`;
      const response: string[] = await getDogBreeds(url).unwrap();
      if (!response) return;
      if (Array.isArray(response)) setBreeds(response.map((breed: string) => ({ field: breed, value: breed })));
    } catch (error: TError) {
      console.error(error);
      if (error.originalStatus === 401) {
        dispatch(logout());
        navigate('/');
        return;
      }
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