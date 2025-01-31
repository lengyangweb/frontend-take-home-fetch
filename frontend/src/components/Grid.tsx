import axios from 'axios';
import { useEffect, useState } from 'react'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable'

type GridProps = {
  selection: any,
  setSelection: (arg: any) => void
}

const Grid = ({ selection, setSelection }: GridProps) => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    async function fetchUsers(){
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsers();
  }, [])

  return (
    <DataTable 
      className='shadow' 
      stripedRows 
      scrollable
      selectionMode='single'
      scrollHeight='550px' 
      value={users} 
      paginator 
      rows={5} 
      selection={selection}
      onSelectionChange={(e) => setSelection((current: any) => current = e.value)}
      rowsPerPageOptions={[5, 10, 25, 50]} 
      tableStyle={{ minWidth: '50rem' }}
    >
      <Column field="name" header="Name" style={{ width: '25%' }}></Column>
      <Column field="username" header="Username" style={{ width: '25%' }}></Column>
      <Column field="email" header="Email" style={{ width: '25%' }}></Column>
      <Column field="phone" header="Phone" style={{ width: '25%' }}></Column>
    </DataTable>
  )
}

export default Grid