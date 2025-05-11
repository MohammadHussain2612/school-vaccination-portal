/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Form, Modal, Upload, message, Switch } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    const token = localStorage.getItem('authToken');
    if (!token) {
      message.error('No authentication token found');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get('http://localhost:5000/api/students', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setStudents(response.data.students);
    } catch (error) {
      message.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEditStudent = async (values) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      message.error('No authentication token found');
      return;
    }
    try {
      if (editingStudent) {
        await axios.put(`http://localhost:5000/api/students/${editingStudent._id}`, values, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        message.success('Student updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/students', values, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        message.success('Student added successfully');
      }
      fetchStudents();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to save student');
    }
  };

  const handleDeleteStudent = async (id) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      message.error('No authentication token found');
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      message.success('Student deleted successfully');
      fetchStudents();
    } catch (error) {
      message.error('Failed to delete student');
    }
  };

  const handleBulkImport = async (file) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      message.error('No authentication token found');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('http://localhost:5000/api/students/bulk-import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      message.success('Students imported successfully');
      fetchStudents();
    } catch (error) {
      message.error('Failed to import students');
    }
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
      title: 'ID',
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
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => { setEditingStudent(record); setIsModalVisible(true); }} style={{ marginRight: 10 }}>Edit</Button>
          <Button danger onClick={() => handleDeleteStudent(record._id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ margin: 30, padding: 30 }}>
      <h2>Manage Students</h2>
      <Input
        placeholder="Search students"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: 20 }}
      />
      <div style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={() => { setEditingStudent(null); setIsModalVisible(true); }} style={{ marginRight: 10 }}>
          Add Student
        </Button>
        <Upload
          beforeUpload={handleBulkImport}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Bulk Import</Button>
        </Upload>
      </div>
      <Table
        columns={columns}
        dataSource={filteredStudents}
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
      <Modal
        title={editingStudent ? 'Edit Student' : 'Add Student'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={editingStudent || { name: '', class: '', studentId: '', vaccinationStatus: false }}
          onFinish={handleAddEditStudent}
          layout="vertical"
        >
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="class" label="Class" rules={[{ required: true, message: 'Please input the class!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="studentId" label="Student ID" rules={[{ required: true, message: 'Please input the student ID!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="vaccinationStatus" label="Vaccination Status" valuePropName="checked">
            <Switch checkedChildren="Vaccinated" unCheckedChildren="Unvaccinated" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingStudent ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageStudents;
