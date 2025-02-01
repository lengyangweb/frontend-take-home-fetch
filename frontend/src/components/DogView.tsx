import { Dialog } from "primereact/dialog";
import { Button } from "react-bootstrap";

type DogViewProps = {
    visible: boolean;
    setVisible: (param: boolean) => void;
}

const DogView = ({ visible, setVisible }: DogViewProps) => {
  return (
    <>
        <div className="card flex justify-content-center">
            <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </Dialog>
        </div>
    </>
  )
}

export default DogView