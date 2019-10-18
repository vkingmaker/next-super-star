import React from 'react';
import App, { Container } from 'next/app';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Layout from '../components/Layout/Layout';
import withNProgress from 'next-nprogress';
import NProgress from 'next-nprogress/component';

class MyApp extends App {
  static async getInitialProps({
    Component,
    ctx
  }: {
    Component: any;
    ctx: any;
  }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    {
      console.log('_app Props', this.props);
    }
    const { Component, pageProps } = this.props;
    {
      console.log('COMPONENTTTTTT', Component);
    }
    {
      console.log('PAGEPROPS', pageProps);
    }

    return (
      <React.Fragment>
        <Layout>
          <Component />
        </Layout>
        <NProgress color='red' spinner={true} />
      </React.Fragment>
    );
  }
}
const msDelay = 200;
const configOptions = { trickleSpeed: 50 };
export default withNProgress(msDelay, configOptions)(MyApp);
