import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'
import Profile from './Profile';
import Gallery from './Gallery';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks: []
        }
    }

    search() {
        console.log('this.state', this.state);
        const BASE_URL = "https://api.spotify.com/v1/search?";
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        const headers = new Headers({
            "Authorization": "Bearer BQDveMluYpjSJ-gPaXafg39xlVvMm-YJ_9bqnknWC3IVqhO5omMwQljq7lXsemkMTcflPKQI150UrLdsjIAqL3pPoudwpym-byGaeGs3vOe9ZLpukbKZfLPSKqlZn2qX4j5-hr6b34jX3UAVsULyaL-7UsFQApyu9FlKHrDQkD3IP89JDjo&refresh_token=AQAduH689eOc4mRC3y1DSRCb-rnF0dgNJqZ-fbkycE4HvodPbNzdFSHGnK4Wr9W_bdOS-PY7252y1F8DPAq3wRdqjDoWxwBYgcme4B3c712Ik1y6vUOg3tyBLjcMG9Kzo4g"
            })
        fetch(FETCH_URL, {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(json => {
            const artist = json.artists.items[0];
            this.setState({artist});

            FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
            fetch(FETCH_URL, {
                method: 'GET',
                headers: headers
            })
            .then(response => response.json())
            .then(json => {
                console.log('artist\'s top tracks:', json);
                const { tracks } = json;
                this.setState({tracks});
            })

        });
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
                {
                    this.state.artist !== null 
                    ?
                    <div>
                        <Profile
                        artist={this.state.artist}
                        />
                        <Gallery
                            tracks={this.state.tracks}
                        />
                    </div>
                    : <div></div>
                }

            </div>
        )
    }  
}

export default App;