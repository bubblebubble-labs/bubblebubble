"use client";
import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  Treemap,
  Legend,
  LabelList,
  Cell,
} from "recharts";

const COLORS = ["#7a45bd", "#2789e8", "#ff6b6b", "#82ca9d", "#f6c85f"];

// **데이터**
const data = {
  강력범죄: [
    { 중분류: "살인", 소분류: "살인기수", 발생건수: 68, 검거건수: 57, 검거율: "83.8%" },
    { 중분류: "살인", 소분류: "살인미수 등", 발생건수: 139, 검거건수: 132, 검거율: "95.0%" },
    { 중분류: "강도", 소분류: "강도", 발생건수: 117, 검거건수: 119, 검거율: "101.7%" },
  ],
연령별:[
    {"연령대": "10대", "대분류": "성범죄", "중분류": "디지털 성범죄", "소분류": "통신매체이용음란죄", "발생건수": 450},
    {"연령대": "10대", "대분류": "성범죄", "중분류": "디지털 성범죄", "소분류": "웹하드", "발생건수": 380},
    {"연령대": "10대", "대분류": "성범죄", "중분류": "디지털 성범죄", "소분류": "몰카", "발생건수": 520},
    {"연령대": "10대", "대분류": "성범죄", "중분류": "디지털 성범죄", "소분류": "음란물유포", "발생건수": 630},
    {"연령대": "10대", "대분류": "기타 형사범죄", "중분류": "소년범죄/학교폭력", "소분류": "학교폭력", "발생건수": 2800},
    {"연령대": "10대", "대분류": "기타 형사범죄", "중분류": "소년범죄/학교폭력", "소분류": "왕따", "발생건수": 1900},
    {"연령대": "10대", "대분류": "기타 형사범죄", "중분류": "소년범죄/학교폭력", "소분류": "소년사건", "발생건수": 2100},
    {"연령대": "10대", "대분류": "기타 형사범죄", "중분류": "소년범죄/학교폭력", "소분류": "아동학대", "발생건수": 1600},
    {"연령대": "10대", "대분류": "명예훼손/모욕", "중분류": "사이버 명예훼손/모욕", "소분류": "정보통신망법", "발생건수": 890},
    {"연령대": "10대", "대분류": "명예훼손/모욕", "중분류": "사이버 명예훼손/모욕", "소분류": "악성댓글", "발생건수": 1200},
    {"연령대": "10대", "대분류": "IT/지식재산/금융", "중분류": "IT/개인정보", "소분류": "SNS", "발생건수": 750},
    {"연령대": "10대", "대분류": "교통사고/범죄", "중분류": "음주/무면허", "소분류": "무면허운전", "발생건수": 980},
    {"연령대": "10대", "대분류": "성범죄", "중분류": "미성년 대상 성범죄", "소분류": "아동청소년보호법", "발생건수": 420},
    {"연령대": "10대", "대분류": "성범죄", "중분류": "성폭력/강제추행", "소분류": "성추행", "발생건수": 890},

    {"연령대": "20대", "대분류": "성범죄", "중분류": "성매매", "소분류": "조건만남", "발생건수": 1200},
    {"연령대": "20대", "대분류": "성범죄", "중분류": "성매매", "소분류": "랜덤채팅", "발생건수": 980},
    {"연령대": "20대", "대분류": "성범죄", "중분류": "성매매", "소분류": "유흥업소", "발생건수": 2100},
    {"연령대": "20대", "대분류": "성범죄", "중분류": "성매매", "소분류": "유사성매매", "발생건수": 1500},
    {"연령대": "20대", "대분류": "교통사고/범죄", "중분류": "음주/무면허", "소분류": "음주운전", "발생건수": 4200},
    {"연령대": "20대", "대분류": "교통사고/범죄", "중분류": "음주/무면허", "소분류": "음주사고", "발생건수": 2800},
    {"연령대": "20대", "대분류": "IT/지식재산/금융", "중분류": "IT/개인정보", "소분류": "개인정보유출", "발생건수": 1100},
    {"연령대": "20대", "대분류": "IT/지식재산/금융", "중분류": "IT/개인정보", "소분류": "감청", "발생건수": 320},
    {"연령대": "20대", "대분류": "IT/지식재산/금융", "중분류": "IT/개인정보", "소분류": "통신비밀보호법", "발생건수": 450},
    {"연령대": "20대", "대분류": "성범죄", "중분류": "성폭력/강제추행", "소분류": "데이트폭력", "발생건수": 1800},
    {"연령대": "20대", "대분류": "성범죄", "중분류": "성폭력/강제추행", "소분류": "성희롱", "발생건수": 2200},

    {"연령대": "30대", "대분류": "재산범죄", "중분류": "사기/공갈", "소분류": "보이스피싱", "발생건수": 5600},
    {"연령대": "30대", "대분류": "재산범죄", "중분류": "사기/공갈", "소분류": "명의대여/도용", "발생건수": 4200},
    {"연령대": "30대", "대분류": "재산범죄", "중분류": "사기/공갈", "소분류": "유사수신", "발생건수": 2800},
    {"연령대": "30대", "대분류": "재산범죄", "중분류": "사기/공갈", "소분류": "중고사기", "발생건수": 6800},
    {"연령대": "30대", "대분류": "폭행/협박", "중분류": "폭행/협박/상해", "소분류": "일반폭행", "발생건수": 8900},
    {"연령대": "30대", "대분류": "폭행/협박", "중분류": "폭행/협박/상해", "소분류": "협박", "발생건수": 4500},
    {"연령대": "30대", "대분류": "폭행/협박", "중분류": "폭행/협박/상해", "소분류": "상해", "발생건수": 3200},
    {"연령대": "30대", "대분류": "폭행/협박", "중분류": "폭행/협박/상해", "소분류": "감금", "발생건수": 180},

    {"연령대": "40대", "대분류": "재산범죄", "중분류": "횡령/배임", "소분류": "업무상횡령/배임", "발생건수": 7800},
    {"연령대": "40대", "대분류": "재산범죄", "중분류": "횡령/배임", "소분류": "신용카드범죄", "발생건수": 4200},
    {"연령대": "40대", "대분류": "재산범죄", "중분류": "횡령/배임", "소분류": "점유이탈물횡령", "발생건수": 2100},
    {"연령대": "40대", "대분류": "부동산/임대차", "중분류": "임대차", "소분류": "주택/상가임대차", "발생건수": 5600},
    {"연령대": "40대", "대분류": "부동산/임대차", "중분류": "임대차", "소분류": "계약금", "발생건수": 3200},
    {"연령대": "40대", "대분류": "부동산/임대차", "중분류": "임대차", "소분류": "관리금", "발생건수": 2800},
    {"연령대": "40대", "대분류": "부동산/임대차", "중분류": "임대차", "소분류": "보증금", "발생건수": 4500},
    {"연령대": "40대", "대분류": "부동산/임대차", "중분류": "임대차", "소분류": "전세계약", "발생건수": 6200},

    {"연령대": "50대", "대분류": "재산범죄", "중분류": "기타 재산범죄", "소분류": "절도", "발생건수": 8900},
    {"연령대": "50대", "대분류": "재산범죄", "중분류": "기타 재산범죄", "소분류": "주거침입", "발생건수": 4200},
    {"연령대": "50대", "대분류": "재산범죄", "중분류": "기타 재산범죄", "소분류": "재물손괴", "발생건수": 5600},
    {"연령대": "50대", "대분류": "재산범죄", "중분류": "기타 재산범죄", "소분류": "장물", "발생건수": 2100},
    {"연령대": "50대", "대분류": "의료/세금/행정", "중분류": "의료/식품의약", "소분류": "의료사고", "발생건수": 980},
    {"연령대": "50대", "대분류": "의료/세금/행정", "중분류": "의료/식품의약", "소분류": "의료소송", "발생건수": 750},
    {"연령대": "50대", "대분류": "의료/세금/행정", "중분류": "의료/식품의약", "소분류": "약사법", "발생건수": 420},
    {"연령대": "50대", "대분류": "의료/세금/행정", "중분류": "의료/식품의약", "소분류": "식품위생법", "발생건수": 680},

    {"연령대": "60대 이상", "대분류": "교통사고/범죄", "중분류": "교통사고/도주", "소분류": "교통사고합의", "발생건수": 12500},
    {"연령대": "60대 이상", "대분류": "교통사고/범죄", "중분류": "교통사고/도주", "소분류": "손해사정", "발생건수": 8900},
    {"연령대": "60대 이상", "대분류": "교통사고/범죄", "중분류": "교통사고/도주", "소분류": "뺑소니", "발생건수": 2100},
    {"연령대": "60대 이상", "대분류": "교통사고/범죄", "중분류": "교통사고/도주", "소분류": "보복운전", "발생건수": 1500},
    {"연령대": "60대 이상", "대분류": "가족", "중분류": "이혼", "소분류": "합의이혼", "발생건수": 4200},
    {"연령대": "60대 이상", "대분류": "가족", "중분류": "이혼", "소분류": "재판이혼", "발생건수": 3600},
    {"연령대": "60대 이상", "대분류": "가족", "중분류": "이혼", "소분류": "재산분할", "발생건수": 2800},
    {"연령대": "60대 이상", "대분류": "가족", "중분류": "이혼", "소분류": "양육권", "발생건수": 1200},
],

  지역별: [
    { name: "서울", size: 48367 },
    { name: "부산", size: 24440 },
    { name: "경기", size: 41669 },
    { name: "인천", size: 17865 },
    { name: "대구", size: 8821 },
    { name: "대전", size: 5758 },
    { name: "광주", size: 5177 },
    { name: "울산", size: 4016 },
    { name: "경남", size: 15892 },
    { name: "경북", size: 8338 },
    { name: "전북", size: 7715 },
    { name: "전남", size: 8338 },
    { name: "충북", size: 4268 },
    { name: "충남", size: 7781 },
    { name: "강원", size: 4827 },
    { name: "제주", size: 5030 },
    { name: "세종", size: 1009 },
  ]
};

// **강력범죄 바 차트 컴포넌트**
const CrimeCategoryGraph = () => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart
      data={data.강력범죄}
      margin={{ top: 20,}}
    >
      <CartesianGrid stroke="#ffffff" strokeOpacity={0.1} />
      <XAxis 
        dataKey="소분류" 
        tick={{ fontSize: 14, fill: "#fff" }}
        stroke="#ffffff"
      />
      <YAxis 
        type="number" 
        tick={{ fill: "#fff" }}
        stroke="#ffffff"
      />
      <Legend />
      <Bar dataKey="발생건수" fill="#ff6b6b" name="발생 건수" minPointSize={5}>
        <LabelList
          dataKey="발생건수"
          position="top"
          content={({ x, y, width, value }) => (
            <text
              x={x + width / 2}
              y={y - 10}
              fill="#fff"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={12}
            >
              {value}건
            </text>
          )}
        />
      </Bar>
      <Bar dataKey="검거건수" fill="#4bc0c0" name="검거 건수" minPointSize={5}>
        <LabelList
          dataKey="검거건수"
          position="top"
          content={({ x, y, width, value }) => (
            <text
              x={x + width / 2}
              y={y - 10}
              fill="#fff"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={12}
            >
              {value}건
            </text>
          )}
        />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

// **연령별 버블 차트 컴포넌트**
const AgeBubbleChart = () => {
  // 연령대별로 데이터 그룹화 및 카운트
  const ageGroups = ["10대", "20대", "30대", "40대", "50대", "60대 이상"];
  const crimeTypeColors = {
    "성범죄": "#ff6b6b",
    "기타 형사범죄": "#4bc0c0",
    "명예훼손/모욕": "#7a45bd",
    "IT/지식재산/금융": "#2789e8",
    "교통사고/범죄": "#f6c85f",
    "재산범죄": "#ff9f40",
    "폭행/협박": "#36a2eb",
    "회사": "#9966ff",
    "부동산/임대차": "#ff6384",
    "금전/계약 문제": "#4bc0c0",
    "의료/세금/행정": "#82ca9d",
    "가족": "#7a45bd",
    "민사절차": "#2789e8"
  };

  // 범죄 유형별 총 발생건수 계산
  const crimeTypeTotalCases = Object.keys(crimeTypeColors).reduce((acc, crimeType) => {
    const total = data.연령별
      .filter(d => d.대분류 === crimeType)
      .reduce((sum, d) => sum + d.발생건수, 0);
    acc[crimeType] = total;
    return acc;
  }, {} as Record<string, number>);

  // 범죄 유형을 발생건수 기준으로 정렬
  const sortedCrimeTypes = Object.entries(crimeTypeTotalCases)
    .sort(([, a], [, b]) => b - a)
    .map(([crimeType]) => crimeType);

  // 데이터 가공 부분 수정
  const processedData = data.연령별.reduce((acc: any[], item) => {
    const ageIndex = ageGroups.indexOf(item.연령대);
    const existingItem = acc.find(
      (d) => d.ageGroup === item.연령대 && d.crimeType === item.대분류
    );

    if (!existingItem) {
      const totalCases = data.연령별
        .filter(d => d.연령대 === item.연령대 && d.대분류 === item.대분류)
        .reduce((sum, d) => sum + d.발생건수, 0);

      const subCategories = data.연령별
        .filter(d => d.연령대 === item.연령대 && d.대분류 === item.대분류)
        .map(d => d.소분류)
        .join(', ');

      acc.push({
        x: ageIndex + 1,
        y: sortedCrimeTypes.indexOf(item.대분류) + 1, // y값을 정렬된 인덱스로 설정
        z: totalCases,
        crimeType: item.대분류,
        ageGroup: item.연령대,
        color: crimeTypeColors[item.대분류 as keyof typeof crimeTypeColors],
        subCategories: subCategories,
        totalCases: totalCases
      });
    }
    return acc;
  }, []);

  // 최대 발생건수 계산
  const maxCases = Math.max(...processedData.map(d => d.z));
  // 눈금 간격 계산 (최대값을 10등분)
  const tickInterval = Math.ceil(maxCases / 20);
  // 눈금 배열 생성
  const yAxisTicks = Array.from({ length: 21 }, (_, i) => i * tickInterval);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <ScatterChart
        margin={{ top: 50, right: 20, bottom: 50, left: 60 }}
      >
        <CartesianGrid stroke="#ffffff" strokeOpacity={0.1} /> {/* 그리드 색상 추가 */}
        <XAxis
          dataKey="x"
          type="number"
          domain={[0.5, 6.5]}
          ticks={[1, 2, 3, 4, 5, 6]}
          tickFormatter={(value) => {
            const ageMap = {
              1: "10대",
              2: "20대",
              3: "30대",
              4: "40대",
              5: "50대",
              6: "60대 이상"
            };
            return ageMap[value as keyof typeof ageMap] || '';
          }}
          tick={{ fill: "#fff" }}
          angle={-45}
          textAnchor="end"
          interval={0}
          height={60}
          stroke="#ffffff"
        />
        <YAxis
          dataKey="z"
          type="number"
          domain={[0, 'auto']}
          tickFormatter={(value) => value}
          tick={{ fill: "#fff" }}
          ticks={yAxisTicks}
          stroke="#ffffff"
          label={{ 
            angle: -90, 
            position: 'insideLeft',
            fill: '#fff',
            offset: 10
          }}
        />
        <ZAxis 
          type="number"
          range={[400, 5000]}
          dataKey="z"
        />
        <Legend 
          payload={
            sortedCrimeTypes.map(type => ({
              value: type,
              type: 'circle',
              color: crimeTypeColors[type as keyof typeof crimeTypeColors]
            }))
          }
          formatter={(value) => <span style={{ color: '#fff' }}>{value}</span>}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                  <p><strong>{data.ageGroup}</strong></p>
                  <p><strong>{data.crimeType}</strong></p>
                  <p>발생건수: {data.totalCases}건</p>
                  <p style={{ fontSize: '12px' }}>주요 범죄: {data.subCategories}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Scatter data={processedData}>
          {processedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

// Update the CustomTreemapContent component
const CustomTreemapContent = ({
  depth,
  x,
  y,
  width,
  height,
  name,
  color,
}: {
  depth: number;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  color: string;
}): React.ReactElement | null => {
  if (depth === 1) {
    const [regionName, cases, percentage] = name.split('\n');
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={color}
          stroke="#fff"
        />
        {width > 60 && height > 40 && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - 20}
              fill="#fff"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={14}
            >
              {regionName}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2}
              fill="#fff"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={12}
            >
              {cases}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2 + 20}
              fill="#fff"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={12}
            >
              {percentage}
            </text>
          </>
        )}
      </g>
    );
  }
  return null;
};

// Update the RegionTreemap component
const RegionTreemap = () => {
  // 전체 합계 계산
  const total = data.지역별.reduce((sum, item) => sum + item.size, 0);
  
  // 데이터 정렬 및 비율 계산
  const sortedData = [...data.지역별]
    .sort((a, b) => b.size - a.size)
    .map(item => ({
      ...item,
      percentage: ((item.size / total) * 100).toFixed(1),
      displaySize: item.size.toLocaleString() // 천 단위 구분자 추가
    }));
  
  const processedData = sortedData.map((item) => {
    // 최대값 대비 현재 값의 비율 계산 (0~1 사이 값)
    const ratio = item.size / sortedData[0].size;
    
    // 색상 결정 로직
    let color;
    if (ratio >= 0.8) {
      color = 'rgba(164, 16, 16, 1)';      // 진한 빨강 (최상위)
    } else if (ratio >= 0.6) {
      color = 'rgba(200, 36, 35, 0.95)';   // 빨강
    } else if (ratio >= 0.4) {
      color = 'rgba(238, 55, 58, 0.9)';    // 연한 빨강
    } else if (ratio >= 0.2) {
      color = 'rgba(47, 204, 91, 0.85)';   // 연한 초록
    } else if (ratio >= 0.1) {
      color = 'rgba(34, 180, 75, 0.9)';    // 초록
    } else {
      color = 'rgba(25, 135, 55, 0.95)';   // 진한 초록 (하위)
    }

    return {
      ...item,
      color
    };
  });

  return (
    <ResponsiveContainer width="100%" height={600}>
      <Treemap
        data={processedData}
        dataKey="size"
        nameKey="name"
        animationDuration={0}
        content={(props: any) => {
          const data = processedData.find(d => d.name === props.root?.name);
          return CustomTreemapContent({ 
            ...props, 
            name:  `${props.name}\n${props.displaySize}건\n${props.percentage}%`,
          });
        }}
      >
        <Tooltip 
          formatter={(value: number) => [
            `${value.toLocaleString()}건`,
            `비율: ${((value / total) * 100).toFixed(1)}%`
          ]}
          contentStyle={{ backgroundColor: '#fff', border: 'none' }}
          labelStyle={{ color: '#000' }}
        />
      </Treemap>
    </ResponsiveContainer>
  );
};

// 데이터 분석을 위한 헬퍼 함수들 추가
const getStatsForViolentCrime = () => {
  const total발생 = data.강력범죄.reduce((sum, item) => sum + item.발생건수, 0);
  const total검거 = data.강력범죄.reduce((sum, item) => sum + item.검거건수, 0);
  const 평균검거율 = ((total검거 / total발생) * 100).toFixed(1);
  return { total발생, total검거, 평균검거율 };
};

const getStatsForAge = () => {
  return {};
};

const getStatsForRegion = () => {
  const topRegion = data.지역별.reduce((max, item) => 
    item.size > max.size ? item : max
  );
  return { topRegion };
};

// **전체 컴포넌트**
const KeywordComponent = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ 
      // padding: { xs: 2, md: 4 },  // 모바일에서는 패딩 줄임
      maxWidth: { md: '1200px' }, // 태블릿/데스크탑에서 최대 너비 설정
      margin: { xs: '0', md: '0 auto' }, // 태블릿/데스크탑에서 중앙 정렬
      width: '100%' // 모든 화면에서 전체 너비 사용
    }}>
      {/* 탭 구성 */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        centered
        TabIndicatorProps={{ style: { backgroundColor: "#ffffff" } }}
        textColor="inherit"
        sx={{
          "& .MuiTab-root": { color: "#fff", fontWeight: "bold" },
          "& .Mui-selected": { color: "#ffffff" },
        }}
      >
        <Tab label="강력범죄" />
        <Tab label="연령별" />
        <Tab label="지역별" />
      </Tabs>

      {/* 그래프 렌더링 */}
      <Box sx={{ marginTop: 4 }}>
        {selectedTab === 0 && (
          <Box>
            <Typography variant="h6" align="center" gutterBottom>
              강력범죄 발생 및 검거 건수
            </Typography>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              {(() => {
                const stats = getStatsForViolentCrime();
                return (
                  <Typography variant="body1" color="">
                    총 발생건수: {stats.total발생}건 | 총 검거건수: {stats.total검거}건
                    <br />
                    평균 검거율: {stats.평균검거율}%
                  </Typography>
                );
              })()}
            </Box>
            <CrimeCategoryGraph />
          </Box>
        )}
        {selectedTab === 1 && (
          <Box>
            <Typography variant="h6" align="center" gutterBottom>
              연령별 범죄 분류
            </Typography>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              {/* 발생건수 관련 통계 표시 제거 */}
            </Box>
            <AgeBubbleChart />
          </Box>
        )}
        {selectedTab === 2 && (
          <Box>
            <Typography variant="h6" align="center" gutterBottom>
              지역별 범죄 발생 비율
            </Typography>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              {(() => {
                const stats = getStatsForRegion();
                return (
                  <Typography variant="body1" color="">
                    범죄 발생 최다 지역: {stats.topRegion.name} ({stats.topRegion.size.toFixed(1)}%)
                  </Typography>
                );
              })()}
            </Box>
            <RegionTreemap />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default KeywordComponent;
