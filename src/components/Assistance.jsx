
       import signinicon from '../assets/images/regform/poly-sign-in.svg';
    const Assistance = () => {
      return (
        <section className="section3">
          <div className="container">
              <div className="agendacontent">            
                  <div className="row loginrow hm-register" id="hm-register">
                      <div className="col-lg-12 logindiv">                      
                          <div className="loginright RegAssistancediv">
                              <img src={signinicon} className="img-fluid" alt="" />
                              <h3 className="h3title">Registration Assistance</h3>
                              <p className="paratext">                 
                                  For enquiries or assistance, please email <a href="mailto:futureready@pmgasia.com" target="_blank" className="hyperlink">HP Future Ready 2026 Secretariat</a><br/> or contact us at : <a href="tel:+6560133395" target="_blank" className="hyperlink">+65 6013 3395</a>.
                              </p>
                          </div>             
                      </div>
                  </div>            
              </div> 
          </div>
      </section>
      );
    };

    export default Assistance;