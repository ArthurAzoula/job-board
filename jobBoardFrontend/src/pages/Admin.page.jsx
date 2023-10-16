import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [records, setRecords] = useState([]);

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
    <div className="flex mx-8 my-8">
      {/* Left Column - Tables */}
      <div className="w-1/4 min-h-screen bg-gray-100 p-4">
        <h2 className="text-lg font-bold mb-4">Tables</h2>
        <ul className="list-none p-0">
          {tables.map((table) => (
            <li
              key={table}
              className={`mb-2 cursor-pointer border p-2 ${selectedTable === table ? "font-bold text-center text-2xl" : ""}`}
              onClick={() => handleTableClick(table)}
            >
              {table}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Column - Records */}
      <div className="w-3/4 my-2 mx-2">
        {selectedTable && records.length > 0 ? (
          <div className="flex flex-col gap-4">
            {records.map((record) => (
              <div key={record.id} className="bg-gray-200 rounded-lg shadow-md overflow-hidden">
                <div className="p-4 flex justify-between gap-4 border-b-2 border-bleugris overflow-x-auto">
                  {Object.keys(record).map((key) => (
                    <div key={key} className="mb-2 flex flex-col">
                      <span className="font-bold text-gray-700 uppercase bg-grisclair">{key}:</span>
                      <span className="text-gray-600">{record[key]}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 flex gap-2">
                  <button className="bg-bleugris hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
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
  );
}

export default Admin;
