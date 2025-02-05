import { Dog } from "./Grid";
import { Col, Row } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

interface Location {
    zip_code: string
    latitude: number
    longitude: number
    city: string
    state: string
    county: string
}
interface Coordinates {
    lat: number;
    lon: number;
}

type DogViewProps = {
    viewType: string|undefined;
    visible: boolean;
    match: Dog | undefined;
    dog: Dog | undefined;
    matchSelection: Dog[] | undefined;
    setDogSelected: (param: any) => void;
    setVisible: (param: boolean) => void;
    setMatchSelection: (param: Dog[]) => void;
    setViewType: (param: string) => void;
}

const DogView = ({ viewType, visible, dog, match, matchSelection, setDogSelected, setVisible, setMatchSelection, setViewType }: DogViewProps) => {
  const [location, setLocation] = useState<Location>();
  const [isInMatchList, setIsInMatchList] = useState<boolean>(false);
  const [coordinates, setCordinates] = useState<Coordinates>();

  useEffect(() => {
    if (dog || match) {
        getDogLocation();
        if (dog && matchSelection && (matchSelection.some((match: Dog) => match.id === dog.id))) setIsInMatchList((status: boolean) => status = true);
    }
  }, [dog, matchSelection])

  async function getDogLocation() {
    try {
        const url = `https://frontend-take-home-service.fetch.com/locations`;
        const zip_code = (viewType === 'dog-view') ? dog?.zip_code : match?.zip_code;
        const response = await axios.post(url, [zip_code], { withCredentials: true });
        const { data } = response;
        setLocation((current: any) => current = data[0]);
        setCordinates((current: any) => current = { lat: data[0]?.latitude, lon: data[0]?.longitude });
    } catch (error) {
        console.error(error);
    }
  }
  
  function onHide() {
    setDogSelected((selected: any) => selected = undefined);
    if (!visible) return; 
    setVisible(false);
    setViewType((view: string) => view = undefined);
  }

  return (
    <>
        { location && (
            <div className="card flex justify-content-center">
                <Dialog header={dog?.name || `Congratulation! Your match is ... ${match?.name}!`} visible={visible} style={{ width: '50vw' }} onHide={() => onHide()} draggable={false}>
                    <Row>
                        <Col xs={6}>
                            { (dog?.img || match?.img) && (<img style={{ width: '100%' }} src={dog?.img || match?.img} alt="dog image" />) }
                        </Col>
                        <Col xs={6}>
                            <div className="d-flex flex-column gap-3">
                                <Card title="Location">
                                    <div className="d-flex flex-column">
                                        <span><strong>City: </strong> {location?.city}</span>
                                        <span><strong>State: </strong> {location?.state}</span>
                                        <span><strong>Zipcode: </strong> {location?.zip_code}</span>
                                        <span><strong>County: </strong> {location?.county}</span>
                                    </div>
                                </Card>
                                <Card title="Coordinates">
                                    <div className="d-flex flex-column">
                                        <span><strong>Longitude: </strong> {coordinates?.lon}</span>
                                        <span><strong>Latitude: </strong> {coordinates?.lat}</span>
                                    </div>
                                </Card>
                                { (viewType && viewType === 'dog-view') && (
                                    <Button severity="success" label="Add to Match List" icon='pi pi-plus' iconPos="right" disabled={isInMatchList} onClick={() => setMatchSelection((current: Dog[]) => current = [ ...current, dog] )} />
                                )}
                            </div>
                        </Col>
                    </Row>
                </Dialog>
            </div>
        )}
    </>
  )
}

export default DogView