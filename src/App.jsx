import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }

    search() {
        console.log('this.state', this.state);
        const BASE_URL = "https://api.spotify.com/v1/search?";
        const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        console.log('FETCH_URL', FETCH_URL);
        fetch(FETCH_URL, {
            method: 'GET',
            headers: new Headers({
            "Authorization": "Bearer BQDdWRzzFxigFv5Xjtdp3OKO_bTIiFwI0-jWCjzV4_nx6WFX7931xI7s2keD6uJmqDAEMbZw6HgbfJG9MSXaKHtT7sGr_Vfuj5RYKmSN38GTtdxAHKMgWpwCHdEyrq8_mwDgV9KWH9ekpWSwycTtw26tEP8D5rZZ-aRSEODv-1R4XlpKf0I&refresh_token=AQDJMsy923GLRW-wVsMBKFbFgoo-TTQTJJWKXh3mceSVxjL57WmeJlKFYHEEY5bCXwkZHtFUKcFV9horPVzCP0Mjqy37PFiak2m0YL9NIKmOCUKZHUqWJ5uWn6YFiSU8KBY"
            })
        })
        .then(response => response.json())
        .then(json => console.log('json', json));
    }

    render() {
        return (
            <div className="App">
                <div className="App-title">Music Master</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search for an Artist"
                            value={this.state.query}
                            onChange={event => {this.setState({query: event.target.value})}}
                            onKeyPress={event => {
                                if(event.key === 'Enter') {
                                    this.search()
                                }
                            }}
                        />
                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <div className="Profile">
                    <div>Artist Picture</div>
                    <div>Artist Name</div>
                </div>
                <div className="Gallery">
                    Gallery
                </div>
            </div>
        )
    }  
}

export default App;