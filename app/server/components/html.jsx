import React, {PropTypes} from 'react'
import {isProduction} from '../../../config/environment'

const HtmlComponent = ({initialState, headStyles, helmet, bodyScripts, bodyHtml, googleAnalyticsId, yaCounterId}) => {
    const googleAnalytics = isProduction && googleAnalyticsId !== 'UA-XXXXXXX-X' &&
        <script
            dangerouslySetInnerHTML={{ __html: `
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', '${googleAnalyticsId}', 'auto'); ga('send', 'pageview');` }}
        />;

    const yaCounter = isProduction && yaCounterId !== '00000000' &&
            <script
                dangerouslySetInnerHTML={{ __html: `
(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter${yaCounterId} = new Ya.Metrika({
id:${yaCounterId}, clickmap:true, trackLinks:true, accurateTrackBounce:true }); } catch(e) { } });
var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () {
n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js";
if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); }
else { f(); } })(document, window, "yandex_metrika_callbacks"); `}}
            />

    const yaCounterNoScript = isProduction && yaCounterId !== '00000000' &&
        <noscript>
            <div>
                <img src={`https://mc.yandex.ru/watch/${yaCounterId}`} styles="position:absolute; left:-9999px;" alt="" />
            </div>
        </noscript>

    return (
        <html {...helmet.htmlAttributes.toComponent()}>
        <head>
            {helmet.title.toComponent()}
            {helmet.base.toComponent()}
            {helmet.meta.toComponent()}
            {helmet.link.toComponent()}
            {helmet.script.toComponent()}
            {headStyles.map((style, i) =>
                <link
                    href={style} key={i}
                    type='text/css' rel='stylesheet' media='screen'
                />
            )}
            <script
                dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_STATE__ = ${
                JSON.stringify(initialState, null, 2)
              };`,
            }}
            ></script>
            {googleAnalytics}
            {yaCounter}
        </head>
        <body>
        <div id="reactMain" dangerouslySetInnerHTML={{ __html: bodyHtml }}/>
        {bodyScripts.map((script, i) =>
            <script src={script} key={i}/>
        )}
        {yaCounterNoScript}
        </body>
        </html>
    )
}

HtmlComponent.propTypes = {
    bodyHtml: PropTypes.string.isRequired,
    helmet: PropTypes.object.isRequired
}

export default HtmlComponent