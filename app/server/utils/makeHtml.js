import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Html from '../components/html.jsx'

export default function ({ assets, bodyHtml }) {
    const appHtml = ReactDOMServer.renderToStaticMarkup(
        <Html {...assets} bodyHtml={bodyHtml} />
    );
    return `<!doctype html>${appHtml}`
}