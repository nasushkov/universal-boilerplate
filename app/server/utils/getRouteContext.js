import React from 'react';
import { RouterContext, match } from 'react-router';
import debug from 'debug';

const log = debug('server');

export default function getRouteContext(ctx, routes) {
    return new Promise((resolve, reject) => {
        match({
            routes, location: ctx.request.url,
        }, (error, redirect, renderProps) => {
            if (error) {
                log(`Error getting route context ${error}`)

                ctx.status = 500
                reject(ctx.throw(error))

            } else if (redirect) {
                log('Route context requested redirect')

                ctx.status = 302
                reject(ctx.redirect(`${redirect.pathname}${redirect.search}`))

            } else if (!renderProps) {
                log('Route context is not found')

                ctx.status = 404
                reject()

            } else {
                log('Route context is found')

                resolve(<RouterContext {...renderProps} />)
            }
        });
    });
};