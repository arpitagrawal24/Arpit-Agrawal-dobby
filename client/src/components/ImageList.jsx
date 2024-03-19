/* eslint-disable react/prop-types */

const ImageList = ({ cards }) => {
    return (
        <div className='container mx-auto px-3 mt-3'>
            <h1 className='text-3xl font-bold mb-4 text-center'>Your Images</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {cards.map((card, index) => (
                    <div key={index} className='max-w-xs rounded-lg overflow-hidden shadow-lg'>
                        <img src={card.image} alt={card.name} className='w-full h-auto' />
                        <div className='p-4'>
                            <p className='text-xl font-bold'>{card.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageList;
