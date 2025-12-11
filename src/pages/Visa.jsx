import React, { useState,useEffect } from 'react';
import axios from "axios";
import {Container ,Button, Col, Form,InputGroup,Row} from 'react-bootstrap';
import Select, { components } from "react-select";
import { useNavigate,useLocation,useOutletContext,Link} from 'react-router-dom';
import { useForm,Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from 'react-date-picker';
import moment from 'moment';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import calendarIcon from '../assets/images/calendar.svg';


function Visa() {
   const { email } = useOutletContext(); // automatically gets email from Home.jsx
   //console.log("Register1 email:", email);
    const navigate = useNavigate();
     const [country,setCountry] = useState([]);


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
  
    const url = `${import.meta.env.BASE_URL}assets/json/country.json`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setCountry(data));
        }, []);

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
        const formatDate = (date) => {
            return date && moment(date, moment.ISO_8601, true).isValid()
                ? moment(date).format('DD/MM/yyyy')
                : null;
        };
        const dob = formatDate(data.dob); 
        const dateofissue = formatDate(data.dob); 
        const expirydate = formatDate(data.expirydate); 
        const arrivaldate = formatDate(data.arrivaldate); 
        const departuredate = formatDate(data.departuredate); 

        const registerinfo = {
            ...data,
            dob: dob,
            dateofissue: dateofissue,
            expirydate: expirydate,
            arrivaldate: arrivaldate,
            departuredate: departuredate,
        };

        console.log(registerinfo);
        navigate('/summary')
    };


  return (
    <div className='landing-page'>
      <Container>
        <Row>
          <Col lg={12} className="logindiv">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="register-form bg-periwinkle registerpage1">
                    <Row className='regtitle'>
                      <Col xs={12} md={6} className="regtitleleft">                      
                          <h2 className="res_title">Registration</h2>
                      </Col>
                      <Col xs={12} md={6} className="regtitleright">                      
                          <p className="steptitle">STEP 3 / 3</p>
                      </Col>  
                    </Row>
                    <hr className="title-divider" />
                    <div className="loginform">
                        <Row>
                            <Col md={12}>
                                <h3 className="res_subtitle">Visa</h3>
                                <p>For more information, please click <a href="https://www.k-eta.go.kr/portal/newapply/index.do" target="_blank" className="link_text">here</a>.</p>

                            </Col>
                        </Row>
                        <Row className="row field">
                            <Col md={4}>
                                <label>I require an event invitation letter for visa application</label>
                            </Col>
                            <Col md={8} className="genderradio">
                                <input type="radio" {...register("visa")} value="Yes" className="radiobtn" id="visaYes" /><label htmlFor="visaYes">Yes <span style={{width: '10px', display: "inline-block"}}></span></label>
                                <input type="radio" {...register("visa")} value="No" className="radiobtn" id="visaNo" /><label htmlFor="visaNo">No</label>
                                <p className='error'>{errors.visa?.message}</p>
                                
                            </Col>
                        </Row>

                        {visachecked && (
                            <>
                                <Row className="row field">
                                    <Col md={4}>
                                        <label>Country</label>
                                    </Col>
                                    <Col md={8} >
                                        <Controller
                                            name="country"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    options={country}
                                                    placeholder='--Choose--'
                                                    value={country.find(option => option.value === field.value)}
                                                    onChange={(selectedOption) =>{
                                                        field.onChange(selectedOption?.value);
                                                    }}
                                                />
                                            )}
                                        />
                                        <p className='error'>{errors.country?.message}</p>
                                    </Col>
                                </Row> 
                                <Row className="field">
                                    <Col md={4}>
                                        <label>Nationality</label>
                                    </Col>
                                    <Col md={8}>
                                        <input type="text" className="form-input" {...register("nationality")}  />
                                        <p className='error'>{errors.nationality?.message}</p>
                                    </Col>  
                                </Row>
                                <Row className="field">
                                    <Col md={4}>
                                        <label>Date of birth </label>
                                    </Col>
                                    <Col md={8}>
                                        <Controller
                                            control={control}
                                            name="dob"
                                            render={({ field }) => (
                                                <DatePicker
                                                    onChange={field.onChange}
                                                    value={field.value}
                                                    format="dd/MM/yyyy"
                                                    className="form-control"
                                                    clearIcon={null}
                                                    calendarIcon={<img src={calendarIcon} alt="calendar" />}
                                                />
                                            )}
                                        />
                                        <p className='error'>{errors.dob?.message}</p>
                                    </Col>  
                                </Row>
                                <Row className="field">
                                    <Col md={4}>
                                        <label>Passport no. </label>
                                    </Col>
                                    <Col md={8}>
                                        <input type="text" className="form-input" {...register("passportno")} />
                                        <p className='error'>{errors.passportno?.message}</p>
                                    </Col>  
                                </Row>
                                <Row className="field">
                                    <Col md={4}>
                                        <label>Place of issue </label>
                                    </Col>
                                    <Col md={8}>
                                        <input type="text" className="form-input" {...register("placeofissue")} />
                                        <p className='error'>{errors.placeofissue?.message}</p>
                                    </Col>  
                                </Row>
                                <Row className="field">
                                    <Col md={4}>
                                        <label>Date of issue </label>
                                    </Col>
                                    <Col md={8}>
                                        <Controller
                                            control={control}
                                            name="dateofissue"
                                            render={({ field }) => (
                                                <DatePicker
                                                    onChange={field.onChange}
                                                    value={field.value}
                                                    format="dd/MM/yyyy"
                                                    className="form-control"
                                                    clearIcon={null}
                                                    calendarIcon={<img src={calendarIcon} alt="calendar" />}
                                                />
                                            )}
                                        />
                                        <p className='error'>{errors.dateofissue?.message}</p>
                                    </Col>  
                                </Row>
                                <Row className="field">
                                    <Col md={4}>
                                        <label>Expiry date</label>
                                    </Col>
                                    <Col md={8}>
                                        <Controller
                                            control={control}
                                            name="expirydate"
                                            render={({ field }) => (
                                                <DatePicker
                                                    onChange={field.onChange}
                                                    value={field.value}
                                                    format="dd/MM/yyyy"
                                                    className="form-control"
                                                    clearIcon={null}
                                                    calendarIcon={<img src={calendarIcon} alt="calendar" />}
                                                />
                                            )}
                                        />
                                        <p className='error'>{errors.expirydate?.message}</p>
                                    </Col>  
                                </Row>
                                <Row className="field">
                                    <Col md={4}>
                                        <label>Arrival date</label>
                                    </Col>
                                    <Col md={8}>
                                        <Controller
                                            control={control}
                                            name="arrivaldate"
                                            render={({ field }) => (
                                                <DatePicker
                                                    onChange={field.onChange}
                                                    value={field.value}
                                                    format="dd/MM/yyyy"
                                                    className="form-control"
                                                    clearIcon={null}
                                                    calendarIcon={<img src={calendarIcon} alt="calendar" />}
                                                />
                                            )}
                                        />
                                        <p className='error'>{errors.arrivaldate?.message}</p>
                                    </Col>  
                                </Row>
                                <Row className="field">
                                    <Col md={4}>
                                        <label>Departure date</label>
                                    </Col>
                                    <Col md={8}>
                                        <Controller
                                            control={control}
                                            name="departuredate"
                                            render={({ field }) => (
                                                <DatePicker
                                                    onChange={field.onChange}
                                                    value={field.value}
                                                    format="dd/MM/yyyy"
                                                    className="form-control"
                                                    clearIcon={null}
                                                    calendarIcon={<img src={calendarIcon} alt="calendar" />}
                                                />
                                            )}
                                        />
                                        <p className='error'>{errors.departuredate?.message}</p>
                                    </Col>  
                                </Row>
                                <Row className="field">
                                    <Col md={12}>
                                        <label>Address where you’ll be staying (if you are not staying at the conference hotel)</label>
                                    </Col>
                                </Row>
                                <Row className="field">
                                    <Col md={4}>
                                        <label>Country where you will apply for the visa</label>
                                    </Col>
                                    <Col md={8}>
                                        <Controller
                                            name="visacountry"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    options={country}
                                                    placeholder='--Choose--'
                                                    value={country.find(option => option.value === field.value)}
                                                    onChange={(selectedOption) =>{
                                                        field.onChange(selectedOption?.value);
                                                    }}
                                                />
                                            )}
                                        />
                                        <p className='error'>{errors.visacountry?.message}</p>
                                    </Col>  
                                </Row>
                                <Row className="field">
                                    <Col md={4}>
                                        <label>City where you will apply for the visa</label>
                                    </Col>
                                    <Col md={8}>
                                        <input type="text" className="form-input" {...register("visacity")} />
                                        <p className='error'>{errors.visacity?.message}</p>
                                    </Col>  
                                </Row>
                            </>
                        )}
                            <Row className='field mt-5'>
                                <Col md={12}>
                                    <div className='d-flex justify-content-md-between'>
                                        <Link to="/register3" className="back-btn">Back</Link>
                                        <button type="submit" className="outline-btn">Save & exit</button>
                                        <button type="submit" className="primary-btn">Submit</button>
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

export default Visa;
