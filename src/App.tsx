import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './App.css';

interface DataItem {
  id: number;
  name: string;
  current: number;
  previous: number;
  week: number;
}

const data: DataItem[] = [
  { id: 1, name: 'Выручка', current: 500521, previous: 480521, week: 4805121 },
  { id: 2, name: 'Наличные', current: 300000, previous: 300000, week: 300000 },
  { id: 3, name: 'Безналичный расчет', current: 100000, previous: 100000, week: 100000 },
  { id: 4, name: 'Кредитные карты', current: 100521, previous: 100521, week: 100521 },
  { id: 5, name: 'Средний чек', current: 1300, previous: 900, week: 900 },
  { id: 6, name: 'Средний гость', current: 1200, previous: 800, week: 800 },
  { id: 7, name: 'Удаления из чека (после оплаты)', current: 1100, previous: 1100, week: 900 },
  { id: 8, name: 'Удаления из чека (до оплаты)', current: 1300, previous: 1300, week: 900 },
  { id: 9, name: 'Количество чеков', current: 34, previous: 36, week: 34 },
  { id: 10, name: 'Количество гостей', current: 34, previous: 36, week: 32 },
];

const App: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<DataItem | null>(null);

  const handleRowClick = (rowData: DataItem) => {
    setSelectedRow(rowData);
  };

  const chartOptions: Highcharts.Options = {
    title: {
      text: selectedRow ? selectedRow.name : 'Выберите показатель',
    },
    series: [
      {
        type: 'line',
        data: selectedRow
          ? [
              selectedRow.previous,
              selectedRow.current,
              selectedRow.week,
            ]
          : [],
      },
    ],
    xAxis: {
      categories: ['Вчера', 'Сегодня', 'Этот день недели'],
    },
  };

  return (
    <div className="App">
      <table className="data-table">
        <thead>
          <tr>
            <th>Показатель</th>
            <th>Текущий день</th>
            <th>Вчера</th>
            <th>Этот день недели</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} onClick={() => handleRowClick(item)}>
              <td>{item.name}</td>
              <td>{item.current}</td>
              <td>{item.previous}</td>
              <td>{item.week}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="chart-container">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </div>
  );
}

export default App;
