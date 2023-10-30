import React from 'react';
import EditProfile from './editProfile';

function EditProfilePage(): JSX.Element {
  return (
    <div className="flex">
      <div className="flex-1 bg-white">
        <EditProfile />
      </div>
    </div>
  );
}

export default EditProfilePage;
