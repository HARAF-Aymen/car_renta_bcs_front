    // src/theme.ts
    import { extendTheme } from '@chakra-ui/react';

    const theme = extendTheme({
    config: {
        initialColorMode: 'light',
        useSystemColorMode: false,
    },
    fonts: {
        heading: `'Segoe UI', sans-serif`,
        body: `'Open Sans', sans-serif`,
    },
    });

    export default theme;
