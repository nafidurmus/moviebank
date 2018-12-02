import React, { Component, Children } from 'react';
import { Col,
    Jumbotron,
    Button
} from 'reactstrap';

export default class ContentContainer extends Component {
    render() {
        return (
                <div style={styles.jumbotronStyle}>
                    <h4>{this.props.title}</h4>
                    <hr className="my-2" />
                    <div>{this.props.children}</div>
                </div>
        );
    }
}

const styles = {
    jumbotronStyle: {
        minHeight: 350,
        backgroundColor: '#dddddd',
        padding: 20,
        paddingTop: 20,
        marginBottom: 30,
        borderWidth: 1,
        borderRadius: 10
    }
}