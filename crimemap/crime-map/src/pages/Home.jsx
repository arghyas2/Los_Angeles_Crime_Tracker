import React, { useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import { Map } from '../components/Map';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSearchParams } from 'react-router-dom';
import Srch from '../components/Srch';
import { useNavigate } from 'react-router-dom';
import { createSearchParams } from 'react-router-dom';

export const Home = () => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState('');
  const[searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('crime') || '';
  const [latLong, setLatLong] = useState([])
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function setll(ll) {
    setLatLong(ll)
    handleShow()
  }
  const handleChange = (e) => {
    setSearch(e.target.value);
  }
  const navigation = useNavigate()
  const handleClick = (e) => {
    const pathname = '/'
    const params = {crime: search}
    navigation(`${pathname}?${createSearchParams(params)}`);
  }
  useEffect(() => {
    const fetchquery = async() => {
      try {
        const response = await fetch(
          'http://127.0.0.1:5000/get/inc_crime?crime=' + searchTerm,
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
      <br />

      <h3>Click On Map to Add New Incident</h3>
      <br />

      <Form>
        <Form.Group className="mb-3" controlId="searchBar">
          <Form.Control type="text" placeholder="crime" name="crime"/>
        </Form.Group>
        <Button variant="primary" type="Search" onClick={handleClick}>
          Search
        </Button>
      </Form>
      <br />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Incident</Modal.Title>
        </Modal.Header>
        <Srch latLong={latLong}></Srch>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Map data = {data} setll={setll}>
      </Map>
      </div>
    )
  }
  if (err != ''){
    return (
      <div>{err}</div>
    )
  }

}
