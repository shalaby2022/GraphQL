import { FiTrash } from "react-icons/fi";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../../mutations/ClientMutation/ClientMut";
import { GET_CLIENTS } from "../../queries/ClientQueries";

const ClientRow = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // refetchQueries: [{ query: GET_CLIENTS }],
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger" onClick={() => deleteClient()}>
          <FiTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
