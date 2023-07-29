import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createSearchParams, useNavigate } from "react-router-dom";

const Srch = (props) => {
  const [val, setVal] = useState('')
  const [values, setValues] = useState({
    DR_Number: null,
    Premise_Code: null,
    Area_Number: null,
    Weapon_Code: null,
    Date_Occured: null,
    Victim_Sex: null,
    Victim_Descent: null,
    Victim_Age: null,
    Date_Reported: null,
    Crime_Code: null,
    Latitude: null,
    Longitude: null,
    Crime_Code_Description: null,
  })
  useEffect (() => {
    setValues({
      ...values,
      Latitude: props.latLong.lat,
      Longitude: props.latLong.lng,
    });
  }, [props.latLong])

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value) {
      setValues({
        ...values,
        [name]: value,
      });
    } else {
      setValues({
        ...values,
        [name]: null,
      });
    }
  }
  let navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    const dataDict = {}
    dataDict.data = values
    const response = await fetch(
      'http://127.0.0.1:5000/post/incidents',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify(dataDict)
      }
    )
    if(response) {
      return null;
    }
  }
  return (
    <Form>
      {/* <text>{props.latLong.lat}</text>
      <text>{props.latLong.lng}</text> */}
      <Form.Group className="mb-3" controlId="searchBar">
        <Form.Control type="number" placeholder="DR_Number" name="DR_Number" max='999999999' onChange={handleChange}/>
        <Form.Control type="number" placeholder="Premise_Code" name="Premise_Code" max='999' onChange={handleChange}/>
        <Form.Control type="number" placeholder="Area_Number" name="Area_Number" max='99' onChange={handleChange}/>
        <Form.Control type="number" placeholder="Weapon_Code" name="Weapon_Code" max='999' onChange={handleChange}/>
        <Form.Control type="text" placeholder="Date_Occured" name="Date_Occured" onChange={handleChange}/>
        <Form.Control type="text" placeholder="Victim_Sex" name="Victim_Sex" maxLength={1} onChange={handleChange}/>
        <Form.Control type="text" placeholder="Victim_Descent" name="Victim_Descent" maxLength={1} onChange={handleChange}/>
        <Form.Control type="number" placeholder="Victim_Age" name="Victim_Age" max="999" onChange={handleChange}/>
        <Form.Control type="text" placeholder="Date_Reported" name="Date_Reported" onChange={handleChange}/>
        <Form.Control type="number" placeholder="Crime_Code" name="Crime_Code"  max='999' maxLength={3} onChange={handleChange}/>
        <Form.Label alignItems='center'>If New Crime Type Write Description</Form.Label>
        <Form.Control type="text" placeholder="Crime_Code_Description" name="Crime_Code_Description" onChange={handleChange}/>
      </Form.Group>
      <Button variant="primary" type="Search" onClick={handleSubmit}>
        Add
      </Button>
    </Form>
  )
}

export default Srch