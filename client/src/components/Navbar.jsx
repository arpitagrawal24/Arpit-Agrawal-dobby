/* eslint-disable react/prop-types */

const Navbar = ({ isLoggedIn, setUpload, upload, handleSearch, searchTerm }) => {

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload();
    }

    return (
        <nav className='flex justify-between items-center p-4 bg-gray-900 text-white'>
            <h1 className='text-2xl font-bold'>Image Hub</h1>
            <input
                type="text"
                className="block w-1/2 border rounded-md py-2 px-3 m-2 focus:outline-none focus:border-blue-500  text-gray-500"
                placeholder="Search for images"
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className='flex items-center'>
                <button className='px-4 py-2 bg-blue-500 text-white rounded-lg mr-2'
                    onClick={() => setUpload(!upload)}
                >Upload</button>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className='px-4 py-2 bg-blue-500 text-white rounded-lg'>Logout</button>
                ) : (
                    <button className='px-4 py-2 bg-blue-500 text-white rounded-lg'>Login</button>
                )}
            </div>
        </nav>
    )
}

export default Navbar
