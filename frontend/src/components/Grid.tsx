import axios from 'axios';
import { useEffect, useState } from 'react'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable'

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

type GridProps = {
  size: number;
  selection: any;
  setSelection: (arg: any) => void
}

const Grid = ({ size, selection, setSelection }: GridProps) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUsers(){
      setIsLoading((loading) => loading = true);
      try {
        const response = await axios.get(`https://frontend-take-home-service.fetch.com/dogs/search?size=100&from=${size}`, { withCredentials: true });
        const result = await axios.post(`https://frontend-take-home-service.fetch.com/dogs`, response.data.resultIds, { withCredentials: true });
        setDogs((current: any) => current = result.data);
        setIsLoading((loading) => loading = false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsers();
  }, [size])

  if (dogs.length === 0) return;

  return (
    <DataTable 
      className='shadow' 
      stripedRows 
      scrollable
      selectionMode='single'
      scrollHeight='450px' 
      value={dogs}
      footer={`${dogs.length} Item(s)`}
      selection={selection}
      onSelectionChange={(e) => setSelection((current: any) => current = e.value)}
      tableStyle={{ minWidth: '50rem' }}
      loading={isLoading}
    >
      <Column field="id" header="ID" style={{ width: '25%' }}></Column>
      <Column field="name" header="Name" style={{ width: '25%' }}></Column>
      <Column field="age" header="Age" style={{ width: '25%' }}></Column>
      <Column field="zip_code" header="Zip Code" style={{ width: '25%' }}></Column>
      <Column field="breed" header="Breed" style={{ width: '25%' }}></Column>
    </DataTable>
  )
}

export default Grid