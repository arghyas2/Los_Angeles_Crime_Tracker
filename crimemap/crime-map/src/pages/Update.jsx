import React, { useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import Modal from 'react-bootstrap/Modal'
import { MapUpdate } from '../components/MapUpdate';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSearchParams } from 'react-router-dom';
import SrchUpdate from '../components/SrchUpdate';
export const Update = () => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState('');
  const[searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('id') || '';
  const [mark, setMark] = useState({})
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function setM(ll) {
    setMark(ll)
    handleShow()
  }
  useEffect(() => {
    const fetchquery = async() => {
      try {
        const response = await fetch(
          'http://127.0.0.1:5000/get/incidents?id=' + searchTerm,
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
  }, []);
  if(loaded) {
    return (
      <div>
        {/* <SrchUpdate mark={mark}></SrchUpdate> */}
        <br></br>
        <h3>Click on an Incident to Update</h3>
        <br></br>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Incident</Modal.Title>
          </Modal.Header>
          <SrchUpdate mark={mark}></SrchUpdate>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <MapUpdate data = {data} setM={setM}>
        </MapUpdate>
      </div>
    )
  }
  if (err != ''){
    return (
      <div>{err}</div>
    )
  }

}
