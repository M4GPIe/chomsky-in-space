interface color {
    main: string,
    bright?: string,
    dark?: string
}

interface Palette {
    [key: string]: color
}

export const appColorPalette : Palette = {
    GREEN: {
        main: '#b8ff85'
    },
    PURPLE:{
        main: '#e769e4',
        bright: '#e24795',
        dark: '#a400a0'
    }
}