import React from 'react'

const ProjectTable = ({projects}) => {
  return (
   <div className="mb-5 col-lg-6 d-flex align-items-stretch">
   <div data-testid="project-table" className="table-style card w-100">
     <div className="card-body">
       <div className="d-md-flex">
         <h3 className="card-title">Projects</h3>
       </div>
       <div>
         <div className="table-responsive mt-3">
           <table className="table stylish-table v-middle mb-0 no-wrap">
             <thead>
               <tr>
                 <th className="border-0 text-muted fw-normal">
                   Name
                 </th>
                 <th className="border-0 text-muted fw-normal">Date</th>
                 <th className="border-0 text-muted fw-normal">
                   Status
                 </th>
                 <th className="border-0 text-muted fw-normal">Deadline</th>
               </tr>
             </thead>
             <tbody>
              { projects?.map((project, index) => (<tr key={index} className="h5">
                 <td>
                   <p className="font-weight-medium mb-0">{project?.name}</p>
                 </td>
                 <td>{project?.date}</td>
                 <td>
                   <span className="badge bg-success px-2 py-1">
                     {project?.status}
                   </span>
                 </td>
                 <td>{project?.deadline}</td>
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

export default ProjectTable