const Loader = ({errorStatus})=>{
    return (
        <div className="loading_preview">{errorStatus ? errorStatus : 'Loading! Please Wait...'}</div>
    )
}

export default Loader;