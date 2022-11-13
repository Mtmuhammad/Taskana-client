import React from 'react'

const UserTable = ({users}) => {
  return (
   <div className="mb-5 col-lg-6 d-flex align-items-stretch">
   <div data-testid="user-table" className="table-style card w-100">
     <div className="card-body">
       <div className="d-md-flex">
         <h3 className="card-title">Team Members</h3>
       </div>
       <div>
         <div className="table-responsive mt-3">
           <table className="table stylish-table v-middle mb-0 no-wrap">
             <thead>
               <tr>
                 <th className="border-0 text-muted fw-normal">
                   First Name
                 </th>
                 <th className="border-0 text-muted fw-normal">Last Name</th>
                 <th className="border-0 text-muted fw-normal">
                   Email
                 </th>
                 <th className="border-0 text-muted fw-normal">Role</th>
               </tr>
             </thead>
             <tbody>
              { users?.map((user, index) => (<tr key={index} className="h5">
                 <td>
                   <p className="font-weight-medium mb-0">{user?.firstName}</p>
                 </td>
                 <td>{user?.lastName}</td>
                 <td>
                   <span className="badge bg-success px-2 py-1">
                     {user?.email}
                   </span>
                 </td>
                 <td>{user?.empRole}</td>
               </tr>))}
               
             </tbody>
           </table>
         </div>
       </div>
     </div>
   </div>
 </div>
  )
}

export default UserTable