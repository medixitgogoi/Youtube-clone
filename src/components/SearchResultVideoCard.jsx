import { Link } from 'react-router-dom';
import { BsFillCheckCircleFill } from "react-icons/bs";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import { useContext } from 'react';
import { Context } from '../context/contextApi';

const SearchResultVideoCard = ({ video }) => {

  const { mobileMenu } = useContext(Context);
  dayjs.extend(relativeTime);

  return (
    <Link to={`/video/${video?.id?.videoId}`}>
      <div className='flex flex-col md:flex-row mb-8 md:mb-1 lg:hover:bg-white/[0.1] rounded-xl md:p-3'>

        <figure className={`relative flex shrink-0 h-44 md:h-32 lg:h-32 xl:h-40 w-full md:w-52 lg:w-56 xl:w-72 rounded-lg bg-slate-800 overflow-hidden ${mobileMenu && "opacity-50"}`}>
          <img
            src={video?.snippet?.thumbnails?.high?.url}
            alt="thumbnail"
            className='h-full w-full object-cover'
          />
        </figure>

        <div className='flex flex-col ml-3 md:ml-5 mt-3 md:mt-0 overflow-hidden'>
          <span className={`line-clamp-2 text-white leading-5 lg:leading-6 ${mobileMenu && "opacity-50"}`}>{video?.snippet?.title}</span>
          <div className='flex text-[12px] text-white/[0.6] truncate overflow-hidden'>
            <span>{(Math.random() * 8).toFixed(1)}M views</span>
            <span className='flex text-[22px] leading-none font-medium text-white/[0.7] relative top-[-8px] mx-1'>.</span>
            <span className='truncate'>{dayjs(video?.snippet?.publishTime).fromNow()}</span>
          </div>
          <div className='hidden md:flex items-center my-1'>
            <div className='flex items-start mr-3'>
              <figure className={`flex h-5 w-5 lg:h-7 lg:w-7 rounded-full overflow-hidden ${mobileMenu && "opacity-50"}`}>
                <img src={video?.snippet?.thumbnails?.medium?.url} alt="channel display picture" className='h-full w-full object-cover' />
              </figure>
            </div>
            <div className="flex flex-col">
              <span className='text-[12px] mt-[5px] text-white/[0.6] flex items-center'>
                {video?.snippet?.channelTitle}
                <BsFillCheckCircleFill className='text-white/[0.5] text-[11px] ml-1' />
              </span>
            </div>
          </div>
          <span className='empty:hidden text-[11px] line-clamp-1 md:line-clamp-2 text-white/[0.6] md:pr-20 md:my-2'>{video?.snippet?.description}</span>
        </div>

      </div>
    </Link>
  );
}

export default SearchResultVideoCard;