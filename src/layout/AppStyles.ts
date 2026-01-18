const AppStyles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        width: '100vw',
        transition: 'max-width 0.3s ease-in-out',
        backgroundColor: '#FFFFFF',
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        width: '200px',
        backgroundColor: '#111C43',
        borderRight: '1px solid #E0E0E0',
        color: '#FFFFFF',
        padding: '20px',
        transition: 'width 0.3s ease, padding 0.3s ease',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        flexShrink: 0,
    },
    sidebarClosed: {
        width: '0px',
        padding: '0px',
        border: 'none',
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        transition: 'max-width 0.3s ease-in-out',
        flex: 1,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        maxHeight: '40px',
        backgroundColor: '#FFFFFF',
        padding: '10px',
        flex: 1,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: '24px',
        overflow: 'hidden',
    }
}

export default AppStyles
