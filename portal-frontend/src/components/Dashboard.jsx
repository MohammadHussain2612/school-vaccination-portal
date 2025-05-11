/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          message.error('No authentication token found');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/api/dashboard/metrics', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.data) {
          setMetrics(response.data);
        } else {
          message.warning('No data available');
        }
      } catch (error) {
        message.error('Failed to load metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const columns = [
    {
      title: 'Vaccine Name',
      dataIndex: 'vaccineName',
      key: 'vaccineName',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Available Doses',
      dataIndex: 'availableDoses',
      key: 'availableDoses',
    },
    {
      title: 'Applicable Classes',
      dataIndex: 'applicableClasses',
      key: 'applicableClasses',
      render: (classes) => classes.join(', '),
    },
  ];

  return (
    <div className="dashboard-container">
      {loading ? (
        <Spin tip="Loading..." style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Card>
                <Statistic
                  title="Total Students"
                  value={metrics.totalStudents || 0}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card>
                <Statistic
                  title="Vaccinated Students"
                  value={metrics.vaccinatedStudents || 0}
                  suffix={`(${metrics.vaccinationPercentage?.toFixed(2) || 0}%)`}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card>
                <Statistic
                  title="Upcoming Drives"
                  value={metrics.upcomingDrives ? metrics.upcomingDrives.length : 0}
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
            <Col xs={24}>
              <Card title="Upcoming Vaccination Drives">
                {metrics.upcomingDrives && metrics.upcomingDrives.length > 0 ? (
                  <Table
                    columns={columns}
                    dataSource={metrics.upcomingDrives}
                    rowKey="_id"
                    pagination={false}
                    scroll={{ x: 800 }}
                  />
                ) : (
                  <p>No upcoming drives</p>
                )}
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Dashboard;
