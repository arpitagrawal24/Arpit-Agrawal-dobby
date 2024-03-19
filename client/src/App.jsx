// App.js
import axios from 'axios';
import { useState, useEffect } from 'react';

import Auth from './components/Auth';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ImageList from './components/ImageList';
import ImageUpload from './components/ImageUpload';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') ? true : false);
    const [cards, setCards] = useState([]);
    const [upload, setUpload] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        const fetchImages = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/images/get/${user._id}`);
                // console.log(response.data.images);
                setCards(response.data.images);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();

    }, [upload]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredImages = cards.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div
            className='flex flex-col min-h-screen bg-gray-100 text-gray-900'
        >
            <Navbar
                isLoggedIn={isLoggedIn}
                upload={upload}
                setUpload={setUpload}
                searchTerm={searchTerm}
                handleSearch={handleSearch}
            />
            {isLoggedIn ? (
                <>
                    <ImageUpload
                        upload={upload}
                        setUpload={setUpload}
                    />
                    <ImageList cards={filteredImages} />
                </>
            ) : (
                <Auth setIsLoggedIn={setIsLoggedIn} />
            )}
            <Footer />
        </div>
    );
};

export default App;
