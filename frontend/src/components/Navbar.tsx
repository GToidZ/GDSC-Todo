import logo from './logo.jpg'

interface props {
    setShowNavbar: Function;
}

const Navbar = ({ setShowNavbar }: props) => {
    return (
        <div className="h-[5vh] items-center grid grid-cols-[10%,80%,10%] w-full bg-white font-poppins text-[#515153]">
            <div className='ml-3 flex items-center'>
                <div className='flex cursor-pointer items-center' onClick={() => { setShowNavbar() }}>
                    <img src='/list.jpg' width='30vh' alt="list" />
                </div>
                <div className='ml-4 flex h-full items-center justify-center'>
                    <img src={'/logo.jpg'} className="h-[4vh]" alt='logo' />
                    <p className='h-full ml-2 text-xl font-bold select-none'> Goodo </p>
                </div>
            </div>
        </div>
    )
}

export default Navbar