
    import axios from "axios";
    import {Container, Col, Form,InputGroup,Row} from 'react-bootstrap';
    import { useNavigate,useLocation} from 'react-router-dom';
    import { useEmail } from "../context/AuthContext";

    import { useForm} from "react-hook-form";
    import { yupResolver } from "@hookform/resolvers/yup";
    import * as yup from "yup";
    const LoginForm = () => {

        const navigate = useNavigate();

        const { setEmail } = useEmail();
        
        const schema = yup.object().shape({
            email: yup.string().email('Invalid email').required('Required field'),
        });
        
        
        const {
            register,
            handleSubmit,
            formState: { errors }
        } = useForm({
            resolver: yupResolver(schema),
            defaultValues:{
                email: ""
            }
        });

        const onSubmit = async (data) => {
            try {
                const response = await axios.post("https://jsonplaceholder.typicode.com/posts", data);
                
                if(response.status === 201){
                    setEmail(data.email);
                    navigate('loginauthentication')
                }
                
            } catch (error) {
                console.log("Error:", error);
            }
        }

        
        return (
            <section className="section3">
                <Container>
                    <div className="agendacontent">
                    <Row className="loginrow hm-register" id="hm-register">
                        <Col lg={12} className="logindiv">
                        <div className="loginleft registerformdiv">
                            <h3 className="h3title">Register now</h3>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <div className="w_902 home-register">
                                    <Row>
                                        <Col md={12}>
                                            <div className="hm-center hm-registration">

                                            {/* EMAIL FIELD */}
                                            <Form.Group className="label--group mb-10">
                                                <Form.Label className="mb-10">ENTER YOUR EMAIL ADDRESS</Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    className="form-input"
                                                    {...register("email")}
                                                    isInvalid={!!errors.email}
                                                />

                                                <div className="error-msg">
                                                    {errors.email?.message}
                                                </div>
                                            </Form.Group>

                                            {/* Submit Button */}
                                            <div className="hm-registration-btn">
                                                <button type="submit" className="mt-3 primary-btn">Login</button>
                                            </div>

                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>

                        </div>
                        </Col>
                    </Row>
                    </div>
                </Container>
            </section>

        );
    };

    export default LoginForm;