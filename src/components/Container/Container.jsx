

const Container = ({ children }) => {
    return (
        <div className='max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 dark:bg-gray-700'>
            {children}
        </div>
    );
};

export default Container;