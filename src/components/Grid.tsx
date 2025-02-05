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
  dogs: Dog[];
  selection: any;
  isLoading: boolean;
  setViewType: (param: string) => void;
  setSelection: (param: Dog) => void;
  setShow: (param: boolean) => void;
}

const Grid = ({ dogs, selection, setViewType, setSelection, isLoading, setShow  }: GridProps) => {

  function imageBodyTemplate(rowData: Dog) {
    return <img width={'50px'} src={`${rowData.img}`} />
  }

  function handleSelection(e) {
    setSelection((current: Dog) => current = e.value);
    setShow((current: boolean) => current = !current);
    setViewType((view: string) => view = 'dog-view');
  }

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
      onSelectionChange={(e) => handleSelection(e)}
      tableStyle={{ minWidth: '50rem' }}
      loading={isLoading}
    >
      <Column field="img" header="Image" body={imageBodyTemplate} style={{ width: '15%' }}></Column>
      <Column field="name" header="Name" style={{ width: '25%' }}></Column>
      <Column field="age" header="Age" style={{ width: '15%' }}></Column>
      <Column field="zip_code" header="Zip Code" style={{ width: '15%' }}></Column>
      <Column field="breed" header="Breed" style={{ width: '30%' }}></Column>
    </DataTable>
  )
}

export default Grid