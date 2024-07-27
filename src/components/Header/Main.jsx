import { Disclosure, DisclosureButton } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Header, MobileMenu, Navigation, UserMenu } from './components' 

const Main = () => {

  const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
  const navigation = [
    { name: 'Dashboard', href: '/', current: true },
    { name: 'Projects', href: '/projects', current: false },
    { name: 'Work Place', href: '/workplace', current: false },
    { name: 'Tasks', href: '/tasks', current: false },
  ]
  
  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-auto">
                  <img src="/images/logo.svg" />
                </div>
              </div>
              <Navigation navigation={navigation} classNames={classNames} />
            </div>
            <div className="hidden md:block">
              <UserMenu user={user} userNavigation={userNavigation} />
            </div>
            <div className="-mr-2 flex md:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>
          </div>
        </div>
        <MobileMenu navigation={navigation} user={user} userNavigation={userNavigation} classNames={classNames} />
      </Disclosure>
      {/* <Header /> */}
    </>
  );
}

export default Main;