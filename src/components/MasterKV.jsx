
    import masterhead from '../assets/images/regform/KV_Banner.png';
    import hplogo from '../assets/images/regform/hp_main_logo.svg';
    const MasterKV = () => {
      return (
        <section className="kvsection hplogo indexkv">
            <div className="kvbanner">
                <img src={masterhead} className="img-fluid" alt="" />
            </div>
            <div className="kvsectioninfo">
                <div className="kvlogo">
                <a href="{{ url('/index') }}"><img src={hplogo} alt="HP" className="hplogoimg img-fluid"/></a>
                </div>
                <div className="kvsectiontitle">
                    <h2>HP Personal Systems<br/>Greater Asia 2026<br/>Bootcamp</h2>
                </div>
            </div>
        </section> 
      );
    };

    export default MasterKV;