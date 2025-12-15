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
                        <div className="register-form w-902 registerpage1">
                            
                            <div className="loginform">
                                <Row>
                                    <Col md={12}>
                                        <h3 className="res_subtitle mb-0">Flight options</h3>
                                        <p >Flight options shown are indicative only at this point. Actual availability will only be confirmed at time of booking.</p>
                                        
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} lg={9}>
                                        <div className="d-flex justify-content-between align-items-center tripinfo pt-3">
                                            <div className='triplocation'>
                                            Singapore&nbsp;&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="18" height="14.914" viewBox="0 0 18 14.914">
                                            <g id="Group_1" data-name="Group 1" transform="translate(-337.5 -208.69)">
                                                <path id="Path_1" data-name="Path 1" d="M240.655,100.9h17l-4.328-4.5" transform="translate(97.345 113)" fill="none" stroke="#707070" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                                                <path id="Path_2" data-name="Path 2" d="M257.655,97.4h-17l4.328,4.5" transform="translate(97.345 121)" fill="none" stroke="#707070" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                                            </g>
                                            </svg>&nbsp;&nbsp;Seoul </div>
                                            <Link to="/register2#modifydate" className="modifydatestyle">Modify flight dates</Link>
                                        </div>
                                        <div className="flightdate"></div>
                                        <div className="flight_details">
                                            <ul>
                                                <li>Mon 20 Apr—Fri 24 Apr</li>
                                                <li>Round trip</li>
                                                <li>Economy</li>
                                                <li>1 passenger</li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <div className="arrival-flight-group">
                                            {roundtrips && roundtrips.map((trip) => (
                                                <div className="group" key={trip.id}>
                                                    <input type="radio" name="selectflight" id={`select-${trip.id}`}  />
                                                    <span className="customradio" htmlFor={`select-${trip.id}`}>Select</span><br/>
                                                    
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
                                        <div className='d-flex justify-content-end'>
                                            <div>
                                                <Link to="/register2" className="back-btn">Cancel</Link>
                                                <button type="submit" className="primary-btn">Confirm</button></div>
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
