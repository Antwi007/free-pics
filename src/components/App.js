import React from 'react';
import unsplash from '../api/unsplash';
import SearchBar from './SearchBar';
import ImageList from './ImageList';
import Header from './Header';
import Modal from './Modal';

class App extends React.Component {
    state = { images: [], loading: false, modal: false };

    async onSearchSubmit(term) {
        this.setState({ loading: true });

        const response = await unsplash.get('/search/photos', {
            params: {
                query: term
            },
        })

        this.setState({
            images: response.data.results,
            loading: false
        })
    }

    showModal() {
        this.setState({ modal: true })
    }

    closeModal() {
        this.setState({ modal: false })
    }

    renderContent = () => {
        if (this.state.modal) {
            return <Modal show={this.state.modal} onPressClose={() => this.closeModal()} />
        } else {
            return (
            <>
                <SearchBar onSubmit={this.onSearchSubmit.bind(this)} loading={this.state.loading} />
                <ImageList images={this.state.images} />
            </>
            )
        }
    }

    render() {
        return (
            <div className="ui container" style={{ marginTop: '10px' }}>
                <Header onPostClick={() => this.showModal()} />
                {this.renderContent()}
            </div>
        )
    }
}

export default App