module.exports = {
    name: "Site Name",
    url: "https://www.example.com",
    locale: 'en-US',
    address: {
        company: 'Company Name',
        street: '1234 Street',
        street2: 'Room 2B',
        city: 'City',
        state: 'STATE',
        zip: 'ZIP',
        country: 'US',
        phone: '(123) 555-1234',
        fax: null,
        email: 'email@example.com'
    },
    geolocation: {
        latitude: 123,
        longitude: -123
    },
    version: String(Date.now()),
    gtm_tag_id: process.env.GTM_TAG_ID,
    google_maps_key: process.env.GOOGLE_MAPS_API_KEY,
    map_address: '',
    colors: {
        header: {
            background: 'bg-black',
            text: 'text-white'
        },
        navigation: {
            container: 'bg-blue-900',
            links: 'border-white md:hover:bg-gray-500 text-white no-underline hover:no-underline'
        },
        title: {
            container: 'bg-black text-white text-center',
            text: 'text-4xl transform-uppercase'
        },
        cta: {
            container: 'bg-purple-700 text-white',
            button: 'btn rounded-full text-white bg-transparent border-2 border-white hover:bg-white hover:text-purple-600',
        },
        footer: {
            background: 'bg-gray-900',
            text: 'text-white'
        },
        copyright: {
            background: 'bg-black',
            text: 'text-white'
        },
    }
}