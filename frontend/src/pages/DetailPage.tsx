/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../context/authContext";
import { onGetLink } from "../api";
import { Loader } from "../components/Loader";
import { LinkCard } from "../components/LinkCard";

export const DetailPage: React.FC = () => {
  const { token } = React.useContext(AuthContext);
  const linkId = useParams<LinkId>().id;

  const [link, setLink] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getLink = async () => {
      try {
        setLoading(true);
        const { data } = await onGetLink(linkId, token);
        setLink(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getLink();
  }, []);

  return (
    <>
      {!loading && link && <LinkCard link={link} />}
      {loading && <Loader />}
    </>
  );
};
