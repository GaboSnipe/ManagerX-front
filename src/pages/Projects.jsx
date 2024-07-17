import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { Header } from '../components';

const Projects = () => {
  return (
    <>
      <div className="min-h-full">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

                {/* my content */}
                

                <a href="https://tailwindcomponents.com/component/responsive-table-5">goto</a> <br/>
                <a href="https://tailwindflex.com/@rp-ketan/datatable">goto</a>

          </div>
      </div>
    </>
  );
}

export default Projects;