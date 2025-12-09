import React, { useState,useEffect } from 'react';
import axios from "axios";
import {Container ,Button, Col, Form,InputGroup,Row} from 'react-bootstrap';
import Select, { components } from "react-select";
import { useNavigate,useLocation,useOutletContext} from 'react-router-dom';
import { useForm,Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from 'react-date-picker';
import moment from 'moment';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import flighticon from '../assets/images/airline/flight.svg'
import SQicon from '../assets/images/airline/SQ.png';
import KRicon from '../assets/images/airline/KE_v4.png'; 
// import { Last } from 'react-bootstrap/esm/PageItem';


function Register3() {
   const { email } = useOutletContext(); // automatically gets email from Home.jsx
   //console.log("Register1 email:", email);
    const navigate = useNavigate();
//    const [isOther,setIsOther] = useState(false);
//    const [isBusinessCatOther,setIsBusinessCatOther] = useState(false);


    const schema = yup.object({
        visa:yup.string().required("Required field"),
        country:yup.string()
                    .nullable()
                    .when('visa', {
                    is: 'Yes', 
                    then: (schema) => schema
                        .required("Required field"),
                        otherwise: (schema) => schema.nullable(),
                    }),
        nationality :yup.string()
                    .nullable()
                    .when('visa', {
                    is: 'Yes', 
                    then: (schema) => schema
                        .required("Required field"),
                        otherwise: (schema) => schema.nullable(),
                    }),
        dob: yup.date()
                .nullable()
                .typeError('Date is required')
                .when('visa', {
                is: 'Yes', 
                then: (schema) => schema
                    .required("Required field"),
                    otherwise: (schema) => schema.nullable(),
                }),
        passportno:yup.string()
                    .nullable()
                    .when('visa', {
                        is: 'Yes', 
                        then: (schema) => schema
                            .required("Required field"),
                            otherwise: (schema) => schema.nullable(),
                    }),
        placeofissue:yup.string()
                    .nullable()
                    .when('visa', {
                    is: 'Yes', 
                    then: (schema) => schema
                        .required("Required field"),
                        otherwise: (schema) => schema.nullable(),
                    }),
        dateofissue: yup.date()
                .nullable()
                .typeError('Date is required')
                .when('visa', {
                    is: 'Yes', 
                    then: (schema) => schema
                        .required("Required field"),
                        otherwise: (schema) => schema.nullable(),
                }),
        expirydate: yup.date()
                .nullable()
                .typeError('Date is required')
                .when('visa', {
                    is: 'Yes', 
                    then: (schema) => schema
                        .required("Required field"),
                        otherwise: (schema) => schema.nullable(),
                }),
        arrivaldate: yup.date()
                .nullable()
                .typeError('Date is required')
                .when('visa', {
                    is: 'Yes', 
                    then: (schema) => schema
                        .required("Required field"),
                        otherwise: (schema) => schema.nullable(),
                }),
        departuredate: yup.date()
                .nullable()
                .typeError('Date is required')
                .when('visa', {
                    is: 'Yes', 
                    then: (schema) => schema
                        .required("Required field"),
                        otherwise: (schema) => schema.nullable(),
                }),
        visacountry:yup.string()
                    .nullable()
                    .when('visa', {
                    is: 'Yes', 
                    then: (schema) => schema
                        .required("Required field"),
                        otherwise: (schema) => schema.nullable(),
                    }),
        visacity:yup.string()
                    .nullable()
                    .when('visa', {
                    is: 'Yes', 
                    then: (schema) => schema
                        .required("Required field"),
                        otherwise: (schema) => schema.nullable(),
                    })
    })
  const {
    register,
    handleSubmit,
    control,
    setValue, // to reset value - setValue(name, newValue)
    watch,
    formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues:{
            visa: "",
            country: "",
            nationality: "",
            dob:"",
            passportno:"",
            placeofissue:"",
            dateofissue:"",
            expirydate:"",
            arrivaldate:"",
            departuredate:"",
            visacountry:"",
            visacity:"",
       }
  });
  
    const countryOption =[
        {label : 'Singapore', value:'Singapore'},
        {label : 'Malaysia', value:'Malaysia'},
    ]

    const visaVal =  watch("visa");
    const visachecked = visaVal === 'Yes';

    useEffect(() => {
       if (visaVal !== "Yes") {  // reset form
            setValue("country", null); 
            setValue("nationality", null); 
            setValue("dob", null); 
            setValue("passportno", null); 
            setValue("placeofissue", null); 
            setValue("dateofissue", null); 
            setValue("expirydate", null); 
            setValue("arrivaldate", null); 
            setValue("departuredate", null); 
            setValue("visacountry", null); 
            setValue("visacity", null); 

        }
    }, [visaVal, setValue]);  

    const onSubmit = (data) => {
        console.log("Form submitted:", data);
        
        navigate('/summary')
    };


  return (
    <div classNameName='flight-content'>
      <Container>
        <Row>
          <Col lg={12} classNameName="logindiv">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="fw-bold">Flight Booking</h2>
                <div className="intro">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </div>
                <div className="subtitle">Singapore <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" className="Auu9lc NMm5M hhikbc"><path d="M17 4l-1.41 1.41L18.17 8H11v2h7.17l-2.58 2.59L17 14l5-5-5-5zM7 20l1.41-1.41L5.83 16H13v-2H5.83l2.58-2.59L7 10l-5 5 5 5z"></path></svg> Seoul</div>
                <div className="flightdate">Mon 20 Apr—Fri 24 Apr</div>
                <div className="flight_details">
                    <ul>
                        <li>Round trip</li>
                        <li>Economy</li>
                        <li className="d-flex"><svg width="20" height="20" viewBox="0 0 24 24" focusable="false" className="b6yMgc DWE1s NMm5M"><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 9c2.7 0 5.8 1.29 6 2v1H6v-.99c.2-.72 3.3-2.01 6-2.01m0-11C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path></svg> 1 passenger</li>
                    </ul>
                </div>
                <div className="arrival-flight-group-accordion">
                    <div className="group">
                        <input type="radio" name='selectflight' /> 
                        <div className="flightinfo_wrapper">
                            <div className="flightinfo">
                                <div className="upper">
                                    <div className="airlinlogo">
                                        <img src={SQicon} className="img-fluid" alt="airline-logo" height=""/>
                                    </div>
                                    <div className="flybox">
                                        <div className="flyfrom">
                                            <div className="time" id="fromtime">02:25</div>
                                            <div className="location" id="fromlocation">SIN</div>
                                        </div>
                                        <div className="duration">
                                            <div className="flightduration" id="flightduration">6h 25m</div>
                                            <div className="line"></div>
                                            <div className="stops" id="stops">Direct</div>
                                        </div>
                                        <div className="flyto">
                                            <div className="time" id="totime">09:50</div>
                                            <div className="location">ICN</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flightinfo">
                                <div className="upper">
                                    <div className="airlinlogo">
                                        <img src={SQicon} className="img-fluid" alt="airline-logo" height=""/>
                                    </div>
                                    <div className="flybox">
                                        <div className="flyfrom">
                                            <div className="time" id="fromtime">09:00</div>
                                            <div className="location" id="fromlocation">ICN</div>
                                        </div>
                                        <div className="duration">
                                            <div className="flightduration" id="flightduration">6h 20m</div>
                                            <div className="line"></div>
                                            <div className="stops" id="stops">Direct</div>
                                        </div>
                                        <div className="flyto">
                                            <div className="time" id="totime">02:20</div>
                                            <div className="location">SIN</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="expandable arrow" data-target="#details1"></div>
                            <div className="expandable-wrapper" id="details1">
                                <div className="departure">
                                    <div className="card">
                                        <div className="flight-header">
                                            <div className="direction-status">Depart  <span>Mon, 20 Apr</span></div>
                                            <div>6h 25m</div>
                                        </div>
                                        <div className="flight-segment">
                                            <div className="header">
                                                <img src={SQicon} className="airline-logo" alt="" />
                                                <span className="flight-number">Singapore Airlines</span>
                                                <span className="aircraft">SQ 608</span>
                                                <span className="aircraft">Airbus A325</span>
                                            </div>
                                            <div className="flight-content">
                                                <div className="timeline">
                                                    <span className="dot"></span>
                                                    <span className="line"></span>
                                                    <span className="plane-icon"><img src={{flighticon}} /></span>
                                                    <span className="line"></span>
                                                    <span className="dot"></span>
                                                </div>
                                                <div className="schedule">
                                                    <div className="direction">
                                                        <div className="time">02:25</div>
                                                        <div className="location">Singapore Changi (SIN)</div>
                                                    </div>
                                                    <div className="duration">6h 25m</div>
                                                    <div className="direction">
                                                        <div className="time">09:50</div>
                                                        <div className="location">Incheon Intl (ICN)</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="return">
                                    <div className="card">
                                        <div className="flight-header">
                                            <div className="direction-status">Return  <span>Fri, 24 Apr</span></div>
                                            <div>6h 20m</div>
                                        </div>
                                        <div className="flight-segment">
                                            <div className="header">
                                                <img src={SQicon} className="airline-logo" alt="" />
                                                <span className="flight-number">Singapore Airlines </span>
                                                <span className="aircraft">SQ 607</span>
                                                <span className="aircraft">Airbus A350</span>
                                            </div>
                                            <div className="flight-content">
                                                <div className="timeline">
                                                    <span className="dot"></span>
                                                    <span className="line"></span>
                                                    <span className="plane-icon"><img src={flighticon} /></span>
                                                    <span className="line"></span>
                                                    <span className="dot"></span>
                                                </div>
                                                <div className="schedule">
                                                    <div className="direction">
                                                        <div className="time">09:00</div>
                                                        <div className="location">Incheon Intl (ICN)</div>
                                                    </div>
                                                    <div className="duration">6h 20m</div>
                                                    <div className="direction">
                                                        <div className="time">02:20</div>
                                                        <div className="location">Singapore Changi (SIN)</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="arrival-flight-group-accordion">
                    <div className="group">
                        <input type="radio" name='selectflight'/>
                        <div className="flightinfo_wrapper">                                        
                            <div className="flightinfo">
                                <div className="upper">
                                    <div className="airlinlogo">
                                        <img src="{KRicon}" className="img-fluid" alt="airline-logo" height=""/>
                                    </div>
                                    <div className="flybox">
                                        <div className="flyfrom">
                                            <div className="time" id="fromtime">07:30</div>
                                            <div className="location" id="fromlocation">SIN</div>
                                        </div>
                                        <div className="duration">
                                            <div className="flightduration" id="flightduration">6h 30m</div>
                                            <div className="line"></div>
                                            <div className="stops" id="stops">Direct</div>
                                        </div>
                                        <div className="flyto">
                                            <div className="time" id="totime">15:00</div>
                                            <div className="location">ICN</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flightinfo">
                                <div className="upper">
                                    <div className="airlinlogo">
                                        <img src={KRicon} className="img-fluid" alt="airline-logo" height=""/>
                                    </div>
                                    <div className="flybox">
                                        <div className="flyfrom">
                                            <div className="time" id="fromtime">23:35</div>
                                            <div className="location" id="fromlocation">ICN</div>
                                        </div>
                                        <div className="duration">
                                            <div className="flightduration" id="flightduration">6h 25m</div>
                                            <div className="line"></div>
                                            <div className="stops" id="stops">Direct</div>
                                        </div>
                                        <div className="flyto">
                                            <div className="time" id="totime">05:00<sup>+1</sup></div>
                                            <div className="location">SIN</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="expandable arrow" data-target="#details2"></div>
                            <div className="expandable-wrapper" id="details2">
                                <div className="departure">
                                    <div className="card">
                                        <div className="flight-header">
                                            <div className="direction-status">Depart  <span>Mon, 20 Apr</span></div>
                                            <div>6h 30m</div>
                                        </div>
                                        <div className="flight-segment">
                                            <div className="header">
                                                <img src={KRicon} className="airline-logo" alt="" />
                                                <span className="flight-number">Korean Air</span>
                                                <span className="aircraft">KE 679</span>
                                                <span className="aircraft">Boeing 777</span>
                                            </div>
                                            <div className="flight-content">
                                                <div className="timeline">
                                                    <span className="dot"></span>
                                                    <span className="line"></span>
                                                    <span className="plane-icon"><img src={flighticon} /></span>
                                                    <span className="line"></span>
                                                    <span className="dot"></span>
                                                </div>
                                                <div className="schedule">
                                                    <div className="direction">
                                                        <div className="time">07:30</div>
                                                        <div className="location">Singapore Changi (SIN)</div>
                                                    </div>
                                                    <div className="duration">6h 30m</div>
                                                    <div className="direction">
                                                        <div className="time">15:00</div>
                                                        <div className="location">Incheon Intl (ICN)</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="return">
                                    <div className="card">
                                        <div className="flight-header">
                                            <div className="direction-status">Return  <span>Fri, 24 Apr</span></div>
                                            <div>6h 25m</div>
                                        </div>
                                        <div className="flight-segment">
                                            <div className="header">
                                                <img src={KRicon} className="airline-logo" alt="" />
                                                <span className="flight-number">Korean Air</span>
                                                <span className="aircraft">KE 643</span>
                                                <span className="aircraft">Boeing 778</span>
                                                
                                            </div>
                                            <div className="flight-content">
                                                <div className="timeline">
                                                    <span className="dot"></span>
                                                    <span className="line"></span>
                                                    <span className="plane-icon"><img src={flighticon} /></span>
                                                    <span className="line"></span>
                                                    <span className="dot"></span>
                                                </div>
                                                <div className="schedule">
                                                    <div className="direction">
                                                        <div className="time">23:35</div>
                                                        <div className="location">Incheon Intl (ICN)</div>
                                                    </div>
                                                    <div className="duration">
                                                        <div className="duration-time">6h 25m</div>
                                                        <div className="overnight-message">Overnight flight</div>
                                                    </div>
                                                    <div className="direction">
                                                        <div className="time">05:00</div>
                                                        <div className="location">Singapore Changi (SIN)</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="addition-message">Arrives Sat, 25 Apr</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-end mb-5"><button type="submit" id="submitBtn" className="btn btn-primary btn-lg mt-3" >Submit</button></div>
                                    
            </Form>
          </Col>

        </Row>
      </Container>
    </div>
    
  );
}

export default Register3;
