import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading
  const accessToken = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('userRole'); // Get the user role from local storage

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        let response;
        if (userRole === '2') {
          // Make API call for Buyer
          response = await axios.get('https://farmlink-ewxs.onrender.com/buyer/profile/', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        } else if (userRole === '1') {
          // Make API call for Farmer
          response = await axios.get('https://farmlink-ewxs.onrender.com/farmer/profile/', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        }
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    fetchUserProfile();
  }, [accessToken, userRole]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Fallback if userData is not loaded yet
  if (!userData) {
    return <div>Error loading profile data.</div>;
  }

  if (userRole === '2') {
    // Buyer profile rendering
    const { user, profile } = userData;
    const firstLetter = user.name.charAt(0); // Get the first letter of the name
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(firstLetter)}&background=random&color=fff&size=150`;

    return (
      <div>
        <section>
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-body text-center">
                    <img
                      src={avatarUrl}
                      alt="avatar"
                      className="rounded-circle img-fluid"
                      style={{ width: '115px' }}
                    />
                    <h5 className="my-3">{user.name}</h5>
                    <p className="text-muted mb-1">{user.role === 1 ? 'Farmer' : 'Buyer'}</p>
                    <p className="text-muted mb-4">{profile.company_name}</p>
                    <div className="d-flex justify-content-center mb-2">
                      <button type="button" className="btn btn-primary">
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Full Name</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{user.name}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{user.email}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Phone</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{user.phone_no}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Company Address</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{profile.company_address}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Company Zipcode</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{profile.company_zipcode}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">GST No</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{profile.gst_no}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (userRole === '1') {
    // Farmer profile rendering
    const [user, profile] = userData.data;
    const firstLetter = user.name.charAt(0);
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(firstLetter)}&background=random&color=fff&size=150`;

    return (
      <div>
        <section>
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-body text-center">
                    <img
                      src={avatarUrl}
                      alt="avatar"
                      className="rounded-circle img-fluid"
                      style={{ width: '115px' }}
                    />
                    <h5 className="my-3">{user.name}</h5>
                    <p className="text-muted mb-1">Farmer</p>
                    <p className="text-muted mb-4">{profile.farm_name}</p>
                    <div className="d-flex justify-content-center mb-2">
                      <button type="button" className="btn btn-primary">
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Full Name</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{user.name}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{user.email}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Phone</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{user.phone_no}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Farm Name</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{profile.farm_name}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Farm Location</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{profile.farm_location}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Farm Size</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{profile.farm_size}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return <div>Error loading user profile</div>;
};

export default Profile;
