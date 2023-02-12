import React from "react";
import AddClientModal from "../components/Client/AddClientModal";

import Client from "../components/Client/Client";
import AddProjectModal from "../components/Project/AddProjectModal";
import Project from "../components/Project/Projects";

const Home = () => {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Project />
      <hr />
      <Client />
    </>
  );
};

export default Home;
