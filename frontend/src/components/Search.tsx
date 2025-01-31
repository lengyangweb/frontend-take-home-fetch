import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { FormEventHandler } from "react";
import { Form } from "react-bootstrap"
import { toast } from "react-toastify";

const Search = () => {

  function handleSubmit(e: any) {
    e.preventDefault();
    toast.success('Yo!');
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="search">Search:</Form.Label><br/>
        <InputText className="w-100" type="text" id="search" />
      </Form.Group>
      <div className="mt-3 d-flex justify-content-center">
        <Button className="rounded" label="Search" icon="pi pi-search" iconPos="right" />
      </div>
    </Form>
  )
}

export default Search