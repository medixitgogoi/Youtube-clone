const LeftNavMenuItem = ({ text, icon, action, className }) => {
    return (
        <div
            className={`text-white text-xs cursor-pointer h-8 flex items-center px-3 mb-1 rounded-lg hover:bg-white/[0.15] ${className}`}
            onClick={action}
        >
            <span className='text-base mr-3'>{icon}</span>
            <span>{text}</span>
        </div>
    );
}

export default LeftNavMenuItem;
