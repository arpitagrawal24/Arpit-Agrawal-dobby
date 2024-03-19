/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ upload, setUpload }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [user, setUser] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            console.log('User ID not found');
            return;
        }
        setUser(JSON.parse(localStorage.getItem("user")));
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        // console.log(file);
    };


    const uploadImage = async () => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'image_preset');

        try {
            let api = import.meta.env.VITE_CLOUD_API;

            const res = await axios.post(api, data);
            const { secure_url } = res.data;

            return secure_url;

        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const imgUrl = await uploadImage();
            console.log("Image URL: ", imgUrl)
            console.log("User ID: ", user)

            const response = await axios.post(`${import.meta.env.VITE_SERVER}/images/upload`, {
                name,
                image: imgUrl,
                userId: user,
            });

            // console.log(response.data);

            if (response.status === 201) {
                setUpload(false);
                setName('');
                setImage(null);
                setError('');
            }

        } catch (error) {
            setError('Failed to upload image');
            console.error('Upload error:', error);
        }
    };

    return (
        <>
            {upload && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="max-w-md p-4 bg-white rounded-md shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Upload Image</h2>
                        {error && <div className="text-red-500 mb-2">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className="block w-full border rounded-md py-2 px-3 mb-2"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input type="file"
                                accept="image/*"
                                className="mb-4"
                                onChange={handleFileChange}
                            />

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
                                >
                                    Upload
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                                    onClick={() => setUpload(false)} // Close the upload popup on cancel
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageUpload;
