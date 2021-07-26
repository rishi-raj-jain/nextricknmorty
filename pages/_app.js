import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Footer, Header, HeadTag } from '@/components/index'
import { Title, logoPath, Description, GA_TRACKING_ID } from '@/libs/data'
import styles from '../styles.module.css'
import appStyle from '@/styles/app.module.css'
import 'bootstrap/dist/css/bootstrap.css'

const App = ({ Component, pageProps, variant }) => {
    const [darkMode, setDarkMode] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        console.log('The variant is ', variant)
        setDarkMode(
            localStorage.getItem('mode')
                ? parseInt(localStorage.getItem('mode'))
                : 0
        )
        setIsMobile(
            navigator.userAgent.match(
                /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
            )
        )
        function addAnalytics(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r
            ;(i[r] =
                i[r] ||
                function () {
                    ;(i[r].q = i[r].q || []).push(arguments)
                }),
                (i[r].l = 1 * new Date())
            ;(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0])
            a.async = 1
            a.src = g
            m.parentNode.insertBefore(a, m)
        }
        addAnalytics(
            window,
            document,
            'script',
            'https://www.google-analytics.com/analytics.js',
            'ga'
        )
        ga('create', GA_TRACKING_ID, 'auto')
        ga('set', 'exp', `gfGHQjykQ7Os9RHZK3p_sQ.${variant}`)
        ga('send', 'pageview')
        // add optimize script after hydration: https://stackoverflow.com/questions/63994663/general-problems-with-google-optimize-in-react-next-js
        // let optimizeScript = document.createElement('script')
        // optimizeScript.src =
        //     'https://www.googleoptimize.com/optimize.js?id=OPT-KJDR6XG'
        // document.head.appendChild(optimizeScript)
    }, [])

    const toggleMode = function () {
        localStorage.setItem('mode', (1 - darkMode).toString())
        setDarkMode(1 - darkMode)
    }

    return (
        <div
            className={`${appStyle['parent']} ${appStyle['d-flex']} ${appStyle['flex-column']}`}
        >
            <Head>
                <link rel="icon" href={logoPath} />
            </Head>
            <HeadTag
                Suffix={''}
                Title={Title}
                logoPath={logoPath}
                Description={Description}
            />
            <Header
                onClick={() => toggleMode()}
                mode={darkMode}
                text={darkMode ? styles.textSnow : styles.textBlack}
                bg={darkMode ? styles.bgBlack : styles.bgSnow}
            />
            <Component
                {...pageProps}
                isMobile={isMobile}
                mode={darkMode}
                styles={styles}
                text={darkMode ? styles.textSnow : styles.textBlack}
                bg={darkMode ? styles.bgBlack : styles.bgSnow}
            />
            <Footer
                text={darkMode ? styles.textSnow : styles.textBlack}
                bg={darkMode ? styles.bgBlack : styles.bgSnow}
            />
        </div>
    )
}

App.getInitialProps = async () => {
    return { variant: Math.floor(Math.random() * 2) }
}

export default App
