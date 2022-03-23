import React from 'react';

const bucketURL = "https://assignment2-kerem-nana-photos.s3.us-east-1.amazonaws.com/"

class ImageCard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            spans: 0,
            hover: false
        };
        this.imageRef = React.createRef();
    }

    componentDidMount() {
        this.imageRef.current.addEventListener('load', this.setSpans);
    }

    setSpans = () => {
        const height = this.imageRef.current.clientHeight;

        const spans = Math.ceil(height / 10);

        this.setState({ spans })
    }

    onMouseOver = () => {
        this.setState({ hover: true });
    }

    onMouseOut = () => {
        this.setState({ hover: false });
    }

    renderButton = () => {
        if (this.state.hover) {
            return (
                <button> hello </button>
            )
        }
    }

    onDownloadPress = () => {
        const name = this.props.image.id;
        fetch(this.props.image.urls.full, {
            method: "GET",
            headers: {}
        })
            .then(response => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", `${name}.png`); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const imageURL = bucketURL + this.props.image._source.objectKey

        return (
            <div
                className="ui image"
                style={{ gridRowEnd: `span ${this.state.spans}` }}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
            >
                <div className={`ui dimmer ${this.state.hover ? "active" : null}`} style={{ width: '91%', height: '98.5%' }}>
                    <div className="content">
                        <div className="center">
                            <h2 className="ui inverted header">Interested?</h2>
                            <div className="ui primary button" onClick={(e) => this.onDownloadPress(e)}>Download</div>
                            <a href={imageURL} target="_blank" rel="noopener noreferrer">
                                <div className="ui button">View</div>
                            </a>
                        </div>
                    </div>
                </div>
                <img ref={this.imageRef} alt="placeholder" src={imageURL} />
            </div >
        )
    }
}

export default ImageCard;