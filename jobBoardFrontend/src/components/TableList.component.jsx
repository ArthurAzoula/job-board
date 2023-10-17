import { useState } from 'react';

const TableList = ({ tables, selectedTable, setSelectedTable }) => {
    const handleTableClick = (table) => {
        setSelectedTable(table);
    };

    return (
        <div className="flex flex-wrap">
            {tables.map((table) => (
                <div
                    key={table}
                    className={`p-4 cursor-pointer ${selectedTable === table ? 'bg-gray-200 font-bold' : 'bg-gray-100'} hover:bg-gray-200`}
                    onClick={() => handleTableClick(table)}
                >
                    {table}
                </div>
            ))}
        </div>
    );
};

export default TableList;