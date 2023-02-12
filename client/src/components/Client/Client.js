import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../../queries/ClientQueries";
import Spinner from "../Spinner/Spinner";
import ClientRow from "./ClientRow";

const Client = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong.</p>;

  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3 ">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <ClientRow client={client} key={client.id} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Client;
