import React from 'react';

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
        const { description, urls } = this.props.image;

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
                            <a href={this.props.image.urls.full} target="_blank">
                                <div className="ui button">View</div>
                            </a>
                        </div>
                    </div>
                </div>
                <img ref={this.imageRef} alt={description} src={urls.regular} />
            </div >
        )
    }
}

export default ImageCard;