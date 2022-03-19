import React from "react";
import { FaMicrophoneAlt } from 'react-icons/fa';
import { FaMicrophoneAltSlash } from 'react-icons/fa';

class SearchBar extends React.Component {
    state = {
        term: "",
        listening: false,
    }

    onFormSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.term)
    }
    
    listeningEvent = () => {
       
        window.addEventListener("DOMContentLoaded", () => {
        const button = document.getElementById("button");
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if (typeof SpeechRecognition === "undefined") {
            button.remove();
            const message = document.getElementById("message");
            message.removeAttribute("hidden");
            message.setAttribute("aria-hidden", "false");
        } else {
            const recognition = new SpeechRecognition();
            const start = () => {
                recognition.start();
            };
            const stop = () => {
                recognition.stop();
            };
            const onResult = event => {
                for (const res of event.results) {
                    this.setState({ term: res[0].transcript});
                }
            };
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.addEventListener("result", onResult);

            button.addEventListener("click", () => {
                this.state.listening ? stop() : start();
                this.setState({ listening: !this.state.listening})
            });
        }
        });

    }
    renderLoading = () => {
        if (this.props.loading) {
            return (
                <div className="ui icon message">
                    <i className="notched circle loading icon"></i>
                    <div className="content">
                        <div className="header">
                            Just one second
                        </div>
                        <p>We're fetching that content for you.</p>
                    </div>
                </div>
            )
        }
        return null;
    }

    renderButton = () => {
        if (this.state.listening) {
            return (
                <div className="column mt-2">
                    <button id="button">
                        <FaMicrophoneAltSlash/>
                    </button>
                </div>
            )
        }
        return (
            <div className="column mt-2">
                <button id="button">
                    <FaMicrophoneAlt/>
                </button>
            </div>
        )

    }

    render() {
        return (
            <div className="ui segment">
                <div className="container">
                    <div className="row">
                        <div className="column">
                            <form className="ui form mb-2" onSubmit={this.onFormSubmit}>
                                <div className="field">
                                    <label> Image Search</label>
                                    <input
                                        type='text'
                                        value={this.state.term}
                                        onChange={(e) => this.setState({ term: e.target.value })}
                                        placeholder='e.g cars'
                                    />
                                    {this.renderLoading()}
                                </div>
                            </form>
                        </div>
                        <div className="column mt-2">
                            {this.renderButton()}
                        </div>
                        {this.listeningEvent()}
                        <div className="column">
                            <p id="message" hidden aria-hidden="true">
                                Your browser doesn't support Speech Recognition. Sorry.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBar;
