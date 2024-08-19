const Modal = (props) => {
    return (
        <div className="modal">
            <div className="modal_header">
                <h1>{props.title ?? 'Title'}</h1>
                <button onClick={props.closeHandlerFn} className="close_button">
                    X
                </button>
            </div>
            <div className="modal_content">
               <div className="main_content"> {props.content ?? 'Content'}</div>
                <div className="modal_respond">
                    <button onClick={props.respondOneFn}>{props.respond_one ?? 'Yes'}</button>
                    <button onClick={props.respondTwoFn}>{props.respond_two ?? 'No'}</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;