import styles from '../styles.module.css'
import React from 'react';
import Head from 'next/head';
import Footer from '../components/footer';
import Header from '../components/header';

const Title= 'Next & GraphQL | Rick and Morty';
const Description= 'A portal to browse rick and morty episodes with next & graphql.';
const logoPath= '/logo.png';

const injectGA = () => {
  if (typeof window == 'undefined') {
    return;
  }
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());

  gtag('config', 'UA-152720382-3');
};

class App extends React.Component {
  
  state={
    darkMode: 0,
    isMobile: false
  }
  
  componentDidMount(){
    if(localStorage.getItem('mode')){
      this.setState({darkMode: localStorage.getItem('mode')});
    }
    else{
      this.setState({darkMode: 0});
    }
    this.setState({isMobile: navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)});
    this.componentDidUpdate();  
  }

  componentDidUpdate(){
    localStorage.setItem('mode', this.state.darkMode);
  }

  toggleMode(){
    this.setState({darkMode: 1-this.state.darkMode});
  }

  render(){
    return (
      <div style={{fontFamily: 'Dosis'}} className="parent d-flex flex-column">
        <Head>
          <title>{Title}</title>
          <link rel="icon" href={logoPath} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dosis:wght@500&display=swap" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.1/css/bootstrap.min.css" integrity="sha384-VCmXjywReHh4PwowAiWNagnWcLhlEJLA5buUprzK8rxFgeH0kww/aWY76TfkUoSX" crossOrigin="anonymous" />
          <meta name="og:url" property="og:url" content="" />
          <meta name="og:type" property="og:type" content="website" />
          <meta name="og:title" property="og:title" content={Title} />
          <meta name="og:description" property="og:description" content={Description} />
          <meta name="og:image" property="og:image" content={logoPath} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={Title} />
          <meta name="twitter:description" content={Description} />
          <meta name="twitter:image" content={"https://nextrickandmortyapi.vercel.app" + logoPath} />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-152720382-3"
          />
          <script>{injectGA()}</script>
        </Head>
        <Header onClick={() => this.toggleMode()} mode={this.state.darkMode} text={this.state.darkMode==0 ? styles.textSnow : styles.textBlack} bg={this.state.darkMode==0 ? styles.bgBlack : styles.bgSnow} />
        <this.props.Component {...this.props.pageProps} isMobile={this.state.isMobile} mode={this.state.darkMode} styles={styles} text={this.state.darkMode==0 ? styles.textSnow : styles.textBlack} bg={this.state.darkMode==0 ? styles.bgBlack : styles.bgSnow} />
        <Footer text={this.state.darkMode==0 ? styles.textSnow : styles.textBlack} bg={this.state.darkMode==0 ? styles.bgBlack : styles.bgSnow}  />
      </div>
    )
  }
}

export default App;