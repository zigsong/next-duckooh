import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/Link';
import Image from 'next/image'
import KaKaoLogin from 'react-kakao-login';
import Cookies from 'js-cookie';
import styled from 'styled-components';

import styles from '../styles/Home.module.css'
import { GetStaticProps } from 'next';
import axios from 'axios';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const kakaoKey = process.env.KAKAO_JS_KEY;

  return {
    props: {
      kakaoKey
    },
  }
}

const Title = styled.h1`
  color: red;
`;

const KaKaoLoginBtn = styled(KaKaoLogin)`
  cursor: pointer;
`

export default function Home({ kakaoKey }) { 
  const responseKaKao = (res) => {
    console.log('kako login successed');
    const kakaoId = res.profile.id;
    const kakaoEmail = res.profile.kakao_account.email;
    const kakaoToken = res.response.access_token;

    axios.post('/api/auth/', { 
        id: kakaoId,
        email: kakaoEmail,
        token: kakaoToken
      }, 
      { withCredentials: true }      
    )
    .then(res => {
      console.log(res.data);
      // console.log(document.cookie);
      console.log(Cookies.get('user'));
    });
  }

  const responseFail = () => {
    console.log('kako login failed');
  }

  useEffect(() => {
    if (window.Kakao.Auth === null) {
      window.Kakao.init(kakaoKey);
    }
    console.log(Cookies.get('user'));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Day6 Diary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://namu.wiki/w/DAY6">Day6</a> 덕후 일기장
        </h1>

        <p className={styles.description}>
          코딩 연습 핑계로 만드는 2개월 차
          <code className={styles.code}>MyDay</code>
          일기장
        </p>

        <div>
          <KaKaoLoginBtn
              token={kakaoKey}
              onSuccess={(res) => responseKaKao(res)}
              onFail={() => responseFail()}
              needProfile={true}
          />
        </div>

        <div className={styles.grid}>
          <Link href="/members/jae">
            <a className={styles.card}>
              <h3>쩨 &rarr;</h3>
              <Image src="/images/jae.jpg" alt="jae" width="auto" height={280} />
              <p>데이식스 맏형 LA 슈스케3 출신 공기반 소리반</p>
            </a>
          </Link>

          <Link href="/members/sungjin">
            <a className={styles.card}>
              <h3>밥성진 &rarr;</h3>
              <Image src="/images/sungjin.jpg" alt="sungjin" width="auto" height={280} />
              <p>방방이 우리 리더 부산남자 데장 아프지마 내 최애❤️❤️</p>
            </a>
          </Link>

          <Link href="/members/youngk">
            <a className={styles.card}>
              <h3>강브라 &rarr;</h3>
              <Image src="/images/youngk.jpg" alt="youngk" width="auto" height={280} />
              <p>토롸너 낮경영밤밴드 야또 대식가</p>
            </a>
          </Link>

          <Link href="/members/wonpil">
            <a className={styles.card}>
              <h3>기먼필 &rarr;</h3>
              <Image src="/images/wonpil.jpg" alt="wonpil" width="auto" height={280} />
              <p>데이식스 잘생긴 애 구막 울보 쫄보 애교쟁이 다정이</p>
            </a>
          </Link>

          <Link href="/members/dowoon">
            <a className={styles.card}>
              <h3>윤돈 &rarr;</h3>
              <Image src="/images/dowoon.jpg" alt="dowoon" width="auto" height={280} />
              <p>데식 현막 부산 사투리 존귀 드럼 강아지 멍멍 댕댕</p>
            </a>
          </Link>
          
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
