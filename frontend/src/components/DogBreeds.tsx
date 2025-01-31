import axios from "axios";
import { AutoComplete } from "primereact/autocomplete";
import { useEffect, useMemo, useState } from "react";

const DogBreeds = () => {
  const [value, setValue] = useState<string>();
  const [breeds, setBreeds] = useState<string[]>([]);
  const [breedSuggestion, setBreedsSuggestion] = useState<string[]>([]);

  useMemo(() => getBreeds(), [])

  async function getBreeds() {
    try {
      const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', { withCredentials: true });
      setBreeds(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  function search(event: any) {
    let items = breeds.filter((breed: string) => breed.includes(event.query));
    setBreedsSuggestion((current: any) => current = items);
  }
    
  return (
    <AutoComplete
      placeholder="Select a breed"
      value={value}
      suggestions={breedSuggestion}
      completeMethod={search}
      onChange={(e) => setValue((current: any) => current = e.value)}
      dropdown
    />
  )
}

export default DogBreeds