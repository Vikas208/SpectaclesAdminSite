import React, { useEffect, useState } from "react";
import { getUsers } from "../../API/LoadData";

function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function loadUsers() {
      let response = await getUsers();
      if (response.status === 200) {
        let result = await response.json();
        setUsers(result);
      }
    }
    loadUsers();
    return () => {
      setUsers([]);
    };
  }, []);
  return (
    <div>
	  
	  <table className="table mt-3 table-responsive">
		<thead className="table-dark">
			<tr>
				<th>Mail Id</th>
				<th>User Name</th>
				<th>Registration Time</th>
			</tr>
		</thead>
		<tbody>
   
      {users &&
        typeof users === "object" &&
        users?.map((element, index) => {
          return (
            <tr key={index}>
				<th scope="row">{element?.mailId}</th>
				<td>{element?.name}</td>
				<td>{element?.dateTime && Date(element?.dateTime)}</td>
			</tr>
          );
        })}
	</tbody>
	</table>
    </div>
  );
}

export default Users;
