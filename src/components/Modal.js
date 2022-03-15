import React from "react";
import "./Modal.scss";

const Modal = ({ show, onPressClose }) => {
    return show ? (
        <div class="modal" id="modal">
            <h2>Upload a Photo</h2>
            <div class="content">
                <div class="modal-field"> 
                    <div class="field-text"> Name </div>
                    <input class="field-value" type="text" name="name" />
                </div>
                <div class="modal-field"> 
                    <div class="field-text"> Tags </div>
                    <input class="field-value" type="text" name="tags" />
                </div>
                <div class="modal-field"> 
                    <div class="field-text"> Photo </div>
                    <input class="field-value" type="file" name="photo" />
                </div>
            </div>
            <div class="actions">
                <button class="toggle-button submit">
                    Upload
                </button>
                <button class="toggle-button cancel" onClick={onPressClose}>
                    Cancel
                </button>
            </div>
        </div>
    ) :
        (
            null
        );
}

export default Modal