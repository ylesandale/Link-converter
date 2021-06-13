/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { Loader } from "../components/Loader";
import { LinksList } from "../components/LinkList";
import { onGetAllLinks } from "../api";
import { AuthContext } from "../context/authContext";

export const LinksPage: React.FC = () => {
  const { token } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [links, setLinks] = React.useState([]);

  React.useEffect(() => {
    const getLinks = async () => {
      try {
        setLoading(true);
        const { data } = await onGetAllLinks(token);
        setLinks(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getLinks();
  }, [token]);

  return (
    <>
      {!loading && <LinksList links={links} />}
      {loading && <Loader />}
    </>
  );
};
