const CommentList = ({weddingMessages}) => {
    return (
        <>
            <div className="messages_container">
                {
                    weddingMessages.map((message) => {
                        return (<div className="messages_preview" key={message.id}>
                            <h2>{message.attendee_name}</h2>
                            <p>{message.attendee_message}</p>
                        </div>)
                    })
                }

            </div>
        </>
    )
}

export default CommentList;