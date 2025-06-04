import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './AddJobModel.css'
import { toast } from 'react-toastify';


const AddJobModel = ({ onClose, onJobAdded , jobToEdit }) => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        qualifications: '',
        experience: '',
        ageLimit: '',
        location: '',
        skills: '',
        deadline: '',
        status: 'Active'
    });

    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (jobToEdit) {
            setFormData({
                ...jobToEdit,
                deadline: jobToEdit.deadline ? jobToEdit.deadline.split('T')[0] : '',
            })
        }
    }, [jobToEdit]);


    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (jobToEdit) {
                await axios.put(`${apiUrl}/api/jobs/${jobToEdit._id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                toast.success("Job Updated successfully!");
            } else{
                await axios.post(`${apiUrl}/api/jobs`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                toast.success("Job created successfully!");
            }
            onJobAdded();
            onClose();
        } catch (error) {
            console.error("Error Submitting job:", error)
            toast.error("Failed to submit Job");
        }
    };

  return (
    <div className='modal-overlay'>
        <div className="modal">
            <h3>{jobToEdit ? "Edit Job" : "Add New Job" }</h3>
            <form onSubmit={handleSubmit}>
                <input name='title' placeholder='Job Title' value={formData.title} onChange={handleChange} required />
                <textarea name="description" placeholder='Job Description' value={formData.description} onChange={handleChange} required ></textarea>
                <input name='qualifications' placeholder='Qualifications' value={formData.qualifications} onChange={handleChange} required />
                <input name='experience' placeholder='Experience' value={formData.experience} onChange={handleChange} required />
                <input name='ageLimit' placeholder='Age Limit' value={formData.ageLimit} onChange={handleChange} required />
                <input name='location' placeholder='Location' value={formData.location} onChange={handleChange} required />
                <input name='skills' placeholder='Skills' value={formData.skills} onChange={handleChange} required />
                <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
                <select name='status' value={formData.status} onChange={handleChange} required>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <div className="modal-actions">
                    <button type="submit">{jobToEdit ? "Update" : "Save"}</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default AddJobModel