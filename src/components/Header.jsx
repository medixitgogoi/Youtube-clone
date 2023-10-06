import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../context/contextApi';
import Loader from '../loader/loader';
import { CgClose } from "react-icons/cg";
import { SlMenu } from "react-icons/sl";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";
import { IoIosSearch } from "react-icons/io";

const Header = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const { loading, mobileMenu, setMobileMenu } = useContext(Context);

    const searchQueryHandler = (e) => {
        if ((e?.key === "Enter" || e === "searchButton") && searchQuery?.length > 0) {
            navigate(`/searchResult/${searchQuery}`);
            setMobileMenu(false);
        }
    }

    const mobileMenuToggle = () => {
        setMobileMenu(!mobileMenu);
    }

    const { pathname } = useLocation();
    const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

    return (
        <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-12 px-2 md:px-4 bg-white dark:bg-[#0f0f0f]">
            {loading && <Loader />}

            <div className="flex h-3 items-center">
                {pageName !== "video" && (
                    <div
                        className="flex lg:hidden mr-2 md:mr-6 cursor-pointer items-center justify-center h-6 w-6 rounded-full hover:bg-[#303030]/[0.6]"
                        onClick={mobileMenuToggle}
                    >
                        {mobileMenu ? (
                            <CgClose className="text-white text-lg" />
                        ) : (
                            <SlMenu className="text-white text-lg" />
                        )}
                    </div>
                )}
                <Link to="/" className="flex h-4 md:h-[18px] items-center" onClick={() => setSearchQuery("")}>
                    <img
                        className="h-full hidden dark:md:block"
                        src={ytLogo}
                        alt="Youtube logo"
                    />
                    <img
                        className="h-full md:hidden"
                        src={ytLogoMobile}
                        alt="Youtube logo"
                    />
                </Link>
            </div>

            <div className="group flex items-center">
                <div className="flex h-8 md:h-9 md:ml-10 md:pl-5 border border-white/[0.25] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
                    <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
                        <IoIosSearch className="text-white text-lg" />
                    </div>
                    <input
                        type="text"
                        className="bg-transparent outline-none text-white text-[13px] px-5 md:pl-0 w-52 md:w-64 lg:w-[450px]"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                        placeholder={`Search for "new songs" `}
                        value={searchQuery}
                    />
                </div>
                <button
                    className="w-[30px] md:w-[42px] h-8 md:h-9 flex items-center justify-center border border-l-0 border-white/[0.2] rounded-r-3xl bg-white/[0.1]"
                    onClick={() => searchQueryHandler("searchButton")}
                >
                    <IoIosSearch className="text-white" />
                </button>
            </div>
            <div className="flex items-center">
                <div className="hidden md:flex">
                    <div className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-[#303030]/[0.8]">
                        <RiVideoAddLine className="text-white cursor-pointer" />
                    </div>
                    <div className="flex items-center justify-center ml-2 h-9 w-9 rounded-full hover:bg-[#303030]/[0.8]">
                        <FiBell className="text-white cursor-pointer" />
                    </div>
                </div>
                <div className="flex h-6 w-6 overflow-hidden rounded-full md:ml-4">
                    <img src="https://www.shutterstock.com/image-vector/man-icon-vector-250nw-1040084344.jpg" />
                </div>
            </div>
        </div>
    );
}

export default Header;
