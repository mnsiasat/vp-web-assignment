import React from 'react'
import classes from "./Modal.module.scss";

const Modal = props => {
    const { show, children } = props

    return (show &&
        <div className={classes.modal}>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Modal