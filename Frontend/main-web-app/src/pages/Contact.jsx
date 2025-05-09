import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "../styles/Contact.css";

const Contact = () => {
    return (
        <div className='contact-wrapper' >
            <Header />
            <section className='contact'>
                <h1>Contact</h1>
                <h2>Feel free to contact us</h2>
                <div className="form-contact">
                    <form className='contact-form'>
                        <label htmlFor="name">
                            Names:
                        </label>
                        <input type="text" id='name'></input>
                        
                        <label htmlFor="Email"> E-mail: </label>
                        <input type='text' id='Email'></input>
                        
                        <label htmlFor="Phone">Phone (optional):</label>
                        <input type="number" id="Phone" />
                        
                        <label htmlFor="message">Message</label>
                        <input type="text" id="Message"></input>
                    </form>
                    <button type="submit">Send</button>    
                    <br />               
                </div>
                <p>
                    Phone: +266 22340
                </p>
                <br />
                <p>
                    Email: support@maserutechstore.com
                </p>
            </section>
            <Footer />
        </div>
    );
}

export default Contact;
