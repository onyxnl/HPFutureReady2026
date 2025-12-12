import React, { useState,useEffect  } from 'react';
import axios from "axios";
import {Container ,Button, Col, Form,InputGroup,Row} from 'react-bootstrap';
import Select, { components } from "react-select";
import { useNavigate,useLocation,useOutletContext} from 'react-router-dom';
import { useForm,Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getUrl } from "../utils";


function Register1() {
   const { email } = useOutletContext(); // automatically gets email from Home.jsx
   //console.log("Register1 email:", email);
    const navigate = useNavigate();

    const [countrycode,setCountrycode] = useState([]);
    const [country,setCountry] = useState([]);

    const schema = yup.object({
        firstName: yup.string().required("Required field"),
        lastName: yup.string().required("Required field"),
        email: yup.string().email("Invalid email").required("Required field"),
        salutation: yup.string().required("Required field"),
        gender:yup.string().required("Required field"),
        countrycode:yup.string().required("Required field"),
        mobilephone: yup
            .string()
            .matches(/^\+?\d+$/, "Required field")
            .required("Required field"),
        businessphone: yup
            .string()
            .matches(/^\+?\d+$/, "Required field")
            .required("Required field"),
        company:yup.string().required("Required field"),
        jobtitle:yup.string().required("Required field"),
        companyaddress:yup.string().required("Required field"),
        dietary:yup.string().required("Required field"),
        dietary_other:yup.string()
                    .nullable()
                    .when('dietary', {
                    is: 'Others', 
                    then: (schema) => schema
                        .required("Required field"),
                        otherwise: (schema) => schema.nullable(),
                    }),
        nameonbadge:yup.string().required("Required field"),
        emergency_firstName:yup.string().required("Required field"),
        emergency_lastName:yup.string().required("Required field"),
        emergency_relationship:yup.string().required("Required field"),
        emergency_countrycode:yup.string().required("Required field"),
        emergency_contactno: yup
            .string()
            .matches(/^\+?\d+$/, "Required field"),
        companysize:yup.string().required("Required field"),
        businesscategory:yup.string().required("Required field"),
        businesscategory_other:yup.string()
                    .nullable()
                    .when('businesscategory', {
                    is: 'Others', 
                    then: (schema) => schema
                        .required("Required field"),
                        otherwise: (schema) => schema.nullable(),
                    }),
        business_description:yup.string().required("Required field"),
        country:yup.string().required("Required field"),
        development_opportunity:yup.string().required("Required field"),
        budget:yup.string().required("Required field")
  })
  const {
    register,
    handleSubmit,
    control,
    setValue, // to reset value - setValue(name, newValue)
    watch, // for form field change
    formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues:{
            firstName: "",
            lastName: "",
            email: email || "",
            salutation: "",
            gender:"",
            countrycode:"",
            mobilephone:"",
            businessphone:"",
            company:"",
            jobtitle:"",
            companyaddress:"",
            companywebsite:"",
            dietary:"",
            dietary_other:"",
            foodallergies:"",
            nameonbadge:"",
            emergency_firstName:"",
            emergency_lastName:"",
            emergency_relationship:"",
            emergency_countrycode:"",
            emergency_contactno:"",
            companysize:"",
            businesscategory:"",
            business_description:"",
            country:"",
            development_opportunity:"",
            budget:""
       }
  });

    const salutationOption = [
        {label : 'Mr.', value:'Mr.'},
        {label : 'Mrs.', value:'Mrs.'},
        {label : 'Ms.', value:'Ms.'},
        {label : 'Mdm.', value:'Mdm.'},
        {label : 'Dr.', value:'Dr.'}
    ]


    const dietaryOption = [
         {label : 'None', value:'None'},
         {label : 'No pork no lard', value:'No pork no lard'},
         {label : 'Indian Vegetarian', value:'Indian Vegetarian'},
         {label : 'Vegetarian', value:'Vegetarian'},
         {label : 'Others (please specify)', value:'Others'}
    ]

    const companysizeOption = [
        {label : '1-9 employees', value:'1-9 employees'},
        {label : '10-99 employees', value:'10-99 employees'},
        {label : '100-499 employees', value:'100-499 employees'},
        {label : '500-999 employees', value:'500-999 employees'},
        {label : '1000 or more employees', value:'1000 or more employees'},
    ]

    const businessCategoryOption = [
        {label : 'Government', value:'Government'},
        {label : 'Defence / Military / Security', value:'Defence / Military / Security'},
        {label : 'Education', value:'Education'},
        {label : 'Agriculture / Forestry', value:'Agriculture / Forestry'},
        {label : 'Business Services & Consultancy', value:'Business Services & Consultancy'},
        {label : 'Communication Services', value:'Communication Services'},
        {label : 'Consumer Businesses / Retail', value:'Consumer Businesses / Retail'},
        {label : 'Energy / Utilities', value:'Energy / Utilities'},
        {label : 'Healthcare / Medical', value:'Healthcare / Medical'},
        {label : 'Information Technology', value:'Information Technology'},
        {label : 'Manufacturing', value:'Manufacturing'},
        {label : 'Media & Advertising', value:'Media & Advertising'},
        {label : 'Real Estate', value:'Real Estate'},
        {label : 'Transportation / Logistics', value:'Transportation / Logistics'},
        {label : 'Travel / Hospitality / Entertainment', value:'Travel / Hospitality / Entertainment'},
        {label : 'Distribution', value:'Distribution'},
        {label : 'Marketing', value:'Marketing'},
        {label : 'Others (please specify)', value:'Others'},
    ]
    

    const dietaryval = watch("dietary");
    const businesscategoryval = watch("businesscategory");


    const url = getUrl("assets/json/country_code.json");
    const url1 = getUrl("assets/json/country.json");
    const regurl = getUrl("assets/json/register1.json");

    useEffect(() => {
        Promise.all([
            fetch(url).then(res => res.json()),
            fetch(url1).then(res => res.json()),
            fetch(regurl).then(res => res.json())
        ]).then(([codeData, countryData,regData]) => {
            setCountrycode(codeData);
            setCountry(countryData);
            // if(regData.length>0){
            //     const data = regData[0];
            //     setValue("firstName",data.firstName);
            //     setValue("lastName",data.lastName);
            //     setValue("salutation",data.salutation);
            //     setValue("gender",data.gender);
            //     setValue("countrycode",data.countrycode);
            //     setValue("mobilephone",data.mobilephone);
            //     setValue("businessphone",data.businessphone);
            //     setValue("company",data.company);
            //     setValue("jobtitle",data.jobtitle);
            //     setValue("companyaddress",data.companyaddress);
            //     setValue("companywebsite",data.companywebsite);
            //     setValue("dietary",data.dietary);
            //     setValue("dietary_other",data.dietary_other);
            //     setValue("foodallergies",data.foodallergies);
            //     setValue("nameonbadge",data.nameonbadge);
            //     setValue("emergency_firstName",data.emergency_firstName);
            //     setValue("emergency_lastName",data.emergency_lastName);
            //     setValue("emergency_relationship",data.emergency_relationship);
            //     setValue("emergency_countrycode",data.emergency_countrycode);
            //     setValue("emergency_contactno",data.emergency_contactno);
            //     setValue("companysize",data.companysize);
            //     setValue("businesscategory",data.businesscategory);
            //     setValue("business_description",data.business_description);
            //     setValue("country",data.country);
            //     setValue("development_opportunity",data.development_opportunity);
            //     setValue("budget",data.budget);
            // }
        });
    }, []);
    

    



    const onSubmit = async (data) => {
        console.log(data);
        navigate('/register2')
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
                          <p className="steptitle">STEP 1 / 3</p>
                      </Col>  
                    </Row>
                    <hr className="title-divider" />
                    <div className="loginform">
                        <Row>
                            <Col md={12}>
                                <h3 className="res_subtitle">Registrant details</h3>
                            </Col>
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Salutation</label>
                            </Col>
                            <Col md={8}>
                                <Controller
                                    name="salutation"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={salutationOption}
                                            placeholder='--Choose--'
                                            value={salutationOption.find(option => option.value === field.value)}
                                            onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                        />
                                    )}
                                />
                                <p className='error'>{errors.salutation?.message}</p>
                            </Col> 
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>First name</label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input" {...register("firstName")} />
                                <p className='error'>{errors.firstName?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Last name</label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input" {...register("lastName")} />
                                <p className='error'>{errors.lastName?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Email</label>
                            </Col>
                            <Col md={8}>
                                <input type="email" className="form-input" {...register("email")} readOnly />
                            </Col>  
                        </Row>
                        <Row className="row field">
                            <Col md={4}>
                                <label>Gender</label>
                            </Col>
                            <Col md={8} className="genderradio">
                                <input type="radio" {...register("gender")} value="Male" className="radiobtn" id="gender_m" /><label htmlFor="gender_m">Male <span style={{width: '10px', display: "inline-block"}}></span></label>
                                <input type="radio" {...register("gender")} value="Female" className="radiobtn" id="gender_f" /><label htmlFor="gender_f">Female</label>
                                <p className='error'>{errors.gender?.message}</p>
                                
                            </Col>
                        </Row>
                        <Row className="row field">
                                <Col md={4}>
                                <label>Country code</label>
                            </Col>
                            <Col md={8} >
                                <Controller
                                    name="countrycode"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={countrycode}
                                            placeholder='--Choose--'
                                            value={countrycode.find(option => option.value === field.value)}
                                            onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                        />
                                    )}
                                />
                                <p className='error'>{errors.countrycode?.message}</p>
                            </Col>
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Mobile phone</label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input"
                                    {...register("mobilephone")}  onInput={(e) => { e.target.value = e.target.value.replace(/(?!^\+)\D/g, ""); }}
                                />
                                <p className='error'>{errors.mobilephone?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Business phone</label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input"
                                    {...register("businessphone")}  onInput={(e) => { e.target.value = e.target.value.replace(/(?!^\+)\D/g, ""); }}
                                />
                                <p className='error'>{errors.businessphone?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Company</label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input" {...register("company")} /><p className='error'>{errors.company?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Job title</label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input" {...register("jobtitle")} />
                                <p className='error'>{errors.jobtitle?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Company address</label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input" {...register("companyaddress")} />
                                <p className='error'>{errors.companyaddress?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Company website <i>(optional)</i></label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input" {...register("companywebsite")} />
                                <p className='error'>{errors.companywebsite?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="row field">
                                <Col md={4}>
                                <label>Dietary requirements</label>
                            </Col>
                            <Col md={8} >
                                <Controller
                                    name="dietary"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={dietaryOption}
                                            placeholder='--Choose--'
                                            value={dietaryOption.find(option => option.value === field.value)}
                                            onChange={(selectedOption) => {
                                                field.onChange(selectedOption?.value);
                                                if(selectedOption?.value !='Others'){ setValue('dietary_other',"")}
                                            }}
                                        />
                                    )}
                                />
                                <p className='error'>{errors.dietary?.message}</p>
                                {dietaryval == 'Others' && (<div><input type="text" className="form-input mt-3" {...register("dietary_other")} placeholder='Please Specify' /> <p className='error'>{errors.dietary_other?.message}</p> </div>)}
                            </Col>
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Food allergies <i>(optional)</i></label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input" {...register("foodallergies")} />
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Preferred name on badge</label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input" {...register("nameonbadge")} />
                                <p className='error'>{errors.nameonbadge?.message}</p>
                            </Col>  
                        </Row>
                    </div>
                </div>
                <div className="register-form bg-periwinkle registerpage1">
                    <div className="loginform">
                        <Row>
                            <Col md={12}>
                                <h3 className="res_subtitle mt-40">Emergency contact</h3>
                            </Col>
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>First name</label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input" {...register("emergency_firstName")} />
                                <p className='error'>{errors.emergency_firstName?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Last name</label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input" {...register("emergency_lastName")} />
                                <p className='error'>{errors.emergency_lastName?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Relationship </label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input" {...register("emergency_relationship")} />
                                <p className='error'>{errors.emergency_relationship?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="row field">
                                <Col md={4}>
                                <label>Country code</label>
                            </Col>
                            <Col md={8} >
                                <Controller
                                    name="emergency_countrycode"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={countrycode}
                                            placeholder='--Choose--'
                                            value={countrycode.find(option => option.value === field.value)}
                                            onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                        />
                                    )}
                                />
                                <p className='error'>{errors.emergency_countrycode?.message}</p>
                            </Col>
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Contact no.</label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input"
                                    {...register("emergency_contactno")}  onInput={(e) => { e.target.value = e.target.value.replace(/(?!^\+)\D/g, ""); }}
                                />
                                <p className='error'>{errors.emergency_contactno?.message}</p>
                            </Col>  
                        </Row>
                    </div>
                </div>
                <div className="register-form bg-periwinkle registerpage1">
                    <div className="loginform">
                        <Row>
                            <Col md={12}>
                                <h3 className="res_subtitle mt-40">Company information</h3>
                            </Col>
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Company size</label>
                            </Col>
                            <Col md={8}>
                                <Controller
                                    name="companysize"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={companysizeOption}
                                            placeholder='--Choose--'
                                            value={companysizeOption.find(option => option.value === field.value)}
                                            onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                        />
                                    )}
                                />
                                <p className='error'>{errors.companysize?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Business category</label>
                            </Col>
                            <Col md={8}>
                                <Controller
                                    name="businesscategory"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={businessCategoryOption}
                                            placeholder='--Choose--'
                                            value={businessCategoryOption.find(option => option.value === field.value)}
                                            onChange={(selectedOption) =>{
                                                field.onChange(selectedOption?.value);
                                                if(selectedOption?.value !="Others"){
                                                    setValue("businesscategory_other", "");
                                                }
                                            }}
                                        />
                                    )}
                                />
                                <p className='error'>{errors.businesscategory?.message}</p>
                                {businesscategoryval == 'Others' && ( <><input type="text" className="form-input mt-3" {...register("businesscategory_other")} /> <p className='error'>{errors.businesscategory_other?.message}</p> </>)}
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Business description</label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input" {...register("business_description")} />
                                <p className='error'>{errors.business_description?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Country that office is based in</label>
                            </Col>
                            <Col md={8}>
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
                                <label>Please describe the business development opportunity you are looking for </label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input" {...register("development_opportunity")} />
                                <p className='error'>{errors.development_opportunity?.message}</p>
                            </Col>  
                        </Row>
                        <Row className="field">
                            <Col md={4}>
                                <label>Budget for business development opportunity</label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-input" {...register("budget")} />
                                <p className='error'>{errors.budget?.message}</p>
                            </Col>  
                        </Row>
                        <Row className='field mt-5'>
                            <Col md={12}>
                                <div className='d-flex justify-content-between'>
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

export default Register1;
