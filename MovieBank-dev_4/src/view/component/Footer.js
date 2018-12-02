import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <div style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: 30,
 }}>
                    Movie Bank bir SpartaCoders girişimidir. Her Hakkı Saklıdır. Movie Bank©
            </div>
        );
    }
}
