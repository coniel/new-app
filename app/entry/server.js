import ReactRouterSSR from 'react-router-ssr';
import SimpleSchema from 'simpl-schema';
require('server');

SimpleSchema.extendOptions(['placeholder', 'label', 'index', 'unique', 'denyInsert', 'denyUpdate']);

// Do server-rendering only in production
// Otherwise, it will break the hot-reload
// DO NOT REMOVE THIS LINE TO TEST, use: meteor --production
if (process.env.NODE_ENV === 'production') {
    // Load Webpack infos for SSR
    ReactRouterSSR.LoadWebpackStats(WebpackStats);

    require('./routes').default;
}