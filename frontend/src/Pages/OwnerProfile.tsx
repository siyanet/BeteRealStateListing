import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { User } from '../Redux/teamMember';
import axiosInstance from '../Components/axiosInstance';
import OwnerComponent from '../Components/OwnerComponent';
import { InputField } from '../Components/FormComponents';
import {  InputLabel } from '@mui/material';
import { Edit } from 'lucide-react';
import { toast } from 'react-toastify';

interface OwnerProfileData {
  user: User;
  uuid: string;
  business_name: string;
  business_license: string;
  contact_number: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

const OwnerProfile: React.FC = () => {
  const [profile, setProfile] = useState<OwnerProfileData | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    business_name: '',
    contact_number: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
          const response = await axiosInstance.get<{ owner: OwnerProfileData }>('owner/profile/update/');
          const ownerData = response.data.owner;
          setProfile(ownerData);
          setFormData({
            first_name: ownerData.user.first_name,
            last_name: ownerData.user.last_name,
            email: ownerData.user.email,
            business_name: ownerData.business_name,
            contact_number: ownerData.contact_number
          });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditToggle = (): void => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await axiosInstance.put('owner/profile/update/', {
        user: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email
        },
        business_name: formData.business_name,
        contact_number: formData.contact_number
      });
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('There was an error updating your profile.');
    }
  };

  if (!profile) return <div className="text-center py-10 text-amber-500">Loading...</div>;

  return (
    <OwnerComponent>
      <div className="mx-auto p-6 bg-white rounded-lg mt-8">
        <h1 className="text-3xl font-bold text-amber-500 mb-6 ">Owner Profile</h1>

        <div className="flex justify-end mb-4">
          <button
            onClick={handleEditToggle}
            className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
          >
            {isEditing ? 'Cancel' : <Edit/>}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <InputLabel htmlFor = "first_name" >First Name</InputLabel>
            <InputField
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div>
            <InputLabel htmlFor = "last_name" >Last Name</InputLabel>
            <InputField
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div>
          <InputLabel htmlFor = "email">Email</InputLabel>
            <InputField
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
          
            />
          </div>

          <div>
            <InputLabel htmlFor = "business_name">Business Name</InputLabel>
            <InputField
              type="text"
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
              disabled={!isEditing}
              
            />
          </div>

          <div>
            <InputLabel htmlFor = "contact_number">Contact Number</InputLabel>
            <InputField
              type="text"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              disabled={!isEditing}
            
            />
          </div>

          <div>
            <InputLabel>Business License</InputLabel>
            <img
              src={profile.business_license}
              alt="Business License"
              className="w-48 h-auto rounded border bg-amber-300"
            />
          </div>

          <div className="flex items-center gap-2">
            <InputLabel>Verfied</InputLabel>
            <input
              type="checkbox"
              checked={profile.verified}
              readOnly
              className="h-5 w-5 accent-amber-500"
            />
          </div>

          {isEditing && (
            <div className="text-center">
              <button
                type="submit"
                className="mt-6 px-6 py-2 bg-amber-500 text-white font-semibold rounded hover:bg-amber-600 transition"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </OwnerComponent>
  );
};

export default OwnerProfile;

