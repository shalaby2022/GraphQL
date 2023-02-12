import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import ClientInfo from "../components/Client/ClientInfo";
import Spinner from "../components/Spinner/Spinner";
import { GET_PROJECT } from "../queries/ProjectQueries";

const Project = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error)
    return (
      <h2 className="text-center text-primary">Somthing went wrong...!</h2>
    );
  console.log(data);
  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>
          <h2>{data.project.name}</h2>
          <p>{data.project.description}</p>

          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{data.project.status}</p>

          <ClientInfo client={data.project.client} />
        </div>
      )}
    </>
  );
};

export default Project;
