import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Footer, Header, HeadTag } from '@/components/index'
import { Title, logoPath, Description } from '@/libs/data'
import styles from '../styles.module.css'
import appStyle from '@/styles/app.module.css'
import 'bootstrap/dist/css/bootstrap.css'

const App = ({ Component, pageProps }) => {
    const [darkMode, setDarkMode] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
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

export default App
