import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";
import Breadcrumb from "../components/FilArianne.component";
import Modal from "../components/Modal.component";
import { toast } from "react-toastify";
import TableList from "../components/TableList.component";
import { accountService } from "../services/account.service";

const Admin = () => {
  const navigate = useNavigate();
  const token = accountService.getToken() || null;
  const [user, setUser] = useState([]);
  const [logged, setLogged] = useState(accountService.isLogged());
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [formData, setFormData] = useState({});
  const [isModalForCreate, setIsModalForCreate] = useState(false);

  const items = [
    { label: "Home", path: "/" },
    { label: "Admin", path: "/admin" },
  ];

  useEffect(() => {
    if (logged) {
      axios({
        method: "GET",
        url: `http://localhost:3000/api/auth/${localStorage?.getItem('type')}/${token}`,
        responseType: "json",
      })
        .then((response) => {
          if (response.status === 200) {
            setUser(response.data);
            setLogged(true);
            if (!response.data.isAdmin) {
              navigate("/");
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

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

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this record?")) {
      axios
        .delete(`http://localhost:3000/api/tables/${selectedTable}/${id}`)
        .then(() => {
          toast.success("Enregistrement supprimé avec succès !");
          setRecords(records.filter((record) => record.id !== id));
          window.setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Erreur lors de la suppression de l'enregistrement !");
        });
    }
  };

  const handleEdit = (id, data) => {
    axios.put(`http://localhost:3000/api/tables/${selectedTable}/${id}`, data)
      .then((response) => {
        //console.log(response);
        toast.success("Enregistrement modifié avec succès !");
        window.setTimeout(() => {
          window.location.reload();
        }, 2000);
        setRecords(records.map((record) => (record.id === id ? data : record)));
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erreur lors de la modification de l'enregistrement !");
      });
  };

  const handleCreate = (data) => {
    axios
      .post(`http://localhost:3000/api/tables/${selectedTable}`, data)
      .then((response) => {
        // Add toast
        toast.success("Enregistrement créé avec succès !");
        window.setTimeout(() => {
          window.location.reload();
        }, 2000);
        setRecords([...records, response.data]);
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erreur lors de la création de l'enregistrement !");
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCreateClick = () => {
    setIsModalForCreate(true);
    setSelectedRecord(null);
    setModalData({});
    setFormData({});
    setShowModal(true);
  };

  const handleModalSubmit = () => {
    if (isModalForCreate) {
      handleCreate(formData);
    } else {
      handleEdit(Object.entries(selectedRecord)[0][1], formData);
    }
  };

  const handleRecordClick = (record) => {
    setIsModalForCreate(false);
    setSelectedRecord(record);
    setModalData(record);
    setFormData(record);
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Breadcrumb items={items} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-row items-center gap-4 justify-between mb-4">
          <div className="relative">
            <TableList tables={tables} selectedTable={selectedTable} setSelectedTable={setSelectedTable} />
          </div>
          {selectedTable && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 sm:mt-0 sm:ml-4"
              onClick={handleCreateClick}
            >
              <FaPlusCircle className="inline-block mr-2" />
              Create
            </button>
          )}  
        </div>
        {records.length > 0 && (
          <div className="overflow-x-scroll">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  {Object.keys(records[0]).map((key) => (
                    <th key={key} className="px-4 py-2 text-left">
                      {key}
                    </th>
                  ))}
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id} className="border-t hover:bg-gray-100">
                    {Object.keys(record).map((key) => (
                      <td key={key} className="px-4 py-2">
                        {record[key]}
                      </td>
                    ))}
                    <td className="flex justify-center items-center gap-2 px-4 py-4 ">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleRecordClick(record)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(Object.entries(record)[0][1])}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showModal && (
          <Modal
            isGrid={true}
            title={`Create ${selectedTable}`}
            closeModal={closeModal}
            onSubmit={handleModalSubmit}
          >
            {Object?.keys(records[0]).map((key) => {
              return (
                <div key={key} className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor={key}
                  >
                    {key}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={key}
                    name={key}
                    type="text"
                    value={formData[key] || ""}
                    onChange={handleFormChange}
                  />
                </div>

              );
            })}
            <div className={`flex flex-row ${Object.keys(records[0]).length % 2 === 0 ? 'justify-start' : 'justify-center'} items-center gap-2`}>
              {isModalForCreate ? (
                <button
                  onClick={() => handleCreate(formData)}
                  className="bg-blue-500 px-4 py-2 rounded-lg font-bold text-white">Créer</button>
              ) : (
                <button
                  onClick={() => handleEdit(Object.entries(selectedRecord)[0][1], formData)}
                  className="bg-bleugris px-4 py-2 rounded-lg font-bold text-white">Modifier</button>
              )}
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 rounded-lg text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                onClick={() => setShowModal(false)}
              >
                Annuler
              </button>
            </div>

          </Modal>
        )}
      </div>
    </>
  );
};

export default Admin;