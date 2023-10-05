import { Link } from 'react-router-dom';
import { BsFillCheckCircleFill } from "react-icons/bs";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";

const SuggestionVideoCard = ({ video }) => {

    dayjs.extend(relativeTime);

    return (
        <Link to={`/video/${video?.id?.videoId}`}>
            <div className='flex mb-3'>
                <div className='relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-md bg-slate-800 overflow-hidden'>
                    <img
                        src={video?.snippet?.thumbnails?.high?.url}
                        alt="thumbnail"
                        className='h-full w-full object-cover'
                    />
                </div>
                <div className='flex text-white mt-3'>
                    <div className='flex flex-col ml-3 overflow-hidden'>
                        <span className='text-[13px] font-medium line-clamp-2'>
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

export default SuggestionVideoCard;
