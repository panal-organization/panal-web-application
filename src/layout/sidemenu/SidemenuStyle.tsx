const SidemenuStyle = {
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        width: '200px',
        // backgroundColor: '#1a1a1bff',
        backgroundColor: '#111C43',
        borderRight: '1px solid #E0E0E0',
        color: '#FFFFFF',
        padding: '20px',
        transition: 'width 0.3s ease, padding 0.3s ease',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        gap: '20px'
    },
    sidebarClosed: {
        width: '0px',
        padding: '0px',
        border: 'none',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '60px',
        flex: 1
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    logo: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
    },
    sectionTitle: {
        fontSize: '14px',
        letterSpacing: '1.2px',
        marginBottom: '10px',
        color: '#A3AED1'
    },
    sectionMenu: {
        display: 'flex',
        flexDirection: 'column',
    },
    sectionMenuItem: {
        display: 'flex',
        flexDirection: 'column',
    },
    sectionMenuItemLink: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        color: '#D9C9F1',
        textDecoration: 'none',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
    },
    sectionMenuItemLinkActive: {
        color: '#FFF',
        background: '#FFFFFF0D',
    },
    sectionMenuItemLinkIcon: {
        marginRight: '10px',
    },
    sectionMenuItemLinkText: {
        fontSize: '14px',
    },
}

export default SidemenuStyle
