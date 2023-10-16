import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";
import Breadcrumb from '../components/FilArianne.component';

const Admin = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [records, setRecords] = useState([]);

  const items = [
    { label: 'Home', path: '/' },
    { label: "Admin", path: '/admin' } 
  ]

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/tables")
      .then((response) => {
        setTables(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedTable) {
      axios
        .get(`http://localhost:3000/api/tables/${selectedTable}`)
        .then((response) => {
          setRecords(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedTable]);

  const handleTableClick = (table) => {
    setSelectedTable(table);
  };

  return (
    <>
      <Breadcrumb items={items} />
      <div className="flex flex-col mx-8 my-8">
        {/* Left Column - Tables */}
        <div className="">
          <ul className="flex flex-row bg-gunmetal text-white justify-around rounded w-full list-none p-0">
            {tables.map((table) => (
              <li
                key={table}
                className={`mb-2 mt-2 cursor-pointer text-2xl p-2 ${selectedTable === table ? "bg-gray-100 transition-colors duration-300 rounded text-gunmetal font-bold text-center text-2xl border-2 border-gunmetal" : "hover:bg-gray-100 hover:border-2 hover:text-gunmetal hover:font-bold hover:rounded transition-colors duration-300"}`}
                onClick={() => handleTableClick(table)}
              >
                {table}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column - Records */}
        <div className="w-full my-2">
          <button className="bg-green-500 hover:bg-green-600 duration-200 text-white w-full p-1 uppercase font-bold mb-4 rounded focus:outline-none focus:shadow-outline">
            <div className="flex justify-center items-center">
              <FaPlusCircle />
              <span className="ml-2">Ajouter une ligne</span>
            </div>
          </button>
          {selectedTable && records.length > 0 ? (
            <div className="flex flex-col gap-4">
              {records.map((record) => (
                <div key={record.id} className="bg-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out">
                  <div className="p-4 flex justify-between gap-4 border-b-2 border-bleugris overflow-x-auto">
                    {Object.keys(record).map((key) => (
                      <div key={key} className="mb-2 flex flex-col">
                        <span className="font-bold text-gray-700 uppercase bg-grisclair">{key}:</span>
                        <span className="text-gray-600">{record[key]}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 flex gap-2">
                    <button className="bg-bleugris hover:bg-gray-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">Edit</button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {selectedTable && records.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              No records found for {selectedTable}.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
      
export default Admin;
