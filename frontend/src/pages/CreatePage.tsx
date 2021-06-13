import React from "react";
import { useHistory } from "react-router-dom";

import { onCreateLink } from "../api";
import { AuthContext } from "../context/authContext";

export const CreatePage: React.FC = () => {
  const history = useHistory();
  const auth = React.useContext(AuthContext);

  const [link, setLink] = React.useState("");

  const pressHandler = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      try {
        const { data } = await onCreateLink(link, auth.token);
        history.push(`/detail/${data.link._id}`);
      } catch (e) {
        console.log(e);
      }
    }
  };

  React.useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="Вставьте ссылку"
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
    </div>
  );
};
