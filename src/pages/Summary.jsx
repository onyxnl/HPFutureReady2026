import React, { useState,useEffect } from 'react';
import axios from "axios";
import {Container ,Button, Col, Form,InputGroup,Row} from 'react-bootstrap';
import Select, { components } from "react-select";
import { useNavigate,useLocation,Link,useOutletContext } from 'react-router-dom';
import { useForm,Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


function Summary() {
    const navigate = useNavigate();
    const { email } = useOutletContext(); 
    const {
        register,
        handleSubmit,
        control,
        setValue, // to reset value - setValue(name, newValue)
        watch,
        formState: { errors },
        } = useForm();
      
        
    
        const onSubmit = () => {
            navigate('/thankyou')
        };
    


  return (
    <div className='w_902 regsummary'>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="header ">Registration Summary</div><hr/>
                    </Col>
                </Row>
                <Row className='heading'>
                    <Col md={12} className='d-flex justify-content-between'>
                        <h3 className="res_subtitle p-0">Registrant Details</h3>
                        <div><Link to="/register1" className="edit-btn">Edit</Link></div>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <h4 className="res_label">Salutation</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={4}>
                        <h4 className="res_label">First name</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={4}>
                        <h4 className="res_label">Last name</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Email</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={6}>
                        <h4 className="res_label">Gender</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={4}>
                        <h4 className="res_label">Country code</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={4}>
                        <h4 className="res_label">Mobile phone</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={4}>
                        <h4 className="res_label">Business phone</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Company</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={6}>
                        <h4 className="res_label">Job title</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Company address</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={6}>
                        <h4 className="res_label">Company website</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Dietary requirements</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={6}>
                        <h4 className="res_label">Food allergies</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Preferred name on badge</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={6}>
                        <h3 className="res_subtitle">Emergency contact</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <h4 className="res_label">First name</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={4}>
                        <h4 className="res_label">Last name</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={4}>
                        <h4 className="res_label">Relationship</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Country code</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={6}>
                        <h4 className="res_label">Contact no.</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={6}>
                        <h3 className="res_subtitle">Company information</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Company size</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={6}>
                        <h4 className="res_label">Business category</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Business description</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={6}>
                        <h4 className="res_label">Country that office is based in</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Please describe the business development opportunity you are looking for</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={6}>
                        <h4 className="res_label">Budget for business development opportunity</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row className='heading'>
                    <Col md={12} className='d-flex justify-content-between'>
                        <h3 className="res_subtitle p-0">Passport details</h3>
                        <div><Link to="/register2" className="edit-btn">Edit</Link></div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Please upload a copy of your passport </h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={6}>
                        <h4 className="res_label">Country</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Nationality</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={6}>
                        <h4 className="res_label">Date of birth</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Passport no.</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={6}>
                        <h4 className="res_label">Place of issue</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Date of issue</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={6}>
                        <h4 className="res_label">Expiry date</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={6}>
                        <h3 className="res_subtitle">Accommodation</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h4 className="res_label">Hotel</h4>
                        <p>INSPIRE Entertainment Resort</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Check-in date</h4>
                        <p>20/04/2026 </p>
                    </Col>
                    <Col md={6}>
                        <h4 className="res_label">Check-out date</h4>
                        <p>23/04/2026 </p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">I would like to extend/ modify my visit</h4>
                    </Col>
                <Col md={6}>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Preferred check-in date</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={6}>
                        <h4 className="res_label">Preferred checkout date</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h3 className="res_subtitle">Flight booking</h3>
                        <p className="fw-bold">Departing (from home country)</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Home country</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={6}>
                        <h4 className="res_label">Home city</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Home airport</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={6}>
                        <h4 className="res_label">Departure date</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={6}>
                        <p className="fw-bold">Returning (from destination country)</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Destination country</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={6}>
                        <h4 className="res_label">Destination city</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Destination airport</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={6}>
                        <h4 className="res_label">Return date</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">I would like to modify the flight dates</h4>
                    </Col>
                    <Col md={6}>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Preferred departure date</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={6}>
                        <h4 className="res_label">Preferred return date</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={4}>
                        <h4 className="res_label">Frequent flyer airline</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={4}>
                        <h4 className="res_label">Frequent flyer no.</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={4}>
                        <h4 className="res_label">Special requests</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row className='heading'>
                    <Col md={12} className='d-flex justify-content-between'>
                        <h3 className="res_subtitle p-0">Visa</h3>
                        <div><Link to="/register4" className="edit-btn">Edit</Link></div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <p>I require an event invitation letter for visa application</p>
                    </Col>
                    <Col md={6}>
                        <p>xxxxxx</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Country</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={6}>
                        <h4 className="res_label">Nationality</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Date of birth</h4>
                        <p>xxxxxx</p>
                    </Col>
                    <Col md={6}>
                        <h4 className="res_label">Passport no.</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row> 
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Place of issue</h4>
                        <p>xxxxxx</p>
                    </Col>
                    
                    <Col md={6}>
                        <h4 className="res_label">Date of issue</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Expiry date</h4>
                        <p>xxxxxx</p>
                    </Col>
                    
                    <Col md={6}>
                        <h4 className="res_label">Arrival date</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Departure date</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h4 className="res_label">Country where you will apply for the visa</h4>
                        <p>xxxxxx</p>
                    </Col>
                    
                    <Col md={6}>
                        <h4 className="res_label">City where you will apply for the visa</h4>
                        <p>xxxxxx</p>
                    </Col>
                </Row>
                <Row className='field mt-5'>
                    <Col md={12}>
                        <div className='d-flex justify-content-between'>
                            <Link to="/register4" className="outline-btn">Back</Link>
                            <button type="submit" className="primary-btn">Submit</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Form>
    </div>
    
  );
}

export default Summary;
