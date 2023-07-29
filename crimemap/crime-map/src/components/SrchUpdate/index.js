import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createSearchParams, useNavigate } from "react-router-dom";

const SrchUpdate = (props) => {
  const [val, setVal] = useState('')
  const [values, setValues] = useState({
    DR_Number: props.mark.DR_Number,
    Premise_Code: props.mark.Premise_Code,
    Area_Number: props.mark.Area_Number,
    Weapon_Code: props.mark.Weapon_Code,
    Date_Occured: props.mark.Date_Occured,
    Victim_Sex: props.mark.Victim_Sex,
    Victim_Descent: props.mark.Victim_Descent,
    Victim_Age: props.mark.Date_Reported,
    Date_Reported: props.mark.Date_Reported,
    Crime_Code: props.mark.Crime_Code,
    Latitude: props.mark.Latitude,
    Longitude: props.mark.Longitude,
  })
  useEffect (() => {
    setValues({
      ...values,
      DR_Number: props.mark.DR_Number,
      Premise_Code: props.mark.Premise_Code,
      Area_Number: props.mark.Area_Number,
      Weapon_Code: props.mark.Weapon_Code,
      Date_Occured: props.mark.Date_Occured,
      Victim_Sex: props.mark.Victim_Sex,
      Victim_Descent: props.mark.Victim_Descent,
      Victim_Age: props.mark.Date_Reported,
      Date_Reported: props.mark.Date_Reported,
      Crime_Code: props.mark.Crime_Code,
      Latitude: props.mark.Latitude,
      Longitude: props.mark.Longitude,
    });
  }, [props.mark])

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
      'http://127.0.0.1:5000/put/incidents/' + props.mark.DR_Number,
      {
        method: 'PUT',
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
      <Form.Group className="mb-3" controlId="searchBar">
        <Form.Label>DR_Number</Form.Label>
        <br></br>
        <Form.Label>{props.mark.DR_Number}</Form.Label>
        <br></br>
        <Form.Label>Premise_Code</Form.Label>
        <Form.Control type="number" defaultValue={props.mark.Premise_Code} name="Premise_Code" max='999' onChange={handleChange}/>
        <Form.Label>Area_Number</Form.Label>
        <Form.Control type="number" defaultValue={props.mark.Area_Number} name="Area_Number" max='999' onChange={handleChange}/>
        <Form.Label>Weapon_Code</Form.Label>
        <Form.Control type="number" defaultValue={props.mark.Weapon_Code} name="Weapon_Code" max='999' onChange={handleChange}/>
        <Form.Label>Date_Occured</Form.Label>
        <Form.Control type="text" defaultValue={props.mark.Date_Occured} name="Date_Occured" onChange={handleChange}/>
        <Form.Label>Victim_Sex</Form.Label>
        <Form.Control type="text" defaultValue={props.mark.Victim_Sex} name="Victim_Sex" maxLength={1} onChange={handleChange}/>
        <Form.Label>Victim_Descent</Form.Label>
        <Form.Control type="text" defaultValue={props.mark.Victim_Descent} name="Victim_Descent" maxLength={1} onChange={handleChange}/>
        <Form.Label>Victim_Age</Form.Label>
        <Form.Control type="number" defaultValue={props.mark.Victim_Age} name="Victim_Age" max="999" onChange={handleChange}/>
        <Form.Label>Date_Reported</Form.Label>
        <Form.Control type="text" defaultValue={props.mark.Date_Reported} name="Date_Reported" onChange={handleChange}/>
        <Form.Label>Crime_Code</Form.Label>
        <Form.Control type="number" defaultValue={props.mark.Crime_Code} name="Crime_Code"  max='999' maxLength={3} onChange={handleChange}/>
      </Form.Group>
      <Button variant="primary" type="Search" onClick={handleSubmit}>
        Update
      </Button>
    </Form>
  )
}

export default SrchUpdate