import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <div style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#343a40',
                padding: 20,
                fontSize: 15,
                height: 80,

                position: 'absolute',
                bottom: 0,
                marginBottom: -30,
                width: '100%',
                color: 'white'
                // margin: 30
 }}>
                    Movie Bank bir SpartaCoders girişimidir. Her Hakkı Saklıdır. Movie Bank©
            </div>
        );
    }
}
