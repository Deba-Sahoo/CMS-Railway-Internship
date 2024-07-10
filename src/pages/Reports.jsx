import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import './Reports.css';

ChartJS.register(ArcElement, Tooltip, Legend);
// const Reports = ({ user }) => {
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [submittedCount, setSubmittedCount] = useState(0);
//   const [resolvedCount, setResolvedCount] = useState(0);
//   const [forwardedCount, setForwardedCount] = useState(0);
//   const [pendingCount, setPendingCount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchData();
//   }, [startDate, endDate]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {


//       const startDateFormatted = formatDateForBackend(startDate);
//       const endDateFormatted = formatDateForBackend(endDate);


//       const [submittedRes, resolvedRes, forwardedRes, pendingRes] = await Promise.all([
//         axios.get(`http://localhost:3003/complaints/count`, {
//           params: { currentHolder: user.userID, startDateFormatted, endDateFormatted }
//         }),
//         axios.get(`http://localhost:3003/complaints/count/resolved`, {
//           params: { currentHolder: user.userID, startDateFormatted, endDateFormatted }
//         }),
//         axios.get(`http://localhost:3003/complaints/count/inprogress`, {
//           params: { currentHolder: user.userID, startDateFormatted, endDateFormatted }
//         }),
//         axios.get(`http://localhost:3003/complaints/count/pending`, {
//           params: { currentHolder: user.userID, startDateFormatted, endDateFormatted }
//         })
//       ]);

//       setSubmittedCount(submittedRes.data.count);
//       setResolvedCount(resolvedRes.data.count);
//       setForwardedCount(forwardedRes.data.count);
//       setPendingCount(pendingRes.data.count);
//       setError('');
//     } catch (error) {
//       console.error('Error fetching complaint counts:', error);
//       setError('Failed to fetch complaint counts. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDateForBackend = (date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day} 00:00:00`;
//   };

//   const data = {
//     labels: ['Submitted', 'Resolved', 'Forwarded', 'Pending'],
//     datasets: [
//       {
//         data: [submittedCount, resolvedCount, forwardedCount, pendingCount],
//         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
//         hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
//       },
//     ],
//   };

//   const options = {
//     plugins: {
//       legend: {
//         display: true,
//         position: 'bottom',
//         labels: {
//           usePointStyle: true,
//           pointStyle: 'circle',
//         },
//       },
//     },
//     maintainAspectRatio: false,
//   };

//   return (
//     <div className="report-page">
//       <div className="report-card">
//         <div className="filter-card">
//           <div className="filter-options">
//             <div className="date-picker">
//               <label>Start Date: </label>
//               <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
//             </div>
//             <div className="date-picker">
//               <label>End Date: </label>
//               <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
//             </div>
//           </div>
//         </div>
//         <h1>Complaint Report</h1>
//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p>Error: {error}</p>
//         ) : (
//           <div className="cards">
//             <div className="card submitted-card">
//               <h2>Total Complaints</h2>
//               <p>{submittedCount}</p>
//             </div>
//             <div className="card resolved-card">
//               <h2>Resolved</h2>
//               <p>{resolvedCount}</p>
//             </div>
//             <div className="card forwarded-card">
//               <h2>Forwarded</h2>
//               <p>{forwardedCount}</p>
//             </div>
//             <div className="card pending-card">
//               <h2>Pending</h2>
//               <p>{pendingCount}</p>
//             </div>
//           </div>
//         )}
//         <div className="chart-container">
//           <Doughnut data={data} options={options} />
//         </div>
//       </div>
//     </div>
//   );
// };

const Reports = ({ user }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [submittedCount, setSubmittedCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [forwardedCount, setForwardedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const startDateFormatted = formatDateForBackend(startDate);
      const endDateFormatted = formatDateForBackend(endDate);

      const [submittedRes, resolvedRes, forwardedRes, pendingRes] = await Promise.all([
        axios.get(`http://localhost:3003/complaints/count`, {
          params: { currentHolder: user.userID, startDateFormatted, endDateFormatted }
        }),
        axios.get(`http://localhost:3003/complaints/count/resolved`, {
          params: { currentHolder: user.userID, startDateFormatted, endDateFormatted }
        }),
        axios.get(`http://localhost:3003/complaints/count/inprogress`, {
          params: { currentHolder: user.userID, startDateFormatted, endDateFormatted }
        }),
        axios.get(`http://localhost:3003/complaints/count/pending`, {
          params: { currentHolder: user.userID, startDateFormatted, endDateFormatted }
        })
      ]);

      setSubmittedCount(submittedRes.data.count);
      setResolvedCount(resolvedRes.data.count);
      setForwardedCount(forwardedRes.data.count);
      setPendingCount(pendingRes.data.count);
      setError('');
    } catch (error) {
      console.error('Error fetching complaint counts:', error);
      setError('Failed to fetch complaint counts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDateForBackend = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day} 00:00:00`;
  };

  const data = {
    labels: ['Submitted', 'Resolved', 'Forwarded', 'Pending'],
    datasets: [
      {
        data: [submittedCount, resolvedCount, forwardedCount, pendingCount],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="report-page">
      <div className="report-card">
        <div className="filter-card">
          <div className="filter-options">
            <div className="date-picker">
              <label>Start Date: </label>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div className="date-picker">
              <label>End Date: </label>
              <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
            </div>
          </div>
        </div>
        <h1>Complaint Report</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="cards">
            <div className="card submitted-card">
              <h2>Total Complaints</h2>
              <p>{submittedCount}</p>
            </div>
            <div className="card resolved-card">
              <h2>Resolved</h2>
              <p>{resolvedCount}</p>
            </div>
            <div className="card forwarded-card">
              <h2>Forwarded</h2>
              <p>{forwardedCount}</p>
            </div>
            <div className="card pending-card">
              <h2>Pending</h2>
              <p>{pendingCount}</p>
            </div>
          </div>
        )}
        <div className="chart-container">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Reports;


