import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dog } from "./Grid";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "primereact/button";
import axios from "axios";

type MatchListProps = {
  matches: Dog[];
  setMatches: (param: Dog[]) => void;
  setMyMatch: (param: Dog) => void;
  setShowDogView: (param: boolean) => void;
  setViewType: (param: string) => void;
}

const MatchList = ({ matches, setMatches, setMyMatch, setShowDogView, setViewType }: MatchListProps) => {
  const [selected, setSelected] = useState<Dog>();

  function imageBodyTemplate(rowData: Dog) {
    return <img width={'50px'} src={`${rowData.img}`} />
  }

  function clearMatches() {
    setMatches([]);
  }

  function handleRemoveMatch() {
    setMatches(matches.filter((match: Dog) => match.id !== selected?.id));
    setSelected(undefined);
  }

  async function findMatch() {
    try {
      const matchIDs = matches.map((match: Dog) => (match.id));
      const matchResponse = await axios.post(`https://frontend-take-home-service.fetch.com/dogs/match`, matchIDs, { withCredentials: true });
      if ('data' in matchResponse && matchResponse.data?.match) {
        const result: any = await axios.post(`https://frontend-take-home-service.fetch.com/dogs`, [matchResponse.data?.match], { withCredentials: true });
        if (result.data) {
          setMyMatch(result.data[0]);
          setShowDogView(true);
          setViewType('match');
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Row>
      <Col xs={12}>
        <div className="d-flex flex-column">
          <h5>Match List:</h5>
          <div className="d-flex flex-column flex-lg-row gap-2">
            <Button className="rounded" severity="danger" label="Remove" disabled={!selected} onClick={handleRemoveMatch}/>
            <Button className="rounded" severity="secondary" label="Clear List" iconPos="right" onClick={clearMatches} />
            <Button className="rounded" severity="success" label="Match me with this list" onClick={findMatch} />
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
          onSelectionChange={(e: any) => setSelected(e.value)}
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