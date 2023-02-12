import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../queries/ProjectQueries";
import { GET_CLIENTS } from "../../queries/ClientQueries";
import { ADD_PROJECT } from "../../mutations/ProjectMutation/ProjectMut";

export default function AddProjectModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientID] = useState("");
  const [status, setStatus] = useState("new");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || description === "" || clientId === "" || status === "") {
      return alert("Please fill in all fields");
    }
    console.log(name, description, clientId, status);
    addProject(name, description, clientId, status);
    setName("");
    setDescription("");
    setClientID("");
    setStatus("");
  };

  // GET clients for selection menu
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return null;
  if (error) return `Error Occured`;

  return (
    <>
      {!loading && !error && (
        <>
          <div className="modal-dialog w-50 rounded p-2 border border-secondary">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addClientModalLabel">
                  Add Project
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      style={{ height: "10px" }}
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      id="status"
                      className="form-select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option unselectable="">Select Status</option>
                      <option value="new">Not Started</option>
                      <option value="progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Client</label>
                    <select
                      id="clientId"
                      className="form-select"
                      value={clientId}
                      onChange={(e) => setClientID(e.target.value)}
                    >
                      <option unselectable="">Select Client</option>
                      {data.clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
