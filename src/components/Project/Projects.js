import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../queries/ProjectQueries";
import Spinner from "../Spinner/Spinner";
import ProjectCard from "./ProjectCard";

const Project = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <h2>Something Went Wrong ....</h2>;

  return (
    <>
      {data.projects.length > 0 ? (
        <div className="row mt-4">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <h2>No Projects</h2>
      )}
    </>
  );
};

export default Project;
