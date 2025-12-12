import React, { useState,useRef  } from 'react';
import axios from "axios";
import {Container ,Button, Col, Form,InputGroup,Row} from 'react-bootstrap';
import { useNavigate,useLocation} from 'react-router-dom';
import MasterKV from '../components/MasterKV.jsx';
import Footer from '../components/Footer';
import { useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEmail } from "../context/AuthContext";
//import { useAuth } from "../context/AuthContext";
import * as yup from "yup";

function Loginauthentication() {
    const navigate = useNavigate();
    
    const { email } = useEmail(); 
    //const { user } = useAuth();
    console.log("Loginauthentication email:", email);
    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];
    
    const [errorMessage, setErrorMessage] = useState("");
    const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);

    
   
    const schema = yup.object().shape({
        digit1: yup.string().required("Please enter OTP"),
        digit2: yup.string().required("Please enter OTP"),
        digit3: yup.string().required("Please enter OTP"),
        digit4: yup.string().required("Please enter OTP"),
        digit5: yup.string().required("Please enter OTP"),
        digit6: yup.string().required("Please enter OTP"),
    });

    
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm({
            resolver: yupResolver(schema),
        });

    
    const handleChange = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, ""); // only digits
        if (!value) return;

        const newOtp = [...otpValues];
        newOtp[index] = value;
        setOtpValues(newOtp);

        // move focus to next input
        if (index < 5) {
            document.getElementById(`digit${index + 1}`).focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otpValues[index] && index > 0) {
            document.getElementById(`digit${index - 1}`).focus();
        }
    };
    const onSubmit = async (data) => {
        const otp = otpValues.join(""); 
        console.log("OTP Entered:", otp.length);
        if(otp.length === 6){
            navigate('/register1')
        }
       
        // try {
        //     const res = await axios.post("", { otp });

        //     if (res.data.Status === 200) {
        //     // success logic
        //     } else {
        //         setErrorMessage(res.data.Message);
        //     }
        // } catch (err) {
        //     setErrorMessage("Something went wrong");
        // }
    };

    const resendOpt = () => {
        console.log("Resend OTP clicked", email);
        // Logic to resend OTP
    }



    return (
        <div className='landing-page'>
            <MasterKV/>
            <section className="authen-content">
                <Container>
                    <Row>
                        <Col lg={4} md={6} className="mx-auto">
                            <div className="text-center">
                            
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    
                                    <h2 className="fw-bold">OTP Authentication</h2>
                                    <label htmlFor="email">Enter the 6-digit OTP sent to your email</label>

                                    {/* OTP DIGIT INPUTS */}
                                    <div className="group" id="otp-group">
                                       {otpValues.map((val, i) => (
                                            <input
                                                key={i}
                                                id={`digit${i}`}
                                                type="text"
                                                maxLength="1"
                                                className="form-control otp-digit"
                                                value={val}
                                                {...register(`digit${i + 1}`)}  
                                                onChange={(e) => handleChange(e, i)}
                                                onKeyDown={(e) => handleKeyDown(e, i)}
                                            />
                                        ))}
                                    </div>

                                    {/* ERROR MESSAGE */}
                                    <div className="error-msg mt-2">
                                         {(errors.digit1 ||
                                        errors.digit2 ||
                                        errors.digit3 ||
                                        errors.digit4 ||
                                        errors.digit5 ||
                                        errors.digit6) &&
                                        "Please enter all 6 digits of the OTP"}
                                    </div>
                                    {/* Server error */}
                                    {errorMessage && (
                                        <div id="error_message" className="error mt-2">
                                        {errorMessage}
                                        </div>
                                    )}

                                    <Button type="submit" className="btn primary-btn">Verify OTP</Button>

                                    <div id="resendotp" onClick={resendOpt} className="resend-otp">Resend OTP</div>
                                </Form>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            
            <Footer/>
        </div>
    );
}

export default Loginauthentication;
