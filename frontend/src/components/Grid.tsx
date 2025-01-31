import axios from 'axios';
import { useEffect, useState } from 'react'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable'

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

type GridProps = {
  size: number;
  dogs: Dog[];
  setDogs: (param: any) => void;
  selection: any;
  setSelection: (arg: any) => void;
  isLoading: boolean;
  setLoading: (param: any) => void;
}

const Grid = ({ size, dogs, setDogs, selection, setSelection, isLoading, setLoading  }: GridProps) => {
  
  useEffect(() => {
    async function fetchUsers(){
      setLoading((loading: boolean) => loading = true);
      try {
        const response = await axios.get(`https://frontend-take-home-service.fetch.com/dogs/search?size=100&from=${size}`, { withCredentials: true });
        const result = await axios.post(`https://frontend-take-home-service.fetch.com/dogs`, response.data.resultIds, { withCredentials: true });
        setDogs((current: any) => current = result.data);
        setLoading((loading: boolean) => loading = false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsers();
  }, [])

  function imageBodyTemplate(rowData: Dog) {
    return <img width={'50px'} src={`${rowData.img}`} />
  }

  if (dogs.length === 0) return;

  return (
    <DataTable 
      className='shadow' 
      stripedRows 
      scrollable
      selectionMode='single'
      scrollHeight='650px' 
      value={dogs}
      footer={`${dogs.length} Item(s)`}
      selection={selection}
      onSelectionChange={(e) => setSelection((current: any) => current = e.value)}
      tableStyle={{ minWidth: '50rem' }}
      loading={isLoading}
      >
      <Column field="img" header="Image" body={imageBodyTemplate} style={{ width: '25%' }}></Column>
      <Column field="name" header="Name" style={{ width: '20%' }}></Column>
      <Column field="age" header="Age" style={{ width: '20%' }}></Column>
      <Column field="zip_code" header="Zip Code" style={{ width: '20%' }}></Column>
      <Column field="breed" header="Breed" style={{ width: '20%' }}></Column>
    </DataTable>
  )
}

export default Grid