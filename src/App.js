import './App.css';
import "./index.css";
import React from "react";
import logo from "./logo.svg";
import avatar from "./assets/img/avatars/avatar7.png";
import {Outlet} from "react-router-dom";



function App() {
  return (
      <>
        <nav
            className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start rtl:justify-end">
                <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar"
                        aria-controls="logo-sidebar" type="button"
                        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                  <span className="sr-only">Open sidebar</span>
                  <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                       xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd"
                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                  </svg>
                </button>
                <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                  <img src={logo} className="h-8 me-3"
                       alt="Let Drone Logo"/>
                  <span
                      className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Let Drone</span>
                </a>
              </div>
              <div className="flex items-center">
                <div className="flex items-center ms-3">
                  <div>
                    <button type="button"
                            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            aria-expanded="false" data-dropdown-toggle="dropdown-user">
                      <span className="sr-only">Open user menu</span>
                      <img className="w-8 h-8 rounded-full"
                           src={avatar}
                           alt="user photo"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="w-full">
          <Outlet/>
        </div>

        <aside id="logo-sidebar"
               className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
               aria-label="Sidebar">
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <a href="#"
                   className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2"
                          d="m4 12 8-8 8 8M6 10.5V19c0 .6.4 1 1 1h3v-3c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v3h3c.6 0 1-.4 1-1v-8.5"/>
                  </svg>
                  <span className="ms-3">Dashboard</span>
                </a>
              </li>
              <li>
                <a href="#"
                   className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.3L19 7H7.3"/>
                  </svg>
                  <span className="ms-3">Orders</span>
                </a>
              </li>
              <li>
                <a href="#"
                   className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2"
                          d="M17.8 14h0a7 7 0 1 0-11.5 0h0l.1.3.3.3L12 21l5.1-6.2.6-.7.1-.2Z"/>
                  </svg>
                  <span className="ms-3">Track</span>
                </a>
              </li>
              <li>
                <a href="#"
                   className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-2M8 9l4-5 4 5m1 8h0"/>
                  </svg>

                  <span className="ms-3">Upload Prescription</span>
                </a>
              </li>
              <li>
                <a href="#"
                   className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                          d="M12 2a7 7 0 0 0-7 7 3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1c.6 0 1-.4 1-1V9a5 5 0 1 1 10 0v7a3 3 0 0 1-3 3 2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v1c0 1.1.9 2 2 2h1a2 2 0 0 0 1.7-1h.4a5 5 0 0 0 4.8-4h.1a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3 7 7 0 0 0-7-7Zm1.5 3.3a4 4 0 0 0-4.4 1 1 1 0 0 0 1.4 1.3 2 2 0 0 1 2.9 0A1 1 0 1 0 14.8 6a4 4 0 0 0-1.3-.8Z"
                          clip-rule="evenodd"/>
                  </svg>

                  <span className="ms-3">Ask Doctor</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>

      </>
  );
}

export default App;
