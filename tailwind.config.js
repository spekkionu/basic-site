module.exports = {
    content: ["_site/**/*.html", "resources/js/components/**/*.vue"],
    theme: {
        extend: {
            colors: {
                'facebook': '#3a589e',
                'twitter': '#0084b4',
                'pinterest': '#bd081c',
                'youtube': '#ff0000',
                'linkedin': '#2867B2',
            },
            spacing: {
                '128': '32rem',
                '256': '64rem',
                '512': '128rem',
                '300px': '300px',
                '400px': '400px',
                '500px': '500px',

            },
            container: {
                center: true,
                padding: '1rem'
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require("@tailwindcss/aspect-ratio"),
    ],
};
