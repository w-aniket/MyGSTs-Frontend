
import "./Support.css";
import { FAQ } from "../../../Component/FAQ/FAQ";
import { Link } from "react-router-dom";
import SupportTicket from "./SupportTicket/SupportTicket";

const Support = () => {
 
  return (
    <div className="support-container">
      <section className="support-header">
        <div className="support-header-content">
          <h1>Support Center</h1>
          <p className="support-subtitle">
            Need help? Our team is here to assist you with service, tracking,
            payments, and refunds etc.
          </p>

          <p className="support-meta">
            ⏱ Response time: <strong>Within 24 hours</strong>
          </p>
        </div>
      </section>

      <FAQ />

      <SupportTicket />

        <section className="contact-support-section">
      <h2>Contact Support</h2>
      <p>
        For urgent issues or direct help, reach out to our support team through the following methods:
      </p>

      <ul className="contact-list">
        <li>
          📧 Email:{" "}
          <a href="mailto:support@mygsts.com" className="contact-link">
            mygsts@gmail.com
          </a>
        </li>
        <li>
          📞 Phone / WhatsApp:{" "}
          <a href="tel:+918830078732" className="contact-link">
            +91 8830078732
          </a>
        </li>
        <li>
          ⏰ Support Hours: Mon – Sat, 10 AM – 6 PM
        </li>
      </ul>
    </section>

     <footer className="support-footer-links">
      <h3>Helpful Links</h3>
      <ul>
        <li>
          <Link to="/terms" className="footer-link">Terms & Conditions</Link>
        </li>
        <li>
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
        </li>
        <li>
          <Link to="/refund-policy" className="footer-link">Refund Policy</Link>
        </li>
        <li>
          <Link to="/contact" className="footer-link">Contact Page</Link>
        </li>
      </ul>
    </footer>
    </div>
  );
};

// const Support = () => {
//    const [ticket, setTicket] = useState({
//     issueType: "",
//     serviceRequest: "",
//     message: "",
//     attachment: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setTicket({
//       ...ticket,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Support Ticket Submitted:", ticket);
//     alert("Support ticket submitted successfully!");
//   };

//   return (
//     <div className="support-container">
//       {/* Header */}
//       <div className="support-header">
//         <h1>Support & Help Center</h1>
//         <p>Get help with services, payments, documents, and refunds.</p>

//         <input
//           type="text"
//           className="support-search"
//           placeholder="Search for help (e.g. GST filing, refund, payment)"
//         />
//       </div>

//       {/* Quick Help Cards */}
//       <div className="support-cards">
//         {[
//           "Service Requests & Status",
//           "Payments & Refunds",
//           "Document Upload Issues",
//           "Cancellations & Refund Policy",
//           "Account & Login Issues",
//         ].map((item, index) => (
//           <div className="support-card" key={index}>
//             <h3>{item}</h3>
//           </div>
//         ))}
//       </div>

//       {/* FAQ Section */}
//       <div className="support-faq">
//         <h2>Frequently Asked Questions</h2>

//         <ul>
//           <li>When does work start after payment?</li>
//           <li>Can I pay for a service later?</li>
//           <li>How can I cancel a service?</li>
//           <li>When will I receive my refund?</li>
//           <li>What documents can I upload?</li>
//         </ul>
//       </div>

//       {/* Raise Ticket */}
//       <div className="support-ticket">
//         <h2>Raise a Support Ticket</h2>

//         <form onSubmit={handleSubmit}>
//           <select
//             name="issueType"
//             value={ticket.issueType}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Issue Type</option>
//             <option value="service">Service Issue</option>
//             <option value="payment">Payment / Refund</option>
//             <option value="documents">Document Upload</option>
//             <option value="account">Account / Login</option>
//           </select>

//           <input
//             type="text"
//             name="serviceRequest"
//             placeholder="Related Service Request (optional)"
//             value={ticket.serviceRequest}
//             onChange={handleChange}
//           />

//           <textarea
//             name="message"
//             placeholder="Describe your issue"
//             value={ticket.message}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="file"
//             name="attachment"
//             onChange={handleChange}
//           />

//           <button type="submit">Submit Ticket</button>
//         </form>
//       </div>

//       {/* Contact Info */}
//       <div className="support-contact">
//         <h3>Contact Support</h3>
//         <p>Email: support@mygsts.com</p>
//         <p>Working Hours: Mon–Fri, 9 AM – 6 PM</p>
//       </div>
//     </div>
//   );
// }
export default Support;
