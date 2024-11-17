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
} from "recharts";

const COLORS = ["#7a45bd", "#2789e8", "#ff6b6b", "#82ca9d", "#f6c85f"];

// **데이터**
const data = {
  강력범죄: [
    { 중분류: "살인", 소분류: "살인기수", 발생건수: 68, 검거건수: 57, 검거율: "83.8%" },
    { 중분류: "살인", 소분류: "살인미수 등", 발생건수: 139, 검거건수: 132, 검거율: "95.0%" },
    { 중분류: "강도", 소분류: "강도", 발생건수: 117, 검거건수: 119, 검거율: "101.7%" },
  ],
  연령별: [
    { 연령대: "10대", 대분류: "성범죄", 발생건수: 5 },
    { 연령대: "10대", 대분류: "기타 형사범죄", 발생건수: 4 },
    { 연령대: "20대", 대분류: "성범죄", 발생건수: 6 },
    { 연령대: "20대", 대분류: "교통사고/범죄", 발생건수: 2 },
    { 연령대: "30대", 대분류: "재산범죄", 발생건수: 4 },
    { 연령대: "40대", 대분류: "부동산/임대차", 발생건수: 4 },
    { 연령대: "50대", 대분류: "의료/세금/행정", 발생건수: 3 },
    { 연령대: "60대 이상", 대분류: "민사절차", 발생건수: 4 },
  ],
  지역별: [
    { name: "서울", size: 33.07, color: "#7a45bd" },
    { name: "부산", size: 13.84, color: "#2789e8" },
    { name: "도시이외", size: 11.69, color: "#ff6b6b" },
    { name: "인천", size: 10.48, color: "#82ca9d" },
    { name: "대구", size: 8.20, color: "#f6c85f" },
    { name: "대전", size: 5.33, color: "#ff9f40" },
    { name: "기타도시", size: 4.96, color: "#36a2eb" },
    { name: "광주", size: 4.74, color: "#4bc0c0" },
    { name: "경기 수원", size: 4.19, color: "#9966ff" },
    { name: "경남 창원", size: 3.49, color: "#ff6384" },
  ],
};

// **강력범죄 바 차트 컴포넌트**
const CrimeCategoryGraph = () => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart
      data={data.강력범죄}
      margin={{ top: 20, right: 30, bottom: 20, left: 100 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="소분류" tick={{ fontSize: 14, fill: "#fff" }} />
      <YAxis type="number" tick={{ fill: "#fff" }} />
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
  const bubbleData = data.연령별.map((item, index) => ({
    x: index + 1,
    y: item.발생건수,
    z: item.발생건수 * 20,
    crimeType: item.대분류,
    ageGroup: item.연령대,
  }));

  return (
    <ResponsiveContainer width="100%" height={500}>
      <ScatterChart>
        <XAxis dataKey="x" name="범죄 유형" tick={false} />
        <YAxis dataKey="y" name="발생 건수" />
        <ZAxis dataKey="z" range={[50, 400]} name="중요도" />
        <Tooltip formatter={(value: number) => `${value} 건`} />
        <Scatter name="연령별 범죄 유형" data={bubbleData} fill="#7a45bd" shape="circle" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

// 사용자 정의 Treemap Content
const CustomTreemapContent = ({
  depth,
  x,
  y,
  width,
  height,
  payload,
}: {
  depth: number;
  x: number;
  y: number;
  width: number;
  height: number;
  payload: { name: string; color?: string };
}): React.ReactElement | null => {
  const fillColor = payload.color || "#82ca9d"; // 기본 색상
  if (depth === 1) {
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fillColor}
          stroke="#fff"
        />
        {width > 60 && height > 20 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            fill="#fff"
            textAnchor="middle"
            dominantBaseline="central"
          >
            {payload.name}
          </text>
        )}
      </g>
    );
  }
  return null;
};

// Treemap 컴포넌트
const RegionTreemap = () => (
  <ResponsiveContainer width="100%" height={600}>
    <Treemap
      data={data.지역별}
      dataKey="size"
      nameKey="name"
      //content={<CustomTreemapContent />}
    >
      <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
    </Treemap>
  </ResponsiveContainer>
);

// 데이터 분석을 위한 헬퍼 함수들 추가
const getStatsForViolentCrime = () => {
  const total발생 = data.강력범죄.reduce((sum, item) => sum + item.발생건수, 0);
  const total검거 = data.강력범죄.reduce((sum, item) => sum + item.검거건수, 0);
  const 평균검거율 = ((total검거 / total발생) * 100).toFixed(1);
  return { total발생, total검거, 평균검거율 };
};

const getStatsForAge = () => {
  const total건수 = data.연령별.reduce((sum, item) => sum + item.발생건수, 0);
  const maxAge = data.연령별.reduce((max, item) => 
    item.발생건수 > max.발생건수 ? item : max
  );
  return { total건수, maxAge };
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
    <Box sx={{ padding: 4 }}>
      {/* 탭 구성 */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        centered
        TabIndicatorProps={{ style: { backgroundColor: "#7a45bd" } }}
        textColor="inherit"
        sx={{
          "& .MuiTab-root": { color: "#fff", fontWeight: "bold" },
          "& .Mui-selected": { color: "#7a45bd" },
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
                  <Typography variant="body1" color="text.secondary">
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
              {(() => {
                const stats = getStatsForAge();
                return (
                  <Typography variant="body1" color="text.secondary">
                    총 발생건수: {stats.total건수}건
                    <br />
                    가장 많은 범죄: {stats.maxAge.연령대} ({stats.maxAge.대분류} - {stats.maxAge.발생건수}건)
                  </Typography>
                );
              })()}
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
                  <Typography variant="body1" color="text.secondary">
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
