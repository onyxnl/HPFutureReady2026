import React, { useState,useEffect } from 'react';
import axios from "axios";
import {Container ,Button, Col, Form,InputGroup,Row} from 'react-bootstrap';
import Select, { components } from "react-select";
import { useNavigate,useLocation,useOutletContext,Link} from 'react-router-dom';
import { useForm,Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import flighticon from '../assets/images/airline/flight.svg';
import { getUrl } from "../utils";

function Flight() {
   const { email } = useOutletContext(); // automatically gets email from Home.jsx
   //console.log("Register1 email:", email);
   
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState(null);
    const [roundtrips, setFlight] = useState(null);


    const toggle = (index) => {
        setOpenIndex(prev => (prev === index ? null : index)); // open/close behavior
    };


    const url = getUrl("assets/json/google_flight.json");
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setFlight(data.roundtrips));
        }, []);


  const {
    register,
    handleSubmit,
    setValue, // to reset value - setValue(name, newValue)
    watch,
    formState: { errors },
    } = useForm({
       // resolver: yupResolver(schema),
        defaultValues:{
           
       }
  });
    

    const onSubmit = (data) => {
        console.log("Form submitted:", data);
        
        navigate('/register4')
    };


  return (
    <div className='flight-content landing-page'>
        <Container>
            <Row>
                <Col lg={12} className="logindiv">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="register-form bg-periwinkle registerpage1">
                            <div className="loginform">
                                <Row className='regtitle'>
                                    <Col md={12}>
                                        <h2 className="fw-bold">Flight Booking</h2>
                                        <div className="intro">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </div>
                                        <div className="subtitle">Singapore <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" className="Auu9lc NMm5M hhikbc"><path d="M17 4l-1.41 1.41L18.17 8H11v2h7.17l-2.58 2.59L17 14l5-5-5-5zM7 20l1.41-1.41L5.83 16H13v-2H5.83l2.58-2.59L7 10l-5 5 5 5z"></path></svg> Seoul <span><Link to="/register2#modifydate" className="modifydatestyle">Modify flight dates</Link></span></div>
                                        <div className="flightdate">Mon 20 Apr—Fri 24 Apr</div>
                                        <div className="flight_details">
                                            <ul>
                                                <li>Round trip</li>
                                                <li>Economy</li>
                                                <li className="d-flex"><svg width="20" height="20" viewBox="0 0 24 24" focusable="false" className="b6yMgc DWE1s NMm5M"><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 9c2.7 0 5.8 1.29 6 2v1H6v-.99c.2-.72 3.3-2.01 6-2.01m0-11C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path></svg> 1 passenger</li>
                                            </ul>
                                        </div>
                                        <div className="arrival-flight-group">
                                            {roundtrips && roundtrips.map((trip) => (
                                                <div className="group" key={trip.id}>
                                                    <input type="radio" name="selectflight" />

                                                    <div className="flightinfo_wrapper">

                                                    {/* Depart Section */}
                                                    <div className="flightinfo">
                                                        <div className="card">
                                                        <div className="flight-header">
                                                            <div className="direction-status">
                                                            Depart <span>{trip.depart.date}</span>
                                                            </div>
                                                            <div>{trip.depart.duration}</div>
                                                        </div>

                                                        <div className="flight-segment">
                                                            <div className="header">
                                                            <img
                                                            src={getUrl(trip.depart.airline)}
                                                            className="img-fluid airline-logo"
                                                            alt="" />
                                                            <span className="flight-name">{trip.depart.airlinename}</span>
                                                            <span className="flight-no">{trip.depart.flight}</span>
                                                            <span className="aircraft">{trip.depart.aircraft}</span>
                                                            </div>

                                                            <div className="flybox">
                                                            <div className="flyfrom">
                                                                <div className="time">{trip.depart.from.time}</div>
                                                                <div className="location">{trip.depart.from.code}</div>
                                                                <div className="airportname">{trip.depart.from.airport}</div>
                                                            </div>

                                                            <div className="duration">
                                                                <div className="flightduration">{trip.depart.duration}</div>
                                                                <div className="line"></div>
                                                                <div className="stops">Direct</div>
                                                            </div>

                                                            <div className="flyto">
                                                                <div className="time">{trip.depart.to.time}</div>
                                                                <div className="location">{trip.depart.to.code}</div>
                                                                <div className="airportname">{trip.depart.to.airport}</div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>

                                                    {/* Return Section */}
                                                    <div className="flightinfo">
                                                        <div className="card">
                                                        <div className="flight-header">
                                                            <div className="direction-status">
                                                            Return <span>{trip.return.date}</span>
                                                            </div>
                                                            <div>{trip.return.duration}</div>
                                                        </div>

                                                        <div className="flight-segment">
                                                            <div className="header">
                                                            <img src={getUrl(trip.depart.airline)} className="img-fluid airline-logo" alt="" />
                                                            <span className="flight-name">{trip.return.airlinename}</span>
                                                            <span className="flight-no">{trip.return.flight}</span>
                                                            <span className="aircraft">{trip.return.aircraft}</span>
                                                            </div>

                                                            <div className="flybox">
                                                            <div className="flyfrom">
                                                                <div className="time">{trip.return.from.time}</div>
                                                                <div className="location">{trip.return.from.code}</div>
                                                                <div className="airportname">{trip.return.from.airport}</div>
                                                            </div>

                                                            <div className="duration">
                                                                <div className="flightduration">{trip.return.duration}</div>
                                                                <div className="line"></div>
                                                                <div className="stops">Direct</div>
                                                            </div>

                                                            <div className="flyto">
                                                                <div className="time">{trip.return.to.time}</div>
                                                                <div className="location">{trip.return.to.code}</div>
                                                                <div className="airportname">
                                                                {trip.return.to.airport}
                                                                {trip.return.to.arrival_day && (
                                                                    <div className="addition-message">
                                                                    Arrives {trip.return.to.arrival_day}
                                                                    </div>
                                                                )}
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>

                                                        </div>
                                                    </div>

                                                    </div>
                                                </div>
                                                ))}

                                        </div>
                                    </Col>
                                </Row>
                                <Row className='field mt-5'>
                                    <Col md={12}>
                                        <div className='d-flex justify-content-between'>
                                            <Link to="/register2" className="back-btn">Back</Link>
                                            <button type="submit" className="outline-btn">Save & exit</button>
                                            <button type="submit" className="primary-btn">Next</button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>                  
                    </Form>
                </Col>

            </Row>
        </Container>
      
    </div>
    
  );
}

export default Flight;
