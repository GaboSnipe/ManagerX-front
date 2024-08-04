import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProjectSeeResizebleDiv, setFileInfo, setProjectList, setProjectHeaders } from '../features/project/projectSlice';
import { Paginations, Table, ResizableDiv, FileIcon } from '../components';
import { v4 as uuidv4 } from 'uuid';
import { getProjectListThunk, getProjectHeadersThunk } from '../features/project/projectThunk';
import useAuthCheck from '../utils/hooks/useAuthCheck';

// const response_adata = [
//   {
//     "uuid": "6a2ff5ec-24f5-49a0-8923-c1babfadbcd5",
//     "custom_fields": [
//       {
//         "field": {
//           "id": 1,
//           "name": "test",
//           "data_type": "string"
//         },
//         "value": "oasdn ajda. dddd"
//       },
//       {
//         "field": {
//           "id": 2,
//           "name": "test1",
//           "data_type": "integer"
//         },
//         "value": 342023
//       },
//       {
//         "field": {
//           "id": 4,
//           "name": "a3dd",
//           "data_type": "integer"
//         },
//         "value": 3131213
//       },
//       {
//         "field": {
//           "id": 3,
//           "name": "test2",
//           "data_type": "integer"
//         },
//         "value": 34232193
//       }
//     ],
//     "title": "nino, fanjrebi",
//     "customer": "nino",
//     "case": "fanjrebi",
//     "status": "TODO",
//     "path": null,
//     "comment": "aksndajksd ajksnd asdaskjdnas dasjdnaks dnaskj dnaksd aksjnd asdnaksdnakjsnd adka snd adkasn da sdkajnsd kajn dasn dkajdan sdkjasn d",
//     "created_at": "2024-07-13T06:45:13.331747Z",
//     "updated_at": "2024-07-13T06:45:13.331760Z",
//     "tags": []
//   },
//   {
//     "uuid": "95e4e06d-5c1f-4c5d-907b-c430e925d7c6",
//     "custom_fields": [
//       {
//         "field": {
//           "id": 1,
//           "name": "test",
//           "data_type": "string"
//         },
//         "value": "oas"
//       },
//       {
//         "field": {
//           "id": 2,
//           "name": "test1",
//           "data_type": "integer"
//         },
//         "value": 3
//       },
//       {
//         "field": {
//           "id": 4,
//           "name": "a3dd",
//           "data_type": "integer"
//         },
//         "value": 3
//       },
//       {
//         "field": {
//           "id": 3,
//           "name": "test2",
//           "data_type": "integer"
//         },
//         "value": 31
//       }
//     ],
//     "title": "test, karebi",
//     "customer": "test",
//     "case": "karebi",
//     "status": "TODO",
//     "path": "media/uploads/test/karebi/",
//     "comment": "aksndajksd ajksnd asdaskjdnas dasjdnaks dnaskj dnaksd aksjnd asdnaksdnakjsnd adka snd adkasn da sdkajnsd kajn dasn dkajdan sdkjasn d",
//     "created_at": "2024-07-13T10:05:37.328549Z",
//     "updated_at": "2024-07-13T10:05:37.328558Z",
//     "tags": []
//   },
//   {
//     "uuid": "693768d9-1cff-4b55-a46e-4b08ac5db5f1",
//     "custom_fields": [
//       {
//         "field": {
//           "id": 1,
//           "name": "test",
//           "data_type": "string"
//         },
//         "value": "oasd dddd"
//       },
//       {
//         "field": {
//           "id": 2,
//           "name": "test1",
//           "data_type": "integer"
//         },
//         "value": 3023
//       },
//       {
//         "field": {
//           "id": 4,
//           "name": "a3dd",
//           "data_type": "integer"
//         },
//         "value": 3113
//       },
//       {
//         "field": {
//           "id": 3,
//           "name": "test2",
//           "data_type": "integer"
//         },
//         "value": 3493
//       }
//     ],
//     "title": "test7, skamebi",
//     "customer": "test7",
//     "case": "skamebi",
//     "status": "DONE",
//     "path": "media/uploads/test7/skamebi/",
//     "comment": "aksndajksd ajksnd asdaskjdnas dasjdnaks dnaskj dnaksd aksjnd asdnaksdnakjsnd adka snd adkasn da sdkajnsd kajn dasn dkajdan sdkjasn d sadaskjd akshdnka sdkasdk ajsdjna skdjan dkjnas kdjna sdkjnas kdasn kdjan skdna",
//     "created_at": "2024-07-14T20:37:21.757392Z",
//     "updated_at": "2024-07-14T20:37:21.757419Z",
//     "tags": []
//   },
//   {
//     "uuid": "32748e83-7ecb-4076-8931-1819e5fcffb5",
//     "custom_fields": [],
//     "title": "test2, test1",
//     "customer": "test2",
//     "case": "test1",
//     "status": "TODO",
//     "path": "media/uploads/test2/test1/",
//     "comment": "ajdsknasjdnaksd",
//     "created_at": "2024-07-15T14:35:11.891291Z",
//     "updated_at": "2024-07-15T14:35:11.891321Z",
//     "tags": []
//   },
//   {
//     "uuid": "e1ee31a4-9968-4101-a858-ff2a17a48d6d",
//     "custom_fields": [],
//     "title": "nino, fanjrebu",
//     "customer": "nino",
//     "case": "fanjrebu",
//     "status": "TODO",
//     "path": "media/uploads/nino/fanjrebu/",
//     "comment": "shdnahjd",
//     "created_at": "2024-07-15T15:47:25.228285Z",
//     "updated_at": "2024-07-15T15:47:25.228304Z",
//     "tags": []
//   }
// ]


// const response_headers = [
//   {
//     "id": 1,
//     "name": "test",
//     "label": "test",
//     "data_type": "string"
//   },
//   {
//     "id": 3,
//     "name": "test2",
//     "label": "test2",
//     "data_type": "integer"
//   },
//   {
//     "id": 4,
//     "name": "a3dd",
//     "label": "tes1231t2",
//     "data_type": "integer"
//   },
//   {
//     "id": 2,
//     "name": "test1",
//     "label": "test1",
//     "data_type": "integer"
//   }
// ]

const mandatoryHeaders = [
  { accessor: 'id', type: "integer", label: '#', sortable: false, sortbyOrder: "desc", order: 0, visible: true },
  { accessor: 'title', type: "string", label: 'სახელი', sortable: true, sortbyOrder: "desc", order: 1, visible: true },
  { accessor: 'customer', type: "string", label: 'დამკვეთი', sortable: true, sortbyOrder: "desc", order: 2, visible: true },
  { accessor: 'case', type: "string", label: 'ქეისი', sortable: true, sortbyOrder: "desc", order: 3, visible: true },
  { accessor: 'status', type: "string", label: 'სტატუსი', sortable: true, sortbyOrder: "desc", order: 4, visible: true },
  { accessor: 'created_at', type: "date", label: 'შექმნის თარიღი', sortable: true, sortbyOrder: "desc", order: 998, visible: true },
  { accessor: 'updated_at', type: "date", label: 'განახლების თარიღი', sortable: true, sortbyOrder: "desc", order: 999, visible: true },
  { accessor: 'uuid', type: "string", label: 'uuid', sortable: true, sortbyOrder: "desc", order: 1000, visible: false },
  { accessor: 'comment', type: "string", label: 'comment', sortable: true, sortbyOrder: "desc", order: 1001, visible: false },
]




const formatedHeaders = (mandatoryHeaders, response) => {
  var formated = [...mandatoryHeaders]

  var i = 5;
  response.forEach(item => {
    formated.push({
      accessor: item['name'],
      type: item['data_type'],
      label: item['label'],
      sortable: true,
      sortbyOrder: "desc",
      order: i,
      visible: true,
    });
    i += 1;
  })

  return formated.sort((a, b) => a.order - b.order);;
}

const formatedData = (formattedHeaders, response) => {
  var formated = [];
  var tmp = [];
  let headers = [...formattedHeaders].sort((a, b) => a.order - b.order);

  var i = 1;
  response.map(folder => {
    tmp = [];
    headers.map(header => {

      tmp.push({
        accessor: header['accessor'],
        type: header['type'],
        value: null,
        order: header['order'],
        visible: true
      })

      if (header['accessor'] in folder) {
        tmp.at(-1)['value'] = folder[header['accessor']]
        tmp.at(-1)['visible'] = header['visible']
      } else {
        if (folder['custom_fields']) {
          folder['custom_fields'].forEach(field => {
            if (field['field']['name'] == header['accessor']) {
              tmp.at(-1)['value'] = field['value']
            }
          })
        }
      }
    })

    tmp[0].value = i;
    i += 1;
    formated.push(tmp);
  })

  

  return formated.sort((a, b) => a.order - b.order);
}



const Projects = () => {
  const dispatch = useDispatch();
  const loading = useAuthCheck();
  const files = useSelector((state) => state.project.fileList);
  const seeResizebleDiv = useSelector((state) => state.project.seeResizebleDiv);
  const selectedProject = useSelector((state) => state.project.projectInfo);
  const response_headers = useSelector((state) => state.project.projectHeaders);
  const response_adata = useSelector((state) => state.project.projectList);
  const selectedFile = useSelector((state) => state.project.fileInfo);
  const headers = formatedHeaders(mandatoryHeaders, response_headers)
  const [data, setData] = useState(formatedData(headers, response_adata));



  const getData = async () => {
    try {
      await dispatch(getProjectHeadersThunk()).unwrap();
      await dispatch(getProjectListThunk()).unwrap();
    } catch (err) {
      console.error('Failed to get project list:', err);
    }
  };

  useEffect(() => {
    setData(formatedData(headers, response_adata));
  }, [response_adata]);

  useEffect(()=>{
    getData();
  }, [])

  const handleResizebleDivToggle = () => {
    dispatch(setProjectSeeResizebleDiv(!seeResizebleDiv));
  };
  const handleClick = (file) => {
    dispatch(setFileInfo(file));
  };

  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-full">
        <section className="mx-auto font-mono">
          <div className="flex">
            <div className="w-full flex-1 mb-8 overflow-hidden rounded-lg shadow-lg sm:px-6 lg:px-8 mt-5">

              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                        placeholder="Search"
                        required
                      />
                    </div>
                  </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <button
                    type="button"
                    className="flex items-center justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    <svg
                      className="h-3.5 w-3.5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      />
                    </svg>
                    Add product
                  </button>
                  <div className="flex items-center space-x-3 w-full md:w-auto">
                    <button
                      id="actionsDropdownButton"
                      data-dropdown-toggle="actionsDropdown"
                      className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                      type="button"
                    >
                      <svg
                        className="-ml-1 mr-1.5 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clipRule="evenodd"
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        />
                      </svg>
                      Actions
                    </button>
                    <div
                      id="actionsDropdown"
                      className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow"
                    >
                      <ul
                        className="py-1 text-sm text-gray-700"
                        aria-labelledby="actionsDropdownButton"
                      >
                        <li>
                          <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100"
                          >
                            Mass Edit
                          </a>
                        </li>
                      </ul>
                      <div className="py-1">
                        <a
                          href="#"
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Delete all
                        </a>
                      </div>
                    </div>
                    <button
                      id="filterDropdownButton"
                      data-dropdown-toggle="filterDropdown"
                      className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="h-4 w-4 mr-2 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Filter
                      <svg
                        className="-mr-1 ml-1.5 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clipRule="evenodd"
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        />
                      </svg>
                    </button>
                    <div
                      id="filterDropdown"
                      className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow"
                    >
                      <h6 className="mb-3 text-sm font-medium text-gray-900">
                        Choose brand
                      </h6>
                      <ul
                        className="space-y-2 text-sm"
                        aria-labelledby="filterDropdownButton"
                      >
                        <li className="flex items-center">
                          <input
                            id="apple"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                          />
                          <label
                            htmlFor="apple"
                            className="ml-2 text-sm font-medium text-gray-9000"
                          >
                            Apple (56)
                          </label>
                        </li>
                        <li className="flex items-center">
                          <input
                            id="fitbit"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                          />
                          <label
                            htmlFor="fitbit"
                            className="ml-2 text-sm font-medium text-gray-900"
                          >
                            Microsoft (16)
                          </label>
                        </li>
                        <li className="flex items-center">
                          <input
                            id="razor"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                          />
                          <label
                            htmlFor="razor"
                            className="ml-2 text-sm font-medium text-gray-900"
                          >
                            Razor (49)
                          </label>
                        </li>
                        <li className="flex items-center">
                          <input
                            id="nikon"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                          />
                          <label
                            htmlFor="nikon"
                            className="ml-2 text-sm font-medium text-gray-900"
                          >
                            Nikon (12)
                          </label>
                        </li>
                        <li className="flex items-center">
                          <input
                            id="benq"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                          />
                          <label
                            htmlFor="benq"
                            className="ml-2 text-sm font-medium text-gray-900"
                          >
                            BenQ (74)
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex-1 overflow-x-auto flex items-center"> 
                <Table columns={headers} data={data} setData={setData} />
              </div>

              <div className="flex justify-center h-24">
                <Paginations items={data} />
              </div>
            </div>

            {seeResizebleDiv && (
              <ResizableDiv setSeeResizebleDiv={handleResizebleDivToggle}>
                <div className="text-white p-4">
                  <FileIcon files={files} handleClick={handleClick} selectedFile={selectedFile} />
                </div>

                <div className="relative overflow-x-auto w-full shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-white">
                    <caption className="w-full p-5 text-lg font-semibold text-left rtl:text-right text-white bg-gray-800">
                      Comment
                      <p className="mt-1 text-sm font-normal text-gray-400">
                        {
                          selectedProject?.filter(obj => obj.accessor == 'comment')[0].value
                        }
                      </p>
                    </caption>

                    <thead className="w-full text-xs uppercase bg-gray-700 text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Property
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Value
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        selectedProject?.map((item) => {
                          if (!item.visible) return;
                          return (
                            <tr key={uuidv4()} className="w-full border-b">
                              <th scope="row" className="px-6 py-4 font-medium text-white">
                                {item.accessor}
                              </th>

                              <td className="px-6 py-4">
                                {item.value}
                              </td>

                              <td className="px-6 py-4 text-right">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                  Edit
                                </a>
                              </td>
                            </tr>
                          )
                        })

                      }

                    </tbody>
                  </table>
                </div>
              </ResizableDiv>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;