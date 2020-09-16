import React from 'react';
import unsplash from '../api/unsplash';
import SearchBar from './SearchBar';
import ImageList from './ImageList';
import Header from './Header';

class App extends React.Component {
    state = { images: [], loading: false };

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

    render() {
        return (
            <div className="ui container" style={{ marginTop: '10px' }}>
                <Header />
                <SearchBar onSubmit={this.onSearchSubmit.bind(this)} loading={this.state.loading} />
                <ImageList images={this.state.images} />
            </div>
        )
    }
}

export default App