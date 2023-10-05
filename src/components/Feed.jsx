import { useContext } from 'react';
import { Context } from '../context/contextApi';
import LeftNav from './LeftNav';
import VideoCard from './VideoCard';

const Feed = () => {

    const { loading, searchResults } = useContext(Context);

    return (
        <div className='flex h-[calc(100%-48px)]'>
            <LeftNav />
            <div className="grow w-[calc(100%-200px)] bg-black h-full overflow-y-auto">
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-5'>
                    {!loading && (
                        searchResults?.map((item) => (
                            <VideoCard key={item?.id?.videoId} video={item} />
                        )))}
                </div>
            </div>
        </div>
    );
}

export default Feed;
