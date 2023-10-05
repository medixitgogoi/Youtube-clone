import { useState, useEffect } from 'react';
import fetchDataFromApi from '../utils/api';

const VideoTime = ({ videoId }) => {

    const [time, setTime] = useState("");
    const [videoResults, setVideoResults] = useState([]);

    useEffect(() => {
        fetchVideoData();
    }, [])

    const fetchVideoData = () => {

        fetchDataFromApi(`videos/?part="snippet"&id="${videoId}"`).then((res) => {
            console.log(res);
            // setVideoResults(items);
        });
    }

    return (
        <div className='absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs lowercase'>
            {/* {videoResults?.[0]?.contentDetails?.duration.substr(2)} */}
        </div>
    );
}

export default VideoTime;
