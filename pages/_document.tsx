import Document, { Html, Head, Main, NextScript } from 'next/document';
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();

    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />),
    );

    const styleTags = sheet.getStyleElement();
    
    return { ...page, styleTags };
  }
  
  render() {
    return (
      <Html>
        <Head>
          <title>myday6</title>
          {this.props.styleTags}
          <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}