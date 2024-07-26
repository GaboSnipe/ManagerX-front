import React, { useState, useEffect } from "react";
import { Paginations, Table, ResizableDiv } from "../components";
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
        <section className="overflow-x-auto mx-auto font-mono">
          <div className="flex">
            <div className="w-full flex-1 overflow-x-auto mb-8 overflow-hidden rounded-lg shadow-lg sm:px-6 lg:px-8 mt-5">
              <div className="w-full flex-1 overflow-x-auto">
                <Table columns={headers} data={data} setData={setData} />
              </div>
              <div className="flex justify-center h-24">
                <Paginations items={data} />
              </div>
            </div>

            {seeResizebleDiv && (
              <ResizableDiv setSeeResizebleDiv={resizebleDivFunc}>
                <p className="text-purple-800 text-5xl tex">{selectedProject.id}</p>
              </ResizableDiv>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;