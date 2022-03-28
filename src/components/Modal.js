import React from "react";
import amazonCognito from '../api/amazon_cognito';
import "./Modal.scss";
import axios from 'axios';

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });
  }

class Modal extends React.Component {

    state = {
        selectedFile: null,
        customLabels: "",
    };

    onFileChange = event => {
        console.log(event.target.files[0])
        this.setState({ selectedFile: event.target.files[0] });
    };

    onLabelChange = event => {
        this.setState({ customLabels: event.target.value });
    };

    onPressSubmit = async () => {
        let baseURL = "https://qhqe778kf6.execute-api.us-east-1.amazonaws.com/dev"
            + '/upload/assignment2-kerem-nana-photos/' + this.state.selectedFile.name;


        const response = await axios.put(baseURL, this.state.selectedFile, {
            headers: {
                'Content-Type': this.state.selectedFile.type,
                'x-amz-meta-customLabels': this.state.customLabels,
            }
        })
        
        console.log(response)
        this.props.onPressClose()

    }

    render() {
        return this.props.show ? (
            <div class="modal" id="modal">
                <h2>Upload a Photo</h2>
                <div class="content">
                    <div class="modal-field">
                        <div class="field-text"> Name </div>
                        <input class="field-value" type="text" name="name" />
                    </div>
                    <div class="modal-field">
                        <div class="field-text"> Tags </div>
                        <input class="field-value" type="text" name="tags" onChange={(e) => {this.onLabelChange(e)}}/>
                    </div>
                    <div class="modal-field">
                        <div class="field-text"> Photo </div>
                        <input class="field-value" type="file" onChange={(e) => { this.onFileChange(e) }} name="photo" />
                    </div>
                </div>
                <div class="actions">
                    <button class="toggle-button submit" onClick={() => this.onPressSubmit()}>
                        Upload
                    </button>
                    <button class="toggle-button cancel" onClick={() => this.props.onPressClose()}>
                        Cancel
                    </button>
                </div>
            </div>
        ) :
            (
                null
            );
    }
}

export default Modal