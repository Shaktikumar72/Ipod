const componentIndexMapping = {
    1: {component: 'CoreMenu', text: 'Core Menu'},
    2: {component: 'CoverFlow', text: 'Cover Flow'},
    3: {component: 'Music', text: 'Music'},
    4: {component: 'Games', text: 'Games'},
    5: {component: 'Settings', text: 'Settings'}
}
export default componentIndexMapping

export const screenIndexMapping = {
    coreMenu: 1,
    coverFlow: 2,
    music: 3,
    games: 4, 
    settings: 5
}

export const mainMenuOptions = [
    componentIndexMapping[2].text, 
    componentIndexMapping[3].text, 
    componentIndexMapping[4].text, 
    componentIndexMapping[5].text
]