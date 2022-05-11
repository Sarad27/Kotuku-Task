const xml = require('xml');

exports.generateRss = (data) =>{
    const xmlObject = {
        rss: [
            {
                _attr: {
                    version: '2.0',
                    'xmlns:atom': 'http://www.w3.org/2005/Atom'
                }
            },
            {
                channel: [
                    { title: 'Localhost' },
                    { link: '/http://localhost:5000/' },
                    { description: 'Latest RSS feed from Guardian.com, a leading UK newspaper.' },
                    { language: 'en-us' },
                    { docs : 'http://blogs.law.harvard.edu/tech/rss'},
                    { managingEditor : 'editorsarad27@gmail.com'},
                    { webMaster : 'subedisarad27@gmail.com'},
                    ...data.results.map((post) => {
                        return {
                            item: [
                                { title: post.webTitle },
                                { link: post.webUrl },
                                { pubDate: post.webPublicationDate }
                            ]
                        };
                    })
                ]
            }
        ]
    };
    return '<?xml version="1.0" encoding="UTF-8"?>' + xml(xmlObject);
};