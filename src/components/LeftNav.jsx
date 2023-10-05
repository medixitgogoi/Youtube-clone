import React, { useContext } from 'react';
import LeftNavMenuItem from './LeftNavMenuItem';
import { Context } from '../context/contextApi';
import { useNavigate } from 'react-router-dom';
import { categories } from "../utils/constants";

const LeftNav = () => {

  const { selectedCategory, setSelectedCategory, mobileMenu, setMobileMenu } = useContext(Context);
  const navigate = useNavigate();

  const clickHandler = (type, name) => {
    if (type === "menu") {
      return;
    } else {
      setSelectedCategory(name);
    }
  }

  return (
    <div className={`md:block w-[200px] h-full overflow-y-auto py-2 bg-black absolute lg:relative z-10 lg:translate-x-0 transition-all ${mobileMenu ? "translate-x-0" : "translate-x-[-200px]"}`}>
      <div className='flex flex-col px-2'>
        {categories.map((item) => {
          return (
            <React.Fragment key={item.name}>
              <LeftNavMenuItem
                text={item.type === "home" ? "Home" : item.name}
                icon={item.icon}
                action={() => {
                  clickHandler(item.type, item.name)
                  navigate('/');
                  setMobileMenu(!mobileMenu);
                }}
                className={`${selectedCategory === item.name ? "bg-white/[0.15] font-medium" : ""}`}
              />
              {item.divider && (
                <hr className='my-5 border-white/[0.25]' />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default LeftNav;

