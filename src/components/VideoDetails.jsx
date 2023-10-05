import { useState, useContext, useEffect } from 'react';
import { Context } from '../context/contextApi';
import { useParams } from 'react-router-dom';
import fetchDataFromApi from '../utils/api';
import ReactPlayer from 'react-player';
import SuggestionVideoCard from './SuggestionVideoCard';
import { abbreviateNumber } from "js-abbreviation-number";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import { HiOutlineSave } from "react-icons/hi";
import { BsFlag } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from 'react-icons/ai';
import { IoIosShareAlt } from "react-icons/io";
import { LiaDownloadSolid } from "react-icons/lia";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const VideoDetails = () => {

  const [video, setVideo] = useState({});
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [showMoreComments, setShowMoreComments] = useState(false);
  const { setLoading } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    fetchVideoDetails();
    fetchSuggestedVideos();
    fetchVideoComments();
    window.scrollTo(0, 0); {/* for the page to scroll to top when the page re-renders */ }
  }, [id])

  const fetchVideoDetails = () => {
    setLoading(true);
    fetchDataFromApi(`videos?part=snippet,statistics&id=${id}`).then((res) => {
      // console.log(res.items[0]);
      setVideo(res.items[0]);
      setLoading(false);
    })
  }

  const fetchSuggestedVideos = () => {
    setLoading(true);
    fetchDataFromApi(`search?part=snippet&relatedToVideoId=${id}&type=video`).then((res) => {
      // console.log(res.items);
      setSuggestedVideos(res.items);
      setLoading(false);
    })
  }

  const fetchVideoComments = () => {
    setLoading(true);
    fetchDataFromApi(`commentThreads?part=snippet&videoId=${id}&maxResults=30`).then((res) => {
      // console.log(res.items);
      setComments(res.items);
      setLoading(false);
    })
  }

  dayjs.extend(relativeTime);

  return (
    <main className='flex justify-center bg-black'>
      <div className='w-full max-w-[1350px] flex flex-col lg:flex-row'>
        <div className='flex flex-col w-full lg:w-[calc(100%-350px)] xl:w-[calc(100%-450px)] px-4 py-3 lg:py-6 overflow-y-auto overflow-x-hidden'>

          {/* Video player section starts */}
          <section className='h-[200px] md:h-[400px] xl:h-[500px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0'>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              playing={true}
              style={{ backgroundColor: "#000000" }}
            />
          </section>
          {/* Video player section ends */}

          {/* Video title starts */}
          <section className='text-white text-sm mt-4 md:line-clamp-2'>
            {video?.snippet?.title}
          </section>
          {/* Video title ends */}

          {/* Channel details section starts */}
          <section className='flex justify-between flex-col md:flex-row mt-3'>
            <div className="flex">
              <article className="flex items-start">
                <figure className="flex h-8 w-8 rounded-full overflow-hidden">
                  <img src={video?.snippet?.thumbnails?.medium?.url} alt="channel photo" className='h-full w-full object-cover' />
                </figure>
              </article>
              <article className='flex flex-col justify-center ml-3'>
                <div className='text-sm font-medium text-white flex items-center'>
                  {video?.snippet?.channelTitle}
                  <BsFillCheckCircleFill className='text-white/[0.5] text-[11px] ml-1' />
                </div>
                <div className='text-white/[0.7] text-xs font-[300]'>
                  {(Math.random() * 1000).toFixed(0)}K subscribers
                </div>
              </article>
            </div>
            <article className='flex gap-2 text-white mt-4 md:mt-0 cursor-pointer overflow-x-auto'>
              <div className="flex items-center justify-center h-8 px-3 rounded-3xl bg-white/[0.15]">
                <AiOutlineLike className='text-lg text-white/[0.8] mr-1' />
                <span className='text-[13px] text-white font-medium'>{`${abbreviateNumber(video?.statistics?.likeCount, 2)}`}</span>
                <span className='text-white/[0.2] mx-1 md:mx-3'>|</span>
                <span onClick={() => setLikeClicked(prev => !prev)}>
                  <AiOutlineLike className='rotate-180 text-white/[0.7]' />
                </span>
              </div>
              <div className="flex items-center justify-center h-8 px-3 rounded-3xl bg-white/[0.15]">
                <IoIosShareAlt className='text-lg text-white/[0.8] mr-1' />
                <span className='text-[13px] text-white/[0.9] font-medium'>Share</span>
              </div>
              <div className="flex items-center justify-center h-8 px-3 rounded-3xl bg-white/[0.15]">
                <LiaDownloadSolid className='text-lg text-white/[0.8] mr-1' />
                <span className='text-[13px] text-white font-medium'>Download</span>
              </div>
              <div className='flex items-center justify-center h-8 px-3 rounded-3xl bg-white/[0.15]'>
                <HiOutlineSave className='text-lg text-white/[0.8] mr-1' />
                <span className='text-[13px] text-white/[0.9] font-medium'>Save</span>
              </div>
              <div className='flex items-center justify-center h-8 px-3 rounded-3xl bg-white/[0.15]'>
                <BsFlag className='text-white/[0.8] mr-1' />
                <span className='text-[13px] text-white/[0.9] font-medium'>Report</span>
              </div>
            </article>

          </section>
          {/* Channel details section ends */}

          {/* Video description section starts */}
          <section className='text-white flex flex-col gap-2 text-xs mt-4 bg-gray-800/[0.8] px-4 py-3 rounded-lg'>
            <article className='flex gap-2 justify-between md:justify-start'>
              <span>{`${abbreviateNumber(video?.statistics?.viewCount, 2)} views`}</span>
              <time>{dayjs(video?.snippet?.publishedAt).format('MMMM D, YYYY')}</time>
            </article>
            <article className='leading-4 overflow-hidden text-justify'>
              {video?.snippet?.localized?.description}
            </article>
          </section>
          {/* Video description section ends */}

          {/* Comments section starts */}
          <section className={`text-white flex flex-col gap-3 items-start text-xs px-4 py-3 mt-4 rounded-lg ${showMoreComments ? "overflow-y-auto" : "h-32 overflow-hidden"} ${!showMoreComments && "bg-gradient-to-t from-black to-slate-800"} transition-all duration-200`}>
            <article className='flex justify-between w-full items-center mb-2'>
              <span className='text-sm'>Comments</span>
              {comments?.length > 0 && (
                <div className='flex items-center gap-[2px] cursor-pointer' onClick={() => setShowMoreComments(prev => !prev)}>
                  <span className='text-xs'>Show {showMoreComments ? "less" : "more"}</span>
                  <span className='text-lg transition-all duration-300'>{showMoreComments ? <MdOutlineKeyboardArrowDown className='rotate-180' /> : <MdOutlineKeyboardArrowDown />}</span>
                </div>
              )}
            </article>
            {comments?.map((item, index) => (
              <article className='flex gap-3 mb-3' key={index}>
                <figure className='flex h-7 w-7 rounded-full overflow-hidden'>
                  <img src={item?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl} alt="channel-avatar" className='h-full w-full object-cover' />
                </figure>
                <div className='flex flex-col gap-1'>
                  <div className='flex gap-2'>
                    <span className='font-medium'>@{item?.snippet?.topLevelComment?.snippet?.authorDisplayName}</span>
                    <time className='text-white/[0.6] text-[11px]'>{dayjs(item?.snippet?.topLevelComment?.snippet?.publishedAt).fromNow()}</time>
                  </div>
                  <span className='w-full md:w-3/4 font-light text-[11px]'>{item?.snippet?.topLevelComment?.snippet?.textDisplay}</span>
                  <div className='flex gap-2'>
                    <AiOutlineLike className='text-base text-white/[0.8]' />
                    {item?.snippet?.topLevelComment?.snippet?.likeCount !== 0 && (
                      <span className='text-xs'>{item?.snippet?.topLevelComment?.snippet?.likeCount}</span>
                    )}
                    <AiOutlineLike className='text-base rotate-180 text-white/[0.7]' />
                    <span className='ml-3'>Reply</span>
                  </div>
                </div>
              </article>
            ))}
          </section>
          {/* Comments section ends */}

        </div>

        {/* Suggested video section starts */}
        <section className='text-white flex flex-col py-[18px] px-4 lg:px-2 overflow-y-auto lg:w-[350px] xl:w-[450px]'>
          {suggestedVideos?.map((item, index) => (
            <SuggestionVideoCard
              key={index}
              video={item}
            />
          ))}
        </section>
        {/* Suggested video section ends */}

      </div>
    </main>
  );
}

export default VideoDetails;