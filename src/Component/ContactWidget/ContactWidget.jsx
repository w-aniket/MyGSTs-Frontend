import React from 'react'
import {FaWhatsapp, FaPhone, FaEnvelope} from "react-icons/fa"
import "./ContactWidget.css"

const ContactWidget = () => {
  return (
    <div>
        <div className="contact-widget">
            <a  href="https://wa.me/+918830078732"
                target="_blank"
                rel="noopener noreferrer"
                className='icon whatsapp'
            >
                <FaWhatsapp />
            </a>

            <a href="tel:+918830078732" className='icon phone'><FaPhone /></a>

            <a href="/contact" className='icon email'><FaEnvelope/></a>
        </div>
    </div>
  )
}

export default ContactWidget