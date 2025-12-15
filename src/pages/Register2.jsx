import React, { useState,useEffect} from 'react';
import axios from "axios";
import {Container ,Button, Col, Form,InputGroup,Row} from 'react-bootstrap';
import Select, { components } from "react-select";
import { useNavigate,useLocation,useOutletContext,Link} from 'react-router-dom';
import { useForm,Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from 'react-date-picker';
import moment from 'moment';
import {useDropzone} from 'react-dropzone'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import calendarIcon from '../assets/images/calendar.svg';
import delIcon from '../assets/images/delete.svg';
import { getUrl } from "../utils";


function Register2() {
    const { email } = useOutletContext(); // automatically gets email from Home.jsx
   //console.log("Register1 email:", email);
    const navigate = useNavigate();
    const { hash } = useLocation();
    const [files, setFiles] = useState([]);
    const [country,setCountry] = useState([]);
    
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    const MAX_TOTAL_SIZE = 10 * 1024 * 1024;

    const [isEdit,setIsedit] = useState(false);

    const schema = yup.object({
         passportphoto: yup.mixed()
            .required("Required field")
            .test("is-file", "File required", (value) => {
                // Allow existing filename strings when loading edit data and require actual File objects for new uploads
                if (!value) return false;
                if (typeof value === "string") return true;
                return value instanceof File && value.size > 0;
            })
            .test("fileSize", `File too large (max ${MAX_FILE_SIZE / 1024 / 1024}MB)`, (value) => {
                // Allow existing filename strings to pass size validation when editing (no File object present)
                if (!value) return false;
                if (typeof value === "string") return true;
                return value.size <= MAX_FILE_SIZE;
            })
            .test("fileType", "Invalid file type. Only PDF/JPG allowed.", (value) => {
                console.log("Validating file type:", value);
                if (!value) return true;
                if (typeof value === "string") return true;
                return value.type === "image/jpg" || value.type === "application/pdf" || value.type === "image/jpeg";
            }),
        country:yup.string().required("Required field"),
        nationality: yup.string().required("Required field"),
        dob: yup.date()
            .nullable()
            .typeError('Required field')
            .required("Required field"),
        passportno:yup.string().required("Required field"),
        placeofissue:yup.string().required("Required field"),
        dateofissue: yup.date()
            .nullable()
            .typeError('Required field')
            .required("Required field"),
        expirydate: yup.date()
            .nullable()
            .typeError('Required field')
            .required("Required field"),
        extend:yup.string().required("Required field"),
        prefer_checkindate:yup.date()
            .nullable()
            .transform((value, originalValue) => {
                // Treat empty string as null
                return originalValue === '' ? null : value;
            })
            .when('extend', {
                is: 'Yes', 
                then: (schema) => schema
                    .typeError('Required field')
                    .required("Required field"),
                    otherwise: (schema) => schema.nullable(),
            }),
        prefer_checkoutdate:yup.date()
            .nullable()
            .transform((value, originalValue) => {
                // Treat empty string as null
                return originalValue === '' ? null : value;
            })
            .when('extend', {
                is: 'Yes', 
                then: (schema) => schema
                    .typeError('Required field')
                    .required("Required field"),
                    otherwise: (schema) => schema.nullable(),
            }),
        homecountry:yup.string().required("Required field"),
        homecity:yup.string().required("Required field"),
        homeairport:yup.string().required("Required field"),
        destinationcountry:yup.string().required("Required field"),
        destinationcity:yup.string().required("Required field"),
        destinationairport:yup.string().required("Required field"),
        departuredate: yup.date()
            .nullable()
            .typeError('Required field')
            .required("Required field"),
        returndate: yup.date()
            .nullable()
            .typeError('Required field')
            .required("Required field"),
        flightmodifydate: yup.date()
            .nullable()
            .typeError('Required field')
            .required("Required field"),
        prefer_departuredate: yup.date()
            .nullable()
            .transform((value, originalValue) => {
                // Treat empty string as null
                return originalValue === '' ? null : value;
            })
            .when('flightmodifydate', {
            is: 'Yes', 
            then: (schema) => schema
                .typeError('Required field')
                .required("Required field"),
                otherwise: (schema) => schema.nullable(),
            }),
        prefer_returndate: yup.date()
            .nullable()
            .transform((value, originalValue) => {
                // Treat empty string as null
                return originalValue === '' ? null : value;
            })
            .when('flightmodifydate', {
            is: 'Yes', 
            then: (schema) => schema
                .typeError('Required field')
                .required("Required field"),
                otherwise: (schema) => schema.nullable(),
            }),

    })
    const {
    register,
    handleSubmit,
    setError,
    clearErrors,
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
            dob: null,
            passportno:"",
            placeofissue:"",
            dateofissue: null,
            expirydate: null,
            hotel:"INSPIRE Entertainment Resort",
            checkindate:moment("20/04/2026", "DD/MM/YYYY").toDate(),
            checkoutdate:moment("23/04/2026", "DD/MM/YYYY").toDate(),
            // checkindate:"20 apr",
            // checkoutdate:"23 apr",
            extend:"",
            homecountry:"",
            homecity:"",
            homeairport:"",
            destinationcountry:"",
            destinationcity:"",
            destinationairport:"",
            prefer_departuredate:null,
            prefer_returndate:null,
            airline:"",
            flyerno:"",
            specialrequest:"",
            returndate:moment("23/04/2026", "DD/MM/YYYY").toDate(),
            departuredate: moment("20/04/2026", "DD/MM/YYYY").toDate(),
            prefer_checkindate:null,
            prefer_checkoutdate:null,
            flightmodifydate:""
       }
    });

    // anchor link function
    useEffect(() => {
        if (hash) {
            const section = document.querySelector(hash);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    }}, [hash]);
    // end anchor link function

    const checkDateField = (value) => {
        if (value != null && value !== "") {
            const m = moment(value, "DD/MM/YYYY", true); // strict parsing
            return m.isValid() ? m.toDate() : null;
        }
        return null;
    };

    const extendval = watch("extend");
    const flightmodifydateval = watch("flightmodifydate");

    const url = getUrl("assets/json/country.json");
    const regurl = getUrl("assets/json/register2.json");

    useEffect(() => {
        Promise.all([
            fetch(url).then(res => res.json()),
            fetch(regurl).then(res => res.json())
        ]).then(([countryData,regData]) => {
            setCountry(countryData);
            // if(regData.length>0){
            //     setIsedit(true);
            //     const data = regData[0];
            //     // dropzone data binding
            //     setFiles([{ name: data.passportphoto }]);
            //     setValue("passportphoto", data.passportphoto, { shouldDirty: false, shouldValidate: true });
            //     // end dropzone data binding

            //     setValue("country",data.country);
            //     setValue("nationality",data.nationality);
            //     setValue("dob",checkDateField(data.dob));
            //     setValue("passportno",data.passportno);
            //     setValue("placeofissue",data.placeofissue);
            //     setValue("dateofissue",checkDateField(data.dateofissue));
            //     setValue("expirydate",checkDateField(data.expirydate));
            //     setValue("extend",data.extend);
            //     setValue("homecountry",data.homecountry);
            //     setValue("homecity",data.homecity);
            //     setValue("homeairport",data.homeairport);
            //     setValue("destinationcountry",data.destinationcountry);
            //     setValue("destinationcity",data.destinationcity);
            //     setValue("destinationairport",data.destinationairport);
            //     setValue("prefer_departuredate",checkDateField(data.prefer_departuredate));
            //     setValue("prefer_returndate",checkDateField(data.prefer_returndate));
            //     setValue("airline",data.airline || "");
            //     setValue("flyerno",data.flyerno);
            //     setValue("flightmodifydate",data.flightmodifydate);
            //     setValue("specialrequest",data.specialrequest);
            //     setValue("returndate",checkDateField(data.returndate));
            //     setValue("departuredate",checkDateField(data.departuredate));
            //     setValue("prefer_checkindate",checkDateField(data.prefer_checkindate));
            //     setValue("prefer_checkoutdate",checkDateField(data.prefer_checkoutdate));
            //  }
        });
        }, []);

    

    useEffect(() => {
        if (isEdit) return;
        if (flightmodifydateval !== "Yes") {  // reset form
            setValue("prefer_departuredate", null); 
            setValue("prefer_returndate", null); 
        }
    }, [flightmodifydateval, setValue]);  
    // start react-dropzone
        const { getRootProps, getInputProps } = useDropzone({
            accept: {'image/jpg': [], 'application/pdf': [],'image/jpeg': []},
            multiple: false, // Only allow one file
            maxSize: MAX_FILE_SIZE, // File size limit
            onDrop: (acceptedFiles, fileRejections) => {
                setFiles(acceptedFiles); // Update files in the UI
                setValue("passportphoto", acceptedFiles[0]);
                if (fileRejections.length > 0) {
                    fileRejections.forEach(({ file, errors }) => {
                        errors.forEach((error) => {
                            if (error.code === "file-too-large") {
                                setError("passportphoto", { type: "manual", message: `File too large (max ${MAX_FILE_SIZE / 1024 / 1024} MB)` });
                            }
                            if (error.code === "file-invalid-type") {
                                setError("passportphoto", { type: "manual", message: "Invalid file type. Only PDF/JPG allowed." });
                            }
                        });
                    });
                } else {
                    clearErrors("passportphoto"); // Clear errors when a valid file is selected
                }
        },
        });

    // end react-dropzone

    const onSubmit = async (data) => {

        const checkindate = checkDateField(data.checkindate);
        const checkoutdate = checkDateField(data.checkoutdate); 
        const departuredate = checkDateField(data.departuredate);  
        const dateofissue = checkDateField(data.dateofissue);
        const dob = checkDateField(data.dob);
        const expirydate = checkDateField(data.expirydate);
        const returndate = checkDateField(data.returndate);
        const prefer_checkindate = checkDateField(data.prefer_checkindate);
        const prefer_checkoutdate = checkDateField(data.prefer_checkoutdate);
        const prefer_departuredate = checkDateField(data.prefer_departuredate);
        const prefer_returndate = checkDateField(data.prefer_returndate);

        const registerinfo = {
            ...data,
            dob: dob,
            checkindate: checkindate,
            checkoutdate: checkoutdate,
            departuredate: departuredate,
            dateofissue: dateofissue,
            expirydate: expirydate,
            returndate: returndate,
            prefer_checkindate: prefer_checkindate,
            prefer_checkoutdate: prefer_checkoutdate,
            prefer_departuredate: prefer_departuredate,
            prefer_returndate: prefer_returndate
        };
        console.log(registerinfo);
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
                      <Col xs={6} className="regtitleleft">                      
                          <h2 className="res_title">Registration</h2>
                      </Col>
                      <Col xs={6} className="regtitleright">                      
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
                                <label>
                                Please upload a copy of your passport (page with photo)<br/>
                                For hotel and flight booking purposes
                                </label>
                            </Col>

                            <Col md={8}>
                                <Controller
                                    name="passportphoto"
                                    control={control}
                                    defaultValue={null}
                                    render={({ field: { onChange, value } }) => (
                                        <>
                                            <div {...getRootProps()} className="dropzone">
                                                <input {...getInputProps()} />
                                                <p>Drag and drop or click to select a file</p>
                                            </div>

                                            {files.map((file, index) => (
                                                <div key={index} className="dropzone-file-row">
                                                    <span>{file.name}</span>
                                                    <button
                                                        type="button"
                                                        className="delete-btn"
                                                        onClick={() => {
                                                            setFiles([]); // Clear UI file
                                                            onChange(null); // Set null value to pass required validation
                                                        }}
                                                    >
                                                        <img src={delIcon} className="img-fluid" alt="delete" />
                                                    </button>
                                                </div>
                                            ))}
                                            <div className={`d-flex justify-content-${
                                                    errors.passportphoto ? "between" : "end"
                                                }`}
                                            >{errors.passportphoto && <span className="error">{errors.passportphoto?.message}</span>}
                                                <small>PDF/JPG only (max. 10MB)</small>
                                            </div>
                                        </>
                                    )}
                                />
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
                                            value={field.value || null}
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
                                            value={field.value || null}
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
                                            value={field.value || null}
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
                                {/* <input type="text" className="form-input" {...register("checkindate")} readOnly /> */}
                                <Controller
                                    control={control}
                                    name="checkindate"
                                    render={({ field }) => (
                                        <DatePicker
                                            onChange={field.onChange}
                                            value={field.value || null}
                                            format="dd/MM/yyyy"
                                            className="form-control"
                                            clearIcon={null}
                                            calendarIcon={<img src={calendarIcon} alt="calendar" />}
                                            disabled={true} 
                                        />
                                    )}
                                />
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Check-out date</label>
                            </Col>
                            <Col md={8}>
                                {/* <input type="text" className="form-input" {...register("checkoutdate")} readOnly /> */}
                                <Controller
                                    control={control}
                                    name="checkoutdate"
                                    render={({ field }) => (
                                        <DatePicker
                                            onChange={field.onChange}
                                            value={field.value || null}
                                            format="dd/MM/yyyy"
                                            className="form-control"
                                            clearIcon={null}
                                            calendarIcon={<img src={calendarIcon} alt="calendar" />}
                                            disabled={true} 
                                        />
                                    )}
                                />
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
                                            name="prefer_checkindate"
                                            render={({ field }) => (
                                                <DatePicker
                                                    onChange={field.onChange}
                                                    value={field.value || null}
                                                    format="dd/MM/yyyy"
                                                    className="form-control"
                                                    clearIcon={null}
                                                    calendarIcon={<img src={calendarIcon} alt="calendar" />}
                                                />
                                            )}
                                        />
                                        <p className='error'>{errors.prefer_checkindate?.message}</p>
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
                                                    value={field.value || null}
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
                                            options={country}
                                            placeholder='--Choose--'
                                            value={country.find(option => option.value === field.value)}
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
                                            options={country}
                                            placeholder='--Choose--'
                                            value={country.find(option => option.value === field.value)}
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
                                    name="departuredate"
                                    render={({ field }) => (
                                        <DatePicker
                                            onChange={field.onChange}
                                            value={field.value || null}
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
                                            options={country}
                                            placeholder='--Choose--'
                                            value={country.find(option => option.value === field.value)}
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
                                            options={country}
                                            placeholder='--Choose--'
                                            value={country.find(option => option.value === field.value)}
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
                                            value={field.value || null}
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
                        <Row className="row field" id='modifydate'>
                            <Col md={4}>
                                <label>I would like to modify the flight dates<br/></label>
                            </Col>
                            <Col md={8} className="genderradio">
                                <input type="radio" {...register("flightmodifydate")} value="Yes" className="radiobtn" id="flightmodifydate_Yes" /><label htmlFor="flightmodifydate_Yes">Yes <span style={{width: '10px', display: "inline-block"}}></span></label>
                                <input type="radio" {...register("flightmodifydate")} value="No" className="radiobtn" id="flightmodifydate_no" /><label htmlFor="flightmodifydate_no">No</label>
                                <p className='error'>{errors.flightmodifydate?.message}</p>
                                
                            </Col>
                        </Row>
                        {flightmodifydateval == 'Yes' && (
                            <>
                                <Row>
                                    <Col md={{ span: 8, offset: 4 }}><label className='pt-2 pb-2'>HP Future Ready 2026 Secretariat will contact you on your <br className='hide320'/>modified flight dates.</label></Col>
                                </Row>
                                <Row className="field">
                                    <Col md={4}>
                                        <label>Preferred departure date</label>
                                    </Col>
                                    <Col md={8}>
                                        <Controller
                                            control={control}
                                            name="prefer_departuredate"
                                            render={({ field }) => (
                                                <DatePicker
                                                    onChange={field.onChange}
                                                    value={field.value || null}
                                                    format="dd/MM/yyyy"
                                                    className="form-control"
                                                    clearIcon={null}
                                                    calendarIcon={<img src={calendarIcon} alt="calendar" />}
                                                />
                                            )}
                                        />
                                        <p className='error'>{errors.prefer_departuredate?.message}</p>
                                    </Col>  
                                </Row>
                                <Row className="field">
                                    <Col md={4}>
                                        <label>Preferred return date</label>
                                    </Col>
                                    <Col md={8}>
                                        <Controller
                                            control={control}
                                            name="prefer_returndate"
                                            render={({ field }) => (
                                                <DatePicker
                                                    onChange={field.onChange}
                                                    value={field.value || null}
                                                    format="dd/MM/yyyy"
                                                    className="form-control"
                                                    clearIcon={null}
                                                    calendarIcon={<img src={calendarIcon} alt="calendar" />}
                                                />
                                            )}
                                        />
                                        <p className='error'>{errors.prefer_returndate?.message}</p>
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
                                <div className='d-flex justify-content-between'>
                                    <button type="submit" className="outline-btn">Save & exit</button>
                                    <div><Link to="/register1" className="back-btn">Back</Link>
                                    <button type="submit" className="primary-btn">Next</button></div>
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
