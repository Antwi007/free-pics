import React from 'react';

class SearchBar extends React.Component {
    state = {
        term: "",
    }

    onFormSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.term)
    }

    renderLoading = () => {
        if (this.props.loading) {
            return (
                <div class="ui icon message">
                    <i class="notched circle loading icon"></i>
                    <div class="content">
                        <div class="header">
                            Just one second
                        </div>
                        <p>We're fetching that content for you.</p>
                    </div>
                </div>
            )
        }
        return null;
    }

    render() {
        return (
            <div className="ui segment">
                <form className="ui form " onSubmit={this.onFormSubmit}>
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
        )
    }
}

export default SearchBar;