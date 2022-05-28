import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../../Components/Loading";

const MakeAdmin = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch("http://localhost:5000/user").then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }

  const createAdmin = (user) => {
    fetch(`http://localhost:5000/user/admin/${user.email}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success(`Succesfully made an admin`);
        refetch();
      });
  };
  return (
    <div>
      <h2 className="text-2xl">All Users: {users.length}</h2>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr>
                  <th>1</th>
                  <td>{user.email}</td>
                  <td>
                    {user.role !== "admin" && (
                      <button
                        onClick={() => createAdmin(user)}
                        class="btn btn-xs"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MakeAdmin;