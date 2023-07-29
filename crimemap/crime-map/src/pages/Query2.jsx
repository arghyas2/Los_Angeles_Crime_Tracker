import React, { useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'

export const Query2 = () => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState('');
  useEffect(() => {
    const fetchquery = async() => {
      try {
        const response = await fetch(
          'http://127.0.0.1:5000/get/query2',
          {
            method: 'GET'
          }
        );
        const json = await response.json();
        if(response.ok){
          const { data } = json;
          setData(data);
          setLoaded(true);
        } else {
          throw response.status
        }
      } catch (error) {
        console.error(error);
        setErr(error);
      }
    };
    fetchquery();
    console.log(typeof data)
  }, []);

  if(loaded) {
    return (
      <table border={1}>
        <tr>
          <th>Area_Name</th>
          <th>Crime_Percentage</th>
          <th>Total_Crimes</th>
          <th>Victim_Descent</th>
        </tr>
        {data.map(data => (
          <tr key={data.Area_Name + data.Crime_Percentage + data.Total_Crimes + data.Victim_Descent}>
            <td>{data.Area_Name}</td>
            <td>{data.Crime_Percentage}</td>
            <td>{data.Total_Crimes}</td>
            <td>{data.Victim_Descent}</td>
          </tr>
        ))}
      </table>
    )
  }
  if (err != ''){
    return (
      <div>{err}</div>
    )
  }

}
