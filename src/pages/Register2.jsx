import React, { useState,useEffect} from 'react';
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
import calendarIcon from '../assets/images/calendar.svg';
// import { Last } from 'react-bootstrap/esm/PageItem';


function Register2() {
   const { email } = useOutletContext(); // automatically gets email from Home.jsx
   //console.log("Register1 email:", email);
   const navigate = useNavigate();

    const schema = yup.object({
        passportphoto: yup.string().required("Required field"),
        country:yup.string().required("Required field"),
        nationality: yup.string().required("Required field"),
        dob: yup.date()
            .nullable()
            .typeError('Date is required')
            .required("Required field"),
        passportno:yup.string().required("Required field"),
        placeofissue:yup.string().required("Required field"),
        dateofissue: yup.date()
            .nullable()
            .typeError('Date is required')
            .required("Required field"),
        expirydate: yup.date()
            .nullable()
            .typeError('Date is required')
            .required("Required field"),
        extend:yup.string().required("Required field"),
        prefer_chechindate:yup.date()
            .nullable()
            .typeError('Date is required')
            .when('extend', {
            is: 'Yes', 
            then: (schema) => schema
                .required("Required field"),
                otherwise: (schema) => schema.nullable(),
            }),
        prefer_checkoutdate:yup.date()
            .nullable()
            .typeError('Date is required')
            .when('extend', {
            is: 'Yes', 
            then: (schema) => schema
                .required("Required field"),
                otherwise: (schema) => schema.nullable(),
            }),
        homecountry:yup.string().required("Required field"),
        homecity:yup.string().required("Required field"),
        homeairport:yup.string().required("Required field"),
        destinationcountry:yup.string().required("Required field"),
        destinationcity:yup.string().required("Required field"),
        destinationairport:yup.string().required("Required field"),
        extend:yup.string().required("Required field"),
        flightmodifydate:yup.string().required("Required field"),
        preferdeparturedate: yup.date()
            .nullable()
            .typeError('Date is required')
            .when('flightmodifydate', {
            is: 'Yes', 
            then: (schema) => schema
                .required("Required field"),
                otherwise: (schema) => schema.nullable(),
            }),
        preferreturndate: yup.date()
            .nullable()
            .typeError('Date is required')
            .when('flightmodifydate', {
            is: 'Yes', 
            then: (schema) => schema
                .required("Required field"),
                otherwise: (schema) => schema.nullable(),
            }),

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
            passportphoto: "",
            country:"",
            nationality: "",
            dob: "",
            passportno:"",
            placeofissue:"",
            dateofissue: "",
            expirydate: "",
            hotel:"INSPIRE Entertainment Resort",
            checkindate:moment("20/04/2026", "DD/MM/YYYY").toDate(),
            checkoutdate:moment("23/04/2026", "DD/MM/YYYY").toDate(),
            extend:"",
            homecountry:"",
            homecity:"",
            homeairport:"",
            destinationcountry:"",
            destinationcity:"",
            destinationairport:"",
            extend:"",
            preferdeparturedate:"",
            preferreturndate:"",
            airline:"",
            flyerno:"",
            specialrequest:"",
            returndate:"",
            departuredate:"",
            prefer_chechindate:"",
            prefer_checkoutdate:""
       }
  });

    const salutationOption = [
        {label : 'Mr.', value:'Mr.'},
        {label : 'Mrs.', value:'Mrs.'},
        {label : 'Ms.', value:'Ms.'},
        {label : 'Mdm.', value:'Mdm.'},
        {label : 'Dr.', value:'Dr.'}
    ]

    const countrycodeOption = [
        {label : '+65 Singapore', value:'+65 Singapore'},
        {label : '+60 Malaysia', value:'+60 Malaysia'},
    ]

    const countryOption =[
        {label : 'Singapore', value:'Singapore'},
        {label : 'Malaysia', value:'Malaysia'},
    ]

    const extendval = watch("extend");
    const flightmodifydateval = watch("flightmodifydate");
    useEffect(() => {
        if (flightmodifydateval !== "Yes") {  // reset form
            setValue("preferdeparturedate", null); 
            setValue("preferreturndate", null); 
        }
    }, [flightmodifydateval, setValue]);  
    const onSubmit = async (data) => {
        console.log(data);
        navigate('/register3')
    }


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
                          <p className="steptitle">STEP 2 / 3</p>
                      </Col>  
                    </Row>
                    <hr className="title-divider" />
                    <div className="loginform">
                        <Row>
                            <Col md={12}>
                                <h3 className="res_subtitle">Passport details</h3>
                                <p className="accommonote">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500
                                </p>
                            </Col>
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Please upload a copy of your passport (page with photo)<br/>
                                    For hotel and flight booking purposes</label>
                            </Col>
                            <Col md={8}>
                                <input type="file" className="form-input" {...register("passportphoto")} />
                                <p className='error'>{errors.passportphoto?.message}</p>
                            </Col>  
                        </Row>
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
                                            options={countryOption}
                                            placeholder='--Choose--'
                                            value={countryOption.find(option => option.value === field.value)}
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
                                <input type="text" className="form-input" {...register("nationality")} />
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
                                <label>Passport no.</label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input" {...register("passportno")} /><p className='error'>{errors.passportno?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Place of issue</label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input" {...register("placeofissue")} />
                                <p className='error'>{errors.placeofissue?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Date of issue</label>
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
                    </div>
                </div>
                <div className="register-form bg-periwinkle registerpage1">
                    <div className="loginform">
                        <Row>
                            <Col md={12}>
                                <h3 className="res_subtitle mt-40">Accommodation</h3>
                                <p className="accommonote">
                                    INSPIRE Entertainment Resort <br/>
                                    127, Gonghangmunhwa-ro, Jung-gu,<br/>
                                    INCHEON, REPUBLIC OF KOREA 22382
                                </p>
                                <p>Hotel booking of 3 nights from 20 to 23 April 2026 will be funded. Any extension beyond these dates will be self-paid at <strong style={{color:'#000000'}}>USD XX/ room night</strong> to the hotel upon check-in.</p>
                            </Col>
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Hotel</label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input" {...register("hotel")} readOnly />
                                <p className='error'>{errors.hotel?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Check-in date</label>
                            </Col>
                            <Col md={8}>
                                <Controller
                                    control={control}
                                    name="checkindate"
                                    render={({ field }) => (
                                        <DatePicker
                                            onChange={field.onChange}
                                            value={field.value}
                                            format="dd/MM/yyyy"
                                            className="form-control"
                                            clearIcon={null}
                                            calendarIcon={<img src={calendarIcon} alt="calendar" />}
                                            disabled={true} 
                                        />
                                    )}
                                />
                                <p className='error'>{errors.checkindate?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Check-out date</label>
                            </Col>
                            <Col md={8}>
                                <Controller
                                    control={control}
                                    name="checkoutdate"
                                    render={({ field }) => (
                                        <DatePicker
                                            onChange={field.onChange}
                                            value={field.value}
                                            format="dd/MM/yyyy"
                                            className="form-control"
                                            clearIcon={null}
                                            calendarIcon={<img src={calendarIcon} alt="calendar" />}
                                            disabled={true} 
                                        />
                                    )}
                                />
                                <p className='error'>{errors.checkoutdate?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="row field">
                            <Col md={4}>
                                <label>I would like to extend/ modify my visit</label>
                            </Col>
                            <Col md={8} className="genderradio">
                                <input type="radio" {...register("extend")} value="Yes" className="radiobtn" id="extend_Yes" /><label htmlFor="extend_Yes">Yes <span style={{width: '10px', display: "inline-block"}}></span></label>
                                <input type="radio" {...register("extend")} value="No" className="radiobtn" id="extend_no" /><label htmlFor="extend_no">No</label>
                                <p className='error'>{errors.extend?.message}</p>
                                
                            </Col>
                        </Row>
                        {extendval == 'Yes' && (
                            <>
                                <Row className="field">
                                    <Col md={4}>
                                        <label>Preferred check-in date</label>
                                    </Col>
                                    <Col md={8}>
                                        <Controller
                                            control={control}
                                            name="prefer_chechindate"
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
                                        <p className='error'>{errors.prefer_chechindate?.message}</p>
                                    </Col>  
                                </Row>
                                <Row className="field">
                                    <Col md={4}>
                                        <label>Preferred checkout date</label>
                                    </Col>
                                    <Col md={8}>
                                        <Controller
                                            control={control}
                                            name="prefer_checkoutdate"
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
                                        <p className='error'>{errors.prefer_checkoutdate?.message}</p>
                                    </Col>  
                                </Row>
                            </>
                        )}
                    </div>
                </div>
                <div className="register-form bg-periwinkle registerpage1">
                    <div className="loginform">
                        <Row>
                            <Col md={12}>
                                <h3 className="res_subtitle mt-40">Flight booking</h3>
                                <p className='fw-bold'>Departing (from home country)</p>
                            </Col>
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Home country</label>
                            </Col>
                            <Col md={8}>
                                <Controller
                                    name="homecountry"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={countryOption}
                                            placeholder='--Choose--'
                                            value={countryOption.find(option => option.value === field.value)}
                                            onChange={(selectedOption) =>{
                                                field.onChange(selectedOption?.value);
                                            }}
                                        />
                                    )}
                                />
                                <p className='error'>{errors.homecountry?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Home city</label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input" {...register("homecity")} />
                                <p className='error'>{errors.homecity?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Home airport</label>
                            </Col>
                            <Col md={8}>
                                <Controller
                                    name="homeairport"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={countryOption}
                                            placeholder='--Choose--'
                                            value={countryOption.find(option => option.value === field.value)}
                                            onChange={(selectedOption) =>{
                                                field.onChange(selectedOption?.value);
                                            }}
                                        />
                                    )}
                                />
                                <p className='error'>{errors.homeairport?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Departure date</label>
                            </Col>
                            <Col md={8}>
                                <Controller
                                    control={control}
                                    name="prefer_chechindate"
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
                                <p className='error'>{errors.prefer_chechindate?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={12}>
                                <p className='fw-bold'>Returning (from destination country)</p>
                            </Col>
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Destination country</label>
                            </Col>
                            <Col md={8}>
                                <Controller
                                    name="destinationcountry"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={countryOption}
                                            placeholder='--Choose--'
                                            value={countryOption.find(option => option.value === field.value)}
                                            onChange={(selectedOption) =>{
                                                field.onChange(selectedOption?.value);
                                            }}
                                        />
                                    )}
                                />
                                <p className='error'>{errors.destinationcountry?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Destination city</label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input" {...register("destinationcity")} />
                                <p className='error'>{errors.destinationcity?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Destination airport</label>
                            </Col>
                            <Col md={8}>
                                <Controller
                                    name="destinationairport"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={countryOption}
                                            placeholder='--Choose--'
                                            value={countryOption.find(option => option.value === field.value)}
                                            onChange={(selectedOption) =>{
                                                field.onChange(selectedOption?.value);
                                            }}
                                        />
                                    )}
                                />
                                <p className='error'>{errors.destinationairport?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Return date</label>
                            </Col>
                            <Col md={8}>
                                <Controller
                                    control={control}
                                    name="returndate"
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
                                <p className='error'>{errors.returndate?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="row field">
                            <Col md={4}>
                                <label>I would like to modify the flight dates</label>
                            </Col>
                            <Col md={8} className="genderradio">
                                <input type="radio" {...register("flightmodifydate")} value="Yes" className="radiobtn" id="flightmodifydate_Yes" /><label htmlFor="flightmodifydate_Yes">Yes <span style={{width: '10px', display: "inline-block"}}></span></label>
                                <input type="radio" {...register("flightmodifydate")} value="No" className="radiobtn" id="flightmodifydate_no" /><label htmlFor="flightmodifydate_no">No</label>
                                <p className='error'>{errors.extend?.message}</p>
                                
                            </Col>
                        </Row>
                        {flightmodifydateval == 'Yes' && (
                            <>
                                <Row className="field">
                                    <Col md={4}>
                                        <label>Preferred departure date</label>
                                    </Col>
                                    <Col md={8}>
                                        <Controller
                                            control={control}
                                            name="preferdeparturedate"
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
                                        <p className='error'>{errors.preferdeparturedate?.message}</p>
                                    </Col>  
                                </Row>
                                <Row className="field">
                                    <Col md={4}>
                                        <label>Preferred return date</label>
                                    </Col>
                                    <Col md={8}>
                                        <Controller
                                            control={control}
                                            name="preferreturndate"
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
                                        <p className='error'>{errors.preferreturndate?.message}</p>
                                    </Col>  
                                </Row>
                             </>
                        )}
                        <Row className="field">
                            <Col md={4}>
                                <label>Frequent flyer airline <i>(optional)</i></label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input" {...register("airline")} />
                                <p className='error'>{errors.airline?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Frequent flyer no. <i>(optional)</i></label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input" {...register("flyerno")} />
                                <p className='error'>{errors.flyerno?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Special requests <i>(optional)</i></label>
                            </Col>
                            <Col md={8}>
                                <textarea type="text" className="form-input" {...register("specialrequest")} ></textarea>
                                <p className='error'>{errors.specialrequest?.message}</p>
                            </Col>  
                        </Row>
                           
                        <Row className='field mt-5'>
                            <Col md={12}>
                                <div className='d-flex justify-content-md-between'>
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

export default Register2;
