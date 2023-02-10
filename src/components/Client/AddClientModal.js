import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../../queries/ClientQueries";
import { ADD_CLIENT } from "../../mutations/ClientMutation/ClientMut";

export default function AddClientModal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "") {
      return alert("Please fill in all fields");
    }
    addClient(name, email, phone);
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <>
      <div className="modal-dialog w-50 rounded p-2 border border-secondary">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addClientModalLabel">
              Add Client
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
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <button
                type="submit"
                data-bs-dismiss="modal"
                className="btn btn-secondary"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
