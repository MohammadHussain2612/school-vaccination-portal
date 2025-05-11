/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Select, message } from 'antd';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const { Option } = Select;

const Reports = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [filters, setFilters] = useState({ name: '', class: '', studentId: '', vaccinationStatus: '' });

  useEffect(() => {
    fetchStudents();
  }, [pagination.current, filters]);

  const fetchStudents = async () => {
    setLoading(true);
    const token = localStorage.getItem('authToken');
    if (!token) {
      message.error('No authentication token found');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get('http://localhost:5000/api/students/search', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        params: {
          name: filters.name || undefined,
          class: filters.class || undefined,
          studentId: filters.studentId || undefined,
          vaccinationStatus: filters.vaccinationStatus || undefined,
        },
      });
      setStudents(response.data);
      setPagination({
        ...pagination,
        total: response.data.length,
      });
    } catch (error) {
      message.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const downloadReport = () => {
    const formattedData = students.map(student => ({
      Name: student.name,
      Class: student.class,
      "Student ID": student.studentId,
      "Vaccination Status": student.vaccinationStatus ? 'Vaccinated' : 'Not Vaccinated',
      "Vaccine Name": student.vaccinationDetails.map(detail => detail.vaccineName).join(', '),
      "Date of Vaccination": student.vaccinationDetails.map(detail => new Date(detail.date).toLocaleDateString()).join(', '),
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Vaccination_Report.xlsx');
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: 'Vaccination Status',
      dataIndex: 'vaccinationStatus',
      key: 'vaccinationStatus',
      render: (status) => (status ? 'Vaccinated' : 'Not Vaccinated'),
    },
    {
      title: 'Vaccine Name',
      dataIndex: 'vaccineName',
      key: 'vaccineName',
      render: (_, record) => record.vaccinationDetails.map(detail => detail.vaccineName).join(', '),
    },
    {
      title: 'Date of Vaccination',
      dataIndex: 'dateOfVaccination',
      key: 'dateOfVaccination',
      render: (_, record) => record.vaccinationDetails.map(detail => new Date(detail.date).toLocaleDateString()).join(', '),
    },
  ];

  return (
    <div style={{ margin: 30, padding: 30 }}>
      <h2>Vaccination Reports</h2>
      <div style={{ marginBottom: 20 }}>
        <Input
          placeholder="Search by Name"
          value={filters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
          style={{ width: 200, marginRight: 10 }}
        />
        <Input
          placeholder="Search by Class"
          value={filters.class}
          onChange={(e) => handleFilterChange('class', e.target.value)}
          style={{ width: 200, marginRight: 10 }}
        />
        <Input
          placeholder="Search by Student ID"
          value={filters.studentId}
          onChange={(e) => handleFilterChange('studentId', e.target.value)}
          style={{ width: 200, marginRight: 10 }}
        />
        <Select
          placeholder="Vaccination Status"
          value={filters.vaccinationStatus}
          onChange={(value) => handleFilterChange('vaccinationStatus', value)}
          style={{ width: 200, marginRight: 10 }}
        >
          <Option value="">All</Option>
          <Option value="true">Vaccinated</Option>
          <Option value="false">Not Vaccinated</Option>
        </Select>
        <Button type="primary" onClick={downloadReport}>
          Download Report
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={students}
        loading={loading}
        rowKey="_id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: handleTableChange,
        }}
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default Reports;
