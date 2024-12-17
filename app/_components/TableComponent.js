'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/app/_lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 

const TableComponent = () => {
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collapsedRows, setCollapsedRows] = useState([]); 
  const [sortOrder, setSortOrder] = useState({}); 
  const [originalData, setOriginalData] = useState([]); 
  const [user, setUser] = useState(null); 

  
  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    setUser(currentUser); 

    if (currentUser) {
      
      fetchTableData();
    } else {
      setLoading(false); 
    }
  }, []);

  
  const fetchTableData = async () => {
    try {
      const docRef = doc(db, 'tables', 'kIAYQt3YPBcCUS4KjjOd');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        
        const header = data.header ? JSON.parse(data.header) : [];
        const body = data.body ? JSON.parse(data.body) : [];
        const footer = data.footer ? JSON.parse(data.footer) : [];

        setTableData({ header, body, footer });
        setOriginalData(body); 
      } else {
        console.error('No such document found!');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) {
    return <p>Musisz się zalogować, aby zobaczyć tabelę.</p>; 
  }
  if (!tableData || !tableData.header || !tableData.body) {
    return <p>No data available to display.</p>;
  }

  
  const sortData = (columnIndex) => {
    const currentOrder = sortOrder[columnIndex] || 'default';

    let sortedData = [...tableData.body];

    if (currentOrder === 'asc') {
      sortedData.sort((a, b) => (a[columnIndex] < b[columnIndex] ? 1 : -1)); 
      setSortOrder({ ...sortOrder, [columnIndex]: 'desc' });
    } else if (currentOrder === 'desc') {
      sortedData = [...originalData]; 
      setSortOrder({ ...sortOrder, [columnIndex]: 'default' }); 
    } else {
      sortedData.sort((a, b) => (a[columnIndex] > b[columnIndex] ? 1 : -1)); 
      setSortOrder({ ...sortOrder, [columnIndex]: 'asc' });
    }

    setTableData((prevData) => ({ ...prevData, body: sortedData }));
  };

  
  const toggleCollapse = (rowIndex) => {
    setCollapsedRows((prev) =>
      prev.includes(rowIndex)
        ? prev.filter((index) => index !== rowIndex) 
        : [...prev, rowIndex] 
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Table</h2>
      <table className="table-auto border-collapse border border-gray-400 w-full">
        
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-400 px-4 py-2">
              <div className="flex items-center justify-between">
                Imię
                <div className="flex space-x-2">
                  <button
                    onClick={() => sortData(0)}
                    className="btn btn-xs btn-outline btn-info"
                  >
                    {sortOrder[0] === 'asc' ? '↑' : sortOrder[0] === 'desc' ? '↓' : '↕'}
                  </button>
                </div>
              </div>
            </th>
            <th className="border border-gray-400 px-4 py-2">
              <div className="flex items-center justify-between">
                Nazwisko
                <div className="flex space-x-2">
                  <button
                    onClick={() => sortData(1)}
                    className="btn btn-xs btn-outline btn-info"
                  >
                    {sortOrder[1] === 'asc' ? '↑' : sortOrder[1] === 'desc' ? '↓' : '↕'}
                  </button>
                </div>
              </div>
            </th>
            <th className="border border-gray-400 px-4 py-2">
              <div className="flex items-center justify-between">
                Telefon
                <div className="flex space-x-2">
                  <button
                    onClick={() => sortData(2)}
                    className="btn btn-xs btn-outline btn-info"
                  >
                    {sortOrder[2] === 'asc' ? '↑' : sortOrder[2] === 'desc' ? '↓' : '↕'}
                  </button>
                </div>
              </div>
            </th>
            <th className="border border-gray-400 px-4 py-2">
              <div className="flex items-center justify-between">
                Email
                <div className="flex space-x-2">
                  <button
                    onClick={() => sortData(3)}
                    className="btn btn-xs btn-outline btn-info"
                  >
                    {sortOrder[3] === 'asc' ? '↑' : sortOrder[3] === 'desc' ? '↓' : '↕'}
                  </button>
                </div>
              </div>
            </th>
          </tr>
        </thead>

        
        <tbody>
          {tableData.body.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-gray-400 px-4 py-2"
                  style={{ display: collapsedRows.includes(rowIndex) ? 'none' : 'table-cell' }}
                >
                  {cell}
                </td>
              ))}
              <td className="border border-gray-400 px-4 py-2 text-right">
                
                {collapsedRows.includes(rowIndex) ? (
                  <button
                    onClick={() => toggleCollapse(rowIndex)}
                    className="btn btn-xs btn-success"
                  >
                    Show
                  </button>
                ) : (
                  <button
                    onClick={() => toggleCollapse(rowIndex)}
                    className="btn btn-xs btn-warning"
                  >
                    Hide
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>

        
        <tfoot className="bg-gray-200">
          <tr>
            {tableData.footer.map((footerItem, index) => (
              <td key={index} className="border border-gray-400 px-4 py-2">
                {footerItem}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TableComponent;
