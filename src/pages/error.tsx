import React, { Dispatch, SetStateAction } from "react";
interface props {
  setPage: Dispatch<SetStateAction<string>>;
}
function Error(props: props) {
  return (
    <div className="App">
      <h1>Page does not exist</h1>
      <button
        onClick={() => {
          props.setPage("index");
        }}
      >
        Go back to index
      </button>
    </div>
  );
}

export default Error;
