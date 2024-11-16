"use client";
import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, Scatter, Treemap, ResponsiveContainer } from 'recharts';


const dummyData = {
  topics: [
    { category: '강력범죄', keyword: '살인기수', value: 68 },
    { category: '강력범죄', keyword: '살인미수등', value: 139 },
    { category: '강력범죄', keyword: '강도', value: 117 },
    { category: '강력범죄', keyword: '강간', value: 1225 },
    { category: '절도범죄', keyword: '절도', value: 44921 },
    { category: '폭력범죄', keyword: '상해', value: 4965 },
    { category: '폭력범죄', keyword: '폭행', value: 28940 },
    { category: '폭력범죄', keyword: '협박', value: 6293 },
    { category: '지능범죄', keyword: '사기', value: 102694 },
    { category: '지능범죄', keyword: '횡령', value: 16006 },
    { category: '지능범죄', keyword: '배임', value: 910 },
    { category: '특별경제범죄', keyword: '특별경제범죄', value: 27940 },
    { category: '마약범죄', keyword: '마약범죄', value: 3230 },
    { category: '교통범죄', keyword: '교통범죄', value: 55807 },
    { category: '노동범죄', keyword: '노동범죄', value: 90 },
  ],
  ageGroup: [
    { name: '10대', keywords: [
      { label: '통신매체이용음란죄', value: 300 },
      { label: '학교폭력', value: 250 },
      { label: '아동청소년보호법', value: 180 },
      { label: '성추행', value: 150 }
    ] },
    { name: '20대', keywords: [
      { label: '조건만남', value: 600 },
      { label: '음주운전', value: 500 },
      { label: '개인정보유출', value: 400 },
      { label: '성희롱', value: 350 }
    ] },
    { name: '30대', keywords: [
      { label: '보이스피싱', value: 700 },
      { label: '일반폭행', value: 500 },
      { label: '임금체불', value: 450 },
      { label: '가상화폐', value: 300 }
    ] },
    { name: '40대', keywords: [
      { label: '업무상횡령/배임', value: 800 },
      { label: '주택/상가임대차', value: 600 },
      { label: '손해배상청구', value: 500 },
      { label: '합병', value: 400 }
    ] },
    { name: '50대', keywords: [
      { label: '절도', value: 700 },
      { label: '의료사고', value: 600 },
      { label: '상속재산분할', value: 500 },
      { label: '부동산매매', value: 400 }
    ] },
    { name: '60대 이상', keywords: [
      { label: '교통사고합의', value: 800 },
      { label: '합의이혼', value: 700 },
      { label: '개인회생', value: 600 },
      { label: '양육권', value: 500 }
    ] },
  ],
  region: [
    { name: '수원시', value: 18.29 },
    { name: '안양시', value: 12.28 },
    { name: '성남시', value: 17.18 },
    { name: '연천시', value: 5.95 },
    { name: '용인시', value: 15.62 },
    { name: '과천시', value: 5.79 },
  ],
};

const KeywordComponent = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="bbstyle">
      <div className="bbox max-w-4xl mx-auto mt-20 p-6 bg-slate-800 rounded-lg shadow-xl text-white keyword-analysis">
        <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth">
          <Tab label="분야별" />
          <Tab label="연령별" />
          <Tab label="지역별" />
        </Tabs>
 
        {selectedTab === 0 && (
          <div className="tab-content">
            <h2>분야별 가장 많이 검색한 법률키워드는?</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart layout="vertical" data={dummyData.topics} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="keyword" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {selectedTab === 1 && (
          <div className="tab-content">
            <h2>연령별 가장 많이 검색한 법률키워드는?</h2>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 20, right: 30, bottom: 10, left: 0 }}>
                <CartesianGrid />
                <XAxis dataKey="name" name="연령대" />
                <YAxis dataKey="value" name="검색 빈도" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                {dummyData.ageGroup.map((group, index) => (
                  <Scatter key={index} name={group.name} data={group.keywords.map((keyword) => ({ name: group.name, value: keyword.value }))} fill="#8884d8" />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        )}

        {selectedTab === 2 && (
          <div className="tab-content">
            <h2>지역별 가장 많이 검색한 법률키워드는?</h2>
            <ResponsiveContainer width="100%" height={400}>
              <Treemap
                data={dummyData.region.map((region) => ({ name: region.name, size: region.value }))}
                dataKey="size"
                nameKey="name"
                stroke="#fff"
                fill="#8884d8"
                aspectRatio={4 / 3}
              />
            </ResponsiveContainer>
          </div>
        )}
      <span>@로톡 분류별 범죄 순위 참고</span>
      </div>
    </div>
  );
};

export default KeywordComponent;
