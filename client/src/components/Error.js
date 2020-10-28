import React from 'react'

function Error(message) {
    const loadingStyle = {
        position: "absolute",
        top: "0",
        right:"0",
        left:"0",
        bottom:"0",
        backgroundColor:"rgb(0 0 0 / 80%)",
        zIndex:"3"
    }
    return (
        <div  className="d-flex flex-column justify-content-center align-items-center"
        style={loadingStyle}>
        {/* <div class="p-2 bd-highlight">Flex item 1</div>
        <div class="p-2 bd-highlight">Flex item 2</div> */}
        {Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
        })}
        </div>
    )

}
export default Error