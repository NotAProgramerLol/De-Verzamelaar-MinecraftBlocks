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
  const handleSubmit = async (event: any) => {
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

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label>Naam: </label>

        <input type="text" disabled defaultValue={data.Name} />
      </p>
      <p>
        <label>Description: </label>
        <br />
        <textarea disabled defaultValue={data.Description}></textarea>
      </p>
      <p>
        <label>Prijs: </label>

        <input disabled type="number" defaultValue={data.Price} />
      </p>
      <p>
        <label>Hoeveelheid: </label>
        <input disabled type="number" defaultValue={data.Availability} />
      </p>
      <p>
        <img src={data.Image} alt="" />
      </p>
      <p>
        <input type="submit" value="delete" />
      </p>
    </form>
  );
};

export default Form;
