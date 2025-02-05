import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dog } from "./Grid";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "primereact/button";

type MatchListProps = {
  matches: Dog[];
  setMatches: (param: Dog[]) => void;
}

const MatchList = ({ matches, setMatches }) => {
  const [selected, setSelected] = useState<Dog>();

  function imageBodyTemplate(rowData: Dog) {
    return <img width={'50px'} src={`${rowData.img}`} />
  }

  return (
    <Row>
      <Col xs={12}>
        <div className="d-flex flex-column">
          <h5>Match List:</h5>
          <div className="d-flex gap-2">
            <Button className="rounded" severity="danger" label="Remove" icon='pi pi-trash' disabled={!selected} iconPos="right" />
          </div>
        </div>
      </Col>
      <Col className="my-3" xs={12}>
        <DataTable 
          className='shadow' 
          stripedRows 
          scrollable
          selectionMode='single'
          scrollHeight='250px' 
          value={matches}
          selection={selected}
          onSelectionChange={(e) => setSelected((current: Dog) => current = e.value)}
          footer={`${matches.length} Item(s)`}
          tableStyle={{ minWidth: '50rem' }}
        >
          <Column field="img" header="Image" body={imageBodyTemplate} style={{ width: '5%' }}></Column>
          <Column field="name" header="Name" style={{ width: '25%' }}></Column>
        </DataTable>
      </Col>
    </Row>
  )
}

export default MatchList