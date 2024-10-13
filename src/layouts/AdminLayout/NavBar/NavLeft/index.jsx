import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import useWindowSize from '../../../../hooks/useWindowSize';

const NavLeft = () => {
  const windowSize = useWindowSize();
  const [userRole, setUserRole] = useState(null); // Initialize userRole state
  const [username, setUsername] = useState(''); // Initialize username state

  // Fetch the role and username from localStorage
  useEffect(() => {
    // Get role and username from localStorage
    const role = localStorage.getItem('userRole');
    const user = localStorage.getItem('user'); // Assuming the username is stored as 'user'

    setUserRole(role);  // Update the state with the fetched role
    setUsername(user);  // Update the state with the fetched username
  }, []);

  // Determine the role display text
  const roleText = userRole === "2" ? 'BUYER' : userRole === "1" ? 'FARMER' : 'Unknown Role';

  let navItemClass = ['nav-item'];
  if (windowSize.width <= 575) {
    navItemClass = [...navItemClass, 'd-none'];
  }

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav mr-auto">
        <ListGroup.Item as="li" bsPrefix=" " className={navItemClass.join(' ')}>
          {/* Display the username and role dynamically */}
          <p className='h5 text-primary'>
            {username ? `${username}  (${roleText}) `: 'Loading...'}
          </p>
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
};

export default NavLeft;
