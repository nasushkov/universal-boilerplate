import React from 'react'
import Helmet from 'react-helmet'

const {PropTypes} = React

class Html extends React.Component {
    static propTypes = {
        bodyHtml: PropTypes.string,
        headScripts: PropTypes.array,
        stringScripts: PropTypes.array,
        bodyScripts: PropTypes.array,
        headStyles: PropTypes.array,
        bodyStyles: PropTypes.array,
        otherLinks: PropTypes.array,
        inlineStyles: PropTypes.array,
    }

    getHelmetMetaData() {
        const head = Helmet.rewind()
        return {
            helmetHtmlAttributes: head.htmlAttributes.toComponent(),
            helmetTitle: head.title.toComponent(),
            helmetMeta: head.meta.toComponent(),
            helmetBase: head.base.toComponent(),
            helmetLink: head.link.toComponent(),
            helmetScript: head.script.toComponent(),
        }
    }

    render() {
        const {
            bodyHtml,
            otherLinks,
            stringScripts,
            headStyles,
            headScripts,
            bodyScripts,
            bodyStyles,
            inlineStyles,
        } = this.props

        const {
            helmetHtmlAttributes,
            helmetTitle,
            helmetMeta,
            helmetBase,
            helmetLink,
            helmetScript
        } = this.getHelmetMetaData()

        return (
            <html {...helmetHtmlAttributes}>
            <head>
                {helmetTitle}
                {helmetBase}
                {helmetMeta}
                {helmetLink}
                {otherLinks.map((props, i) =>
                    <link key={i} {...props} />
                )}
                {headStyles.map((style, i) =>
                    <link
                        key={i}
                        href={style}
                        type='text/css' rel='stylesheet' media='screen'
                    />
                )}
                {helmetScript}
                {headScripts.map((script, i) =>
                    <script src={script} key={i}/>
                )}
                {stringScripts.map((script, i) =>
                    <script key={i} dangerouslySetInnerHTML={{
            __html: script,
          }}/>
                )}
                {inlineStyles.map((st, i) =>
                    <style dangerouslySetInnerHTML={{__html: st}}/>
                )}
            </head>
            <body>
            <div id="reactMain" dangerouslySetInnerHTML={{__html: bodyHtml}}/>
            {bodyScripts.map((script, i) =>
                <script key={i} src={script}/>
            )}
            {bodyStyles.map((style, i) =>
                <script key={i} dangerouslySetInnerHTML={{
          __html: `loadCSS('${style}')`,
        }}/>
            )}
            {bodyStyles.map((style, i) =>
                <noscript key={i} dangerouslySetInnerHTML={{
          __html: `<link href="${style}" rel="stylesheet" />`,
        }}/>
            )}
            </body>
            </html>
        )
    }
}

export default Html