import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/About.css";
import Thabo from "../components/us/Thabo.jpg";
import Kay from "../components/us/Kay.jpg";

const About = () => {
  return (
    <div className="about-wrapper">
      <Header />

      <section className="about-page">
        <div className="about-content">
          <div className="about-intro">
            <h1>About IWB Technologies</h1>
            <p>
              IWB Technologies is a proudly Basotho-owned tech company founded in
              2024 with<br/> a mission to provide cutting-edge, affordable, and
              sustainable technology solutions.<br/> We specialize in recycling and
              reselling high-quality computers, smartphones, and<br/> accessories to
              empower individuals and businesses across Southern Africa.
            </p>
          </div>

          <div className="founders-section">
            <h2>Meet the Founders</h2>
            <div className="founder-cards">
              <div className="founder-card">
                <img 
                  src={Thabo} width={150}
                />
                <h3>Kenneth M.</h3>
                <p>Co-Founder & CTO</p>
                <p>
                  Kenneth brings a strong background in hardware recycling and
                  software integration, driving the tech innovation behind IWB.
                </p>
              </div>
              <div className="founder-card">
                <img
                  src={Kay} width={150} height={150} 
                />
                <h3>Shadrack L.</h3>
                <p>Co-Founder & CEO</p>
                <p>
                  With a sharp entrepreneurial mindset, Shadrack leads the
                  strategic growth and expansion of IWB across Southern Africa.
                </p>
              </div>
            </div>
          </div>

          <div className="contact-section">
            <h2>Contact Us</h2>

            <p>
              We’d love to hear from you! Reach out with your questions,<br/>
              partnership opportunities, or support needs:
            </p>
            
            <ul>
              <li>
                Email:{" "}
                <a href="mailto:support@iwbtech.co.ls">support@iwbtech.co.ls</a>
              </li>
              <li>Phone: +266 5000 1234</li>
              <li>Location: Maseru, Lesotho</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
