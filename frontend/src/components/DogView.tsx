import { Dog } from "./Grid";
import { Col, Row } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { useEffect, useState } from "react";

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
    visible: boolean;
    dog: Dog;
    setDogSelected: (param: any) => void;
    setVisible: (param: boolean) => void;
}

const DogView = ({ visible, dog, setDogSelected, setVisible }: DogViewProps) => {
  const [location, setLocation] = useState<Location>();
  const [coordinates, setCordinates] = useState<Coordinates>();

  useEffect(() => {
    if (dog) getDogLocation();
  }, [dog])

  async function getDogLocation() {
    try {
        const url = `https://frontend-take-home-service.fetch.com/locations`;
        const response = await axios.post(url, [dog.zip_code], { withCredentials: true });
        const { data, error } = response;
        setLocation((current: any) => current = data[0]);
        setCordinates((current: any) => current = { lat: data[0]?.latitude, lon: data[0]?.longitude });
    } catch (error) {
        console.error(error);
    }
  }
  
  function onHide() {
    setDogSelected((selected: any) => selected = undefined);
    if (!visible) return; setVisible(false);
  }

  return (
    <>
        { location && (
            <div className="card flex justify-content-center">
                <Dialog header={dog.name} visible={visible} style={{ width: '50vw' }} onHide={() => onHide()} draggable={false}>
                    <Row>
                        <Col xs={6}>
                            { ('img' in dog) && (<img style={{ width: '100%' }} src={dog.img} alt="dog image" />) }
                        </Col>
                        <Col xs={6}>
                            <h5>Location:</h5>
                            <div className="d-flex flex-column">
                                <span><strong>City: </strong> {location?.city}</span>
                                <span><strong>State: </strong> {location?.state}</span>
                                <span><strong>Zipcode: </strong> {location?.zip_code}</span>
                                <span><strong>County: </strong> {location?.county}</span>
                            </div>
                            <h5>Coordinates:</h5>
                            <div className="d-flex flex-column">
                                <span><strong>Longitude: </strong> {coordinates?.lon}</span>
                                <span><strong>Latitude: </strong> {coordinates?.lat}</span>
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