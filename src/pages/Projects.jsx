import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { Header } from '../components';

const headers = ['#', 'დამკვეთი', 'მომსახურება', 'სტატუსი', 'დასკვნის ტიპი', 'ექსპერტი', 'ექსპერტის ანაზღაურება-გადასახადების ჩათვლით ლ', 'დასკვნის ღირებულების გადახდის თარიღი', 'საკომისიო', 'საკომისიოს მიმღები']

const data = [
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
  
]


const Projects = () => {
  return (
    <>
      <div className="min-h-full">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

                {/* my content */}
                

                {/* <a href="https://tailwindcomponents.com/component/responsive-table-5">goto</a> <br/>
                <a href="https://tailwindflex.com/@rp-ketan/datatable">goto</a> */}
                {/* https://flowbite.com/blocks/application/advanced-tables/ */}

              <section class="overflow-x-auto mx-auto p-6 font-mono">
                <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                  <div class="w-full overflow-x-auto">
                    <table class="w-full whitespace-nowrap text-right">

                      <thead>
                        <tr class="text-sm font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                          {
                            headers.map((item) => (
                              <th class="px-4 py-3">{item}</th>
                            ))
                          }
                        </tr>
                      </thead>

                      <tbody class="bg-white">
                        {
                          data.map((item) => (
                            <tr class="text-gray-700 odd:bg-white even:bg-gray-200">
                              {Object.keys(item).map((value) => 
                                <td class="px-4 py-3 text-sm border">{item[value]}</td>
                              )}
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
          </div>
      </div>
    </>
  );
}

export default Projects;