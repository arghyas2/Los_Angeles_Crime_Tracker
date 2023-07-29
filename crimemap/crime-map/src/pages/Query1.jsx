import React, { useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'

export const Query1 = () => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState('');
  useEffect(() => {
    const fetchquery = async() => {
      try {
        const response = await fetch(
          'http://127.0.0.1:5000/get/query1',
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
  // const columns = [
  //   {
  //     datafield: 'Area_Name',
  //     text: 'Area_Name'
  //   },
  //   {
  //     datafield: 'Average_Age',
  //     text: 'Average_Age'
  //   },
  //   {
  //     datafield: 'Incident_Count',
  //     text: 'Incident_Count'
  //   },

  // ]

  if(loaded) {
    return (
      <table border={1}>
        <tr>
          <th>Area_Name</th>
          <th>Average_Age</th>
          <th>Incident_Count</th>
        </tr>
        {data.map(data => (
          <tr key={data.Area_Name + data.Average_Age + data.Incident_Count}>
            <td>{data.Area_Name}</td>
            <td>{data.Average_Age}</td>
            <td>{data.Incident_Count}</td>
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
