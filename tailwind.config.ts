/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'white': '#fff',
                'black': '#000',
                'primary': '#6FA7B1',
                'secondary': '#91bbc3',
                'third': '#a1c5cc',
                'forth': '#b2cfd5',
                // 'secondary': '#B8D8BF'
            },
            backgroundColor: {
                'gray-100': '#e3e3e3',
                'gray-200': '#d4d4d4',
                'gray-300': '#9a9a9a',
                'gray-400': '#707070',
                'gray-500': '#454545',
                'sage-100': '#DAD7CD',
                'sage-200': '#A3B18A',
                'sage-300': '#5C7650',
                'sage-400': '#3A5A40',
                'sage-500': '#344E41',
                'teal-100': '#b2d8d8',
                'teal-200': '#66b2b2',
                'teal-300': '#008080',
                'teal-400': '#006666',
                'teal-500': '#004c4c',
                'orange-100': '#FDB777',
                'orange-200': '#F78F6B',
                'orange-300': '#FA7D51',
                'orange-400': '#F46330',
                'orange-500': '#EB4E16',
            },
        },
    },
    plugins: [],
}