const styles = {
    cardStyle: {
        backgroundColor: '#ffffff',
        maxWidth: 210,
        minHeight: 330,
        width: '100%',
        border: '1px solid #d6d7da',
    },
    container: {
        position: 'relative',
    },
    textBlock: {
        position: 'absolute',
        bottom: 0,
        textAlign: 'center',
        width: '100%',
        paddingTop: 10,
        minHeight: 20,
        backgroundColor: 'black',
        opacity: 0.7,
    },
    nameStyle: {
        color: '#e0e0e0',
        fontWeight: 'bold',
        fontSize: 15,
    },
    overviewStyle: {
        color: '#898989',
        fontSize: 15,
    },
    imgStyle: {
        minHeight: 290,
        maxWidth: 210,
        maxHeight: 300
    },
    subtitleStyle: {
        backgroundColor: '#ffffff',
        minheight: 50,
        border: '1px solid #d6d7da',
        flex: 1,
        justifyContent: 'center', // Used to set Text Component Vertically Center
        alignItems: 'center' 
    },
    bottomStyle: {
        margin: 'auto',
        width: '100%',
        padding: 15,
        flex: 1,
        justifyContent: 'center', // Used to set Text Component Vertically Center
        alignItems: 'center' 
    },
};

export default styles;