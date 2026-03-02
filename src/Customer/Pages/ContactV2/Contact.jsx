// Contact.jsx (Corporate Business Design)
import React from "react";
import { Helmet } from "react-helmet-async";
import ContactForm from "../../../Component/ContactForm/ContactForm";

const Contact = () => {

  return (
    <>
      {/* 🔥 SEO START */}
      <Helmet>
        <title>Contact MyGSTs | GST, ITR & Business Compliance Support</title>

        <meta
          name="description"
          content="Get in touch with MyGSTs for GST filing, ITR filing, MSME registration, accounting, and business compliance services in India."
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://www.mygsts.in/contact" />
        {/* Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "MyGSTs",
            "url": "https://www.mygsts.in",
            "email": "mygstsofficial@gmail.com",
            "telephone": "+91-8830078732",
            "address": {
              "@type": "PostalAddress",
              "streetAddress":
                "Thite Wasti, Sr. No. 14/1, Near Thite Bunglow",
              "addressLocality": "Kharadi",
              "addressRegion": "MH",
              "postalCode": "411014",
              "addressCountry": "IN",
            },
            "sameAs": [
              "https://www.instagram.com/mygsts.official"
            ],
          })}
        </script>
      </Helmet>

          <ContactForm />

    </>
  );
};

export default Contact;
