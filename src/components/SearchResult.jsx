import { useState, useEffect, useContext } from 'react';
import { Context } from '../context/contextApi';
import { useParams } from 'react-router-dom';
import fetchDataFromApi from '../utils/api';
import LeftNav from './LeftNav';
import SearchResultVideoCard from './SearchResultVideoCard';

const SearchResult = () => {

    const [searchQueryResults, setSearchQueryResults] = useState([]);
    const { searchQuery } = useParams();
    const { setLoading } = useContext(Context);

    useEffect(() => {
        fetchSearchResults();
    }, [searchQuery])

    const fetchSearchResults = () => {
        setLoading(true);
        fetchDataFromApi(`search?part=snippet&q=${searchQuery}`).then((res) => {
            console.log(res.items);
            setSearchQueryResults(res?.items);
            setLoading(false);
        })
    }

    return (
        <div className='flex h-[calc(100%-48px)]'>
            <LeftNav />
            <div className='grow w-[calc(100%-190px)] h-full overflow-y-auto bg-black'>
                <div className='grid grid-cols-1 gap-2 p-5'>
                    {searchQueryResults?.map((item) => (
                        <SearchResultVideoCard
                            key={item?.id?.videoId}
                            video={item}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchResult;

