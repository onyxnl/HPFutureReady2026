import React, { useState } from 'react';
import axios from "axios";
import {Container ,Button, Col, Form,InputGroup,Row} from 'react-bootstrap';
import Select, { components } from "react-select";
import { useNavigate,useLocation,useOutletContext} from 'react-router-dom';
import { useForm,Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { Last } from 'react-bootstrap/esm/PageItem';


function Thankyou() {
  


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
                                <h3 className="res_subtitle">Registrant Details</h3>
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
                                            options={countrycodeOption}
                                            placeholder='--Choose--'
                                            value={countrycodeOption.find(option => option.value === field.value)}
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
                                                const isOther = selectedOption?.value==='Others';
                                                setIsOther(isOther);
                                                if(!isOther){ setValue('dietary_other',"")}
                                            }}
                                        />
                                    )}
                                />
                                <p className='error'>{errors.dietary?.message}</p>
                                {isOther && (<div><input type="text" className="form-input mt-3" {...register("dietary_other")} placeholder='Please Specify' /> <p className='error'>{errors.dietary_other?.message}</p> </div>)}
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
                                            options={countrycodeOption}
                                            placeholder='--Choose--'
                                            value={countrycodeOption.find(option => option.value === field.value)}
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
                                                const isOther = selectedOption?.value=="Others";
                                                setIsBusinessCatOther(isOther);
                                                if(!isOther){
                                                    setValue("businesscategory_other", "");
                                                }
                                            }}
                                        />
                                    )}
                                />
                                <p className='error'>{errors.businesscategory?.message}</p>
                                {isBusinessCatOther && ( <><input type="text" className="form-input mt-3" {...register("businesscategory_other")} /> <p className='error'>{errors.businesscategory_other?.message}</p> </>)}
                                
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

export default Thankyou;
