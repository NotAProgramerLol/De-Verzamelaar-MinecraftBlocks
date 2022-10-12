import React, { FormEventHandler } from "react";
import axios from "axios";
type products = {
  Name: string;
  Image: string;
  Price: number;
  ID: number;
  Availability: number;
  Description: string;
};
const Form = (data: products) => {
  // a local state to store the currently selected file.
  const [ID, setID] = React.useState(data.ID);
  const [Error, setError] = React.useState("");
  const [img, setImg] = React.useState(null);
  const [name, setName] = React.useState(data.Name);
  const [price, setPrice] = React.useState(data.Price);
  const [availability, setAvailability] = React.useState(data.Availability);
  const [description, setDescription] = React.useState(data.Description);
  const deleteItem = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("ID", ID.toString());
    try {
      const response = await axios({
        method: "post",
        url: "https://87609.stu.sd-lab.nl/beroeps/verzamelaar/api/private/removeProduct.php",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.response != "Failed") {
        location.reload();
        return;
      }
      setError(response.data.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const updateItem = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    if (img != null) {
      formData.append("img", img || "");
    }
    if (name != data.Name) {
      formData.append("name", name);
    }
    if (description != data.Description) {
      formData.append("description", description);
    }
    if (price != data.Price) {
      formData.append("description", price.toString());
    }
    if (availability != data.Availability) {
      formData.append("availability", availability.toString());
    }
    formData.append("ID", ID.toString());
    try {
      const response = await axios({
        method: "post",
        url: "https://87609.stu.sd-lab.nl/beroeps/verzamelaar/api/private/changeProduct.php",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.response != "Failed") {
        location.reload();
        return;
      }
      setError(response.data.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileSelect = (event: any) => {
    setImg(event.target.files[0]);
  };
  return (
    <form>
      <p>
        <label>Naam: </label>

        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
          defaultValue={data.Name}
        />
      </p>
      <p>
        <label>Description: </label>
        <br />
        <textarea
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          defaultValue={data.Description}
        ></textarea>
      </p>
      <p>
        <label>Prijs: </label>

        <input
          type="number"
          onChange={(event) => {
            setPrice(parseFloat(event.target.value));
          }}
          defaultValue={data.Price}
        />
      </p>
      <p>
        <label>Hoeveelheid: </label>
        <input
          type="number"
          onChange={(event) => {
            setAvailability(parseInt(event.target.value));
          }}
          defaultValue={data.Availability}
        />
      </p>
      <p>
        <img src={data.Image} alt="" />
        <input type="file" onChange={handleFileSelect} />
      </p>
      <p>
        <input type="submit" onClick={updateItem} value="Update" />
        <span> - </span>
        <input type="submit" onClick={deleteItem} value="delete" />
      </p>
      <p className="error">{Error}</p>
    </form>
  );
};

export default Form;
