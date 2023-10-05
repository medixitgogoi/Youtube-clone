import { Link } from 'react-router-dom';
import { BsFillCheckCircleFill } from "react-icons/bs";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import { useContext } from 'react';
import { Context } from '../context/contextApi';

const VideoCard = ({ video }) => {

    const { mobileMenu } = useContext(Context);
    dayjs.extend(relativeTime);

    return (
        <Link to={`/video/${video?.id?.videoId}`}>

            <div className='flex flex-col mb-8 hover:opacity-80 transition-all duration-300'>
                <figure className={`relative h-40 rounded-md hover:rounded-none transition-all duration-200 overflow-hidden ${mobileMenu && "opacity-50 lg:opacity-100"}`}>
                    <img
                        src={video?.snippet?.thumbnails?.high?.url}
                        alt="thumbnail"
                        className='h-full w-full object-cover'
                    />
                </figure>
                <div className='flex text-white mt-3'>
                    <div className='flex items-start'>
                        <div className={`flex h-7 w-7 rounded-full overflow-hidden ${mobileMenu && "opacity-50 lg:opacity-100"}`}>
                            <img src={video?.snippet?.thumbnails?.medium?.url} alt="channel avatar" className='h-full w-full object-cover' />
                        </div>
                    </div>
                    <div className='flex flex-col ml-3 overflow-hidden'>
                        <span className={`text-[13px] font-medium line-clamp-2 ${mobileMenu && "opacity-50 lg:opacity-100"}`}>
                            {video?.snippet?.title}
                        </span>
                        <span className='text-[12px] mt-[5px] text-white/[0.6] flex items-center'>
                            {video?.snippet?.channelTitle}
                            <BsFillCheckCircleFill className='text-white/[0.5] text-[11px] ml-1' />
                        </span>
                        <div className='flex text-[12px] text-white/[0.6] truncate overflow-hidden'>
                            <span>{(Math.random() * 8).toFixed(1)}M views</span>
                            <span className='flex text-[22px] leading-none font-medium text-white/[0.7] relative top-[-8px] mx-1'>.</span>
                            <span className='truncate'>{dayjs(video?.snippet?.publishTime).fromNow()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default VideoCard;
