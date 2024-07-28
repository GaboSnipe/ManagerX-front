import React, { useState, useEffect } from "react";
import { Paginations, Table, ResizableDiv, FileIcon } from "../components";
import { useSelector, useDispatch } from 'react-redux';




const headers = [
  { accessor: 'id', label: '#', sortable: true, sortbyOrder: "desc" },
  { accessor: 'customer', label: 'დამკვეთი', sortable: true, sortbyOrder: "desc" },
  { accessor: 'momsaxureba', label: 'მომსახურება', sortable: true, sortbyOrder: "desc" },
  { accessor: 'status', label: 'სტატუსი', sortable: true, sortbyOrder: "desc" },
  { accessor: 'daskvnis_tipi', label: 'დასკვნის ტიპი', sortable: true, sortbyOrder: "desc" },
  { accessor: 'expert', label: 'ექსპერტი', sortable: true, sortbyOrder: "desc" },
  { accessor: 'expert_cost', label: 'ექსპერტის ანაზღაურება-გადასახადების ჩათვლით ლ', sortable: true, sortbyOrder: "desc" },
  { accessor: 'gd', label: 'ასკვნის ღირებულების გადახდის თარიღი', sortable: true, sortbyOrder: "desc" },
  { accessor: 'commission', label: 'საკომისიო', sortable: true, sortbyOrder: "desc" },
  { accessor: 'commission_receiver', label: 'საკომისიოს მიმღები', sortable: true, sortbyOrder: "desc" }
];

const adata = [
  {
    id: 'ERP-TA2-01',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9300,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-02',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-03',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-04',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-05',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-06',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-07',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-08',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-09',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-10',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-11',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-12',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-13',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-14',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-15',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-16',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-17',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-18',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-19',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-20',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-21',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-22',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },
  {
    id: 'ERP-TA2-23',
    customer: 'Lorem Ipsum',
    momsaxureba: 'Lorem Ipsum',
    status: 'Done',
    daskvnis_tipi: 'Lorem Ipsum',
    expert: 'Lorem Ipsum',
    expert_cost: 9304,
    gd: '12/03/2024',
    commission: 124,
    commission_receiver: 'Lorem Ipsum'
  },

]


const setSelectedRowId = (id) => ({
  type: 'SET_SELECTED_ROW_ID',
  payload: id,
});
const setSeeResizebleDiv = (value) => ({
  type: 'SET_PROJECT_SEE_RESIZEBLEDIV',
  payload: value,
});

const Projects = () => {
  const dispatch = useDispatch();
  const seeResizebleDiv = useSelector((state) => state.project.seeResizebleDiv);
  const selectedProject = useSelector((state) => state.project.projectInfo);
  const [data, setData] = useState(adata);


  const resizebleDivFunc = () => {
    dispatch(setSeeResizebleDiv(false));
    dispatch(setSelectedRowId(false));
  }

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
                        required=""
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

              <div className="w-full flex-1 overflow-x-auto">
                <Table columns={headers} data={data} setData={setData} />
              </div>

              <div className="flex justify-center h-24">
                <Paginations items={data} />
              </div>
            </div>

            {seeResizebleDiv && (
              <ResizableDiv setSeeResizebleDiv={resizebleDivFunc}>

                <div className="text-white p-4">
                  <FileIcon />
                </div>

                <div className="relative overflow-x-auto w-full shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-white">
                    <caption className="w-full p-5 text-lg font-semibold text-left rtl:text-right text-white bg-gray-800">
                      Our products
                      <p className="mt-1 text-sm font-normal text-gray-400">
                        Browse a list of Flowbite products designed to help you work and play,
                        stay organized, get answers, keep in touch, grow your business, and
                        more.
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
                        headers.map((item) => (
                          <tr key={item.accessor} className="w-full border-b">
                            <th scope="row" className="px-6 py-4 font-medium text-white">
                              {item.label}
                            </th>

                            <td className="px-6 py-4">
                              {selectedProject[item.accessor]}
                            </td>

                            <td className="px-6 py-4 text-right">
                              <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                Edit
                              </a>
                            </td>
                          </tr>
                        ))
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