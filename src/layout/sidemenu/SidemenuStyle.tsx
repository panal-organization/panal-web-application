const SidemenuStyle = {
    /**
     * Sidebar principal
     */
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        width: '220px',
        // backgroundColor: '#1a1a1bff',
        backgroundColor: '#111C43',
        borderRight: '1px solid #A3AED14D',
        color: '#FFFFFF',
        padding: '20px',
        transition: 'width 0.3s ease, padding 0.3s ease',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        gap: '20px'
    },
    /**
     * Sidebar cerrado
     */
    sidebarClosed: {
        width: '0px',
        padding: '0px',
        border: 'none',
    },
    /**
     * Header del sidebar
     */
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '60px',
        flex: 1
    },
    /**
     * Cuerpo del sidebar
     */
    body: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    /**
     * Logo del sidebar
     */
    logo: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
    /**
     * Sección del sidebar
     */
    section: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
    },
    /**
     * Titulo de la sección
     */
    sectionTitle: {
        fontSize: '12px',
        fontWeight: 'bold',
        letterSpacing: '1.3px',
        marginBottom: '10px',
        opacity: '0.5',
        color: '#A3AED1'
    },
    /**
     * Menu de la sección
     */
    sectionMenu: {
        display: 'flex',
        flexDirection: 'column',
    },
    /**
     * Item del menu de la sección
     */
    sectionMenuItem: {
        display: 'flex',
        flexDirection: 'column',
    },
    /**
     * Link del item del menu de la sección
     */
    sectionMenuItemLink: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        color: '#D9C9F1',
        textDecoration: 'none',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
    },
    /**
     * Link activo del item del menu de la sección
     */
    sectionMenuItemLinkActive: {
        color: '#FFF',
        background: '#FFFFFF0D',
    },
    /**
     * Icono del link del item del menu de la sección
     */
    sectionMenuItemLinkIcon: {
        marginRight: '10px',
    },
    /**
     * Texto del link del item del menu de la sección
     */
    sectionMenuItemLinkText: {
        fontSize: '14px',
    },

    minWindow: {
        minWidth: '100%',
    },
}

export default SidemenuStyle
