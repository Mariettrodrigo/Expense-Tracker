import React, { useRef, useState, useEffect } from 'react';
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  // if user comes back to edit with an already selected image
  useEffect(() => {
    if (image && typeof image === 'object') {
      const preview = URL.createObjectURL(image);
      setPreviewUrl(preview);
    }
  }, [image]);

  return (
    <div className='flex flex-col items-center gap-3 mb-6'>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {previewUrl ? (
        <div className='relative'>
          <img
            src={previewUrl}
            alt="Profile preview"
            className='w-20 h-20 rounded-full object-cover'
          />
          <button
            onClick={handleRemoveImage}
            type='button'
            className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full  absolute -bottom-1 -right-1'
          >
            <LuTrash />
          </button>
        </div>
      ) : (
        <button
          onClick={onChooseFile}
          type='button'
          className='w-18 h-18 flex items-center justify-center rounded-full bg-gray-100 border-2 border-violet-500 border-dashed'
        >
          <LuUpload className='text-xl text-violet-500' />
        </button>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;