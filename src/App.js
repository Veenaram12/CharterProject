import {Table, Button, message, Spin} from "antd";
import React, { useEffect, useState } from "react";
import './App.css';
import 'antd/dist/antd.css';
import Modal from "antd/lib/modal/Modal";
import AddTransaction from "./components/addTransaction";
import data from "./data/data.json";

const App = () => {

  const columns = [
    {
      title: 'Id',
      dataIndex: 'transaction_id',
      render: (text,record) => {
        return <span>{text}</span>
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text,record) => {
        return <span>{text}</span>
      }
    },
    {
      title: 'Transaction Date',
      dataIndex: 'date',
      render: (text,record) => {
        return <span>{text}</span>
      }
    },
    {
      title: 'Transaction Amount ($)',
      dataIndex: 'transaction_amount',
      render: (text,record) => {
        return <span>{text}</span>
      }
    },
    {
      title: 'Reward Points',
      dataIndex: 'reward',
      render: (text,record) => {
        return <span>{calculateReward(record)}</span>
      }
    },

  ]

  const [rowData, setRowData] = useState([])
  const [addTransactionModal, setAddTransactionModal] = useState(false)
  const [loading, setLoading] = useState(false)


  useEffect(()=>{
    let rowDataTemp = []
    data.map((row, index) => {
      let obj = {...row}
      obj.reward = calculateReward(row)
      rowDataTemp.push(obj)
      return null
    })
    setRowData(rowDataTemp)
  }, [])

  const calculateReward = (rowData) => {
    if (rowData.transaction_amount >100){
      return (2*(rowData.transaction_amount-100) + 50);
    }
    else if(rowData.transaction_amount > 50){
      return (rowData.transaction_amount - 50)
    }
    return 0
  }

  const addTransaction = (transaction_obj) => {
    setLoading(true)
    let tableData = [...rowData]
    tableData.push(transaction_obj)
    setRowData(tableData)
    message.success('Transaction Added Successfully !!!')
    setLoading(false)
    handleCancel()

  }

  const handleCancel = () => {
    setAddTransactionModal(false)
  }

  return (
    <div className="App">
      <h3>Customer's Reward Point Calculator</h3>
      <div className={"add_transaction"}>
        <Button onClick={() => setAddTransactionModal(true)} type="primary">Add Transaction</Button>
      </div>
      <Spin spinning={loading}>
        <div className={"col-8 offset-2 record_table"}>
          <Table
            columns={columns}
            dataSource={rowData}
            style={{marginTop: '50px'}}
            rowKey={record => record.transaction_id.toString()}
          />
        </div>
      </Spin>
      {
        addTransactionModal && 
        <Modal
          title="Add Transaction" 
          visible={addTransactionModal} 
          onCancel={handleCancel}
          footer={null}
        >
          <AddTransaction addTransaction={addTransaction} handleCancel={handleCancel} loading={loading}/>
        </Modal>
      }
    </div>
  );
}

export default App;
