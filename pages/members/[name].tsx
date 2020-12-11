import { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Image from 'next/image';
import styled from 'styled-components';

import Layout from '../../components/layout'

export const getStaticPaths: GetStaticPaths = async () => {
  const names = ["jae", "sungjin", "youngk", "wonpil", "dowoon"];
  // const paths = names.map((name) => `/members/${name}`)

  const paths = names.map((name) => ({
    params: { name: name },
  }))

  return { 
    paths,
    fallback: false 
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const API_KEY = process.env.GOOGLE_API_KEY;
  const ENGINE_ID = process.env.GOOGLE_ENGINE_ID;

  const nameConverter = (name) => {
    switch(name) {
      case "jae":
        return "데이식스%20제이";
        break;
      case "sungjin":
        return "데이식스%20성진";
        break;
      case "youngk":
        return "데이식스%영케이";
        break;
      case "wonpil":
        return "데이식스%20원필";
        break;
      case "dowoon":
        return "데이식스%20도운";
        break;
      default:
        return;
    }
    // "jae": "데이식스%20제이",
    // "sungjin": "데이식스%20성진",
    // "youngk": "데이식스%20영케이",
    // "wonpil": "데이식스%20원필",
    // "dowoon": "데이식스%20도운",
  }

  const searchName = nameConverter(params.name);
  const res = await fetch(`https://customsearch.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${ENGINE_ID}&searchType=image&q=${encodeURIComponent(searchName)}`);
  const photos = await res.json();

  return {
    props: {
      params,
      photos
    },
  }
}

const Root = styled.div`
`

const Title = styled.h1`
  text-align: center;
  color: #ffffff;
`

const ContentsContainer = styled.div`
  display: flex;
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: start;
  padding: 20px;
  width: 50vw;
  flex-wrap: wrap;
`

const ImageWrapper = styled.img`
  width: 400px;
  height: 400px;
  object-fit: cover;
  padding: 4px;
`

const DiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`

const DiaryInput = styled.input`
  border: 0;
  border-radius: 50px;
  width: 480px;
  height: 40px;
  padding: 10px;
  &:focus {
    outline: none;
  }
`

const DiaryRecordContainer = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const DiaryRecord = styled.div`
  margin: 4px;
  color: #ffffff;
  font-size: 1.2em;
`

// interface MemberProps {
//   params:
//   photos: 
// }

export default function Member({ params, photos }) {
  const [inputVal, setInputVal] = useState("");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    console.log(photos);
  }, []);

  const nicknameConverter = {
    "jae": "쩨",
    "sungjin": "밥성진",
    "youngk": "강브라",
    "wonfeel": "기먼필",
    "dowoon": "윤돈",
  }

  const addRecord = (event) => {
    if (event.key === 'Enter') {
      let record = event.target.value;
      console.log(record);
      setRecords([...records, record]);
      setInputVal("");
    }
  }

  useEffect(() => {
    console.log(records);
  }, [records]);

  return (
    <Layout home={false}>
      <Title>{nicknameConverter[params.name]}'s 페이지</Title>
      <ContentsContainer>
        <ImageContainer>
          {photos.items.map((photo, idx) => (
            <ImageWrapper key={idx} src={photo.link} alt="sungjin" />
          ))}
        </ImageContainer>
      <DiaryContainer>
        <DiaryInput type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} onKeyDown={(e) => addRecord(e)} />
        <DiaryRecordContainer>
          {records.map((record, idx) => 
            <DiaryRecord key={idx}>{record}</DiaryRecord>
          )}
        </DiaryRecordContainer>
      </DiaryContainer>
      </ContentsContainer>
    </Layout> 
  )
}