import { FiTrash } from "react-icons/fi";
import { useMutation } from "@apollo/client";
import { GET_PROJECTS } from "../../queries/ProjectQueries";

const ProjectCard = ({ project }) => {
  // const [deleteproject] = useMutation(DELETE_CLIENT, {
  //     variables: { id: client.id },
  //     // refetchQueries: [{ query: GET_CLIENTS }],
  //     update(cache, { data: { deleteClient } }) {
  //       const { projects } = cache.readQuery({ query: GET_PROJECTS });
  //       cache.writeQuery({
  //         query: GET_PROJECTS,
  //         data: {
  //           clients: projects.filter((project) => project.id !== deleteproject.id),
  //         },
  //       });
  //     },
  //   });

  return (
    <div className="col-md-4">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{project.name}</h5>
            <a className="btn btn-light" href={`/projects/${project.id}`}>
              View
            </a>
          </div>
          <p className="small">
            Status: <strong>{project.status}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
