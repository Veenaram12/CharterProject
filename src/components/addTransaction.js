import React, {useState} from "react";
import {Input, DatePicker, Button, message, Spin} from "antd";
import moment from "moment";
import '../App.css';

const AddTransaction = (props) => {

    const [name, setName] = useState('')
    const [date, setDate] = useState(null)
    const [amount, setAmount] = useState(null)

    const handleChange = (e) => {
        switch(e.target.name){
            case 'name': return setName(e.target.value);
            case 'amount': 
                if(!isNaN(e.target.value)){
                    return setAmount(e.target.value)
                }; break;
            default: return null
        }
    }

    const handleDateChange = (date, dateString) => {
        setDate(date)
    }

    const addTransaction = () => {
        if(!name || !date || !amount || name === ''){
            message.error('All Fields Are Required !!!')
            return
        }
        
        props.addTransaction({
            transaction_id: Math.random(),
            name,
            date: moment(date).format("MM-DD-YYYY"),
            transaction_amount: amount
        })
    }

    return ( 
        <Spin spinning={props.loading}>
            <div className="row">
            <Input 
                placeholder="Customer Name"
                name="name"
                value={name}
                className={"form-fields"}
                onChange={(e)=>handleChange(e)}
            />
            <DatePicker
                placeholder="Transaction Date"
                name="date"
                value={date}
                className={"form-fields"}
                onChange={(date, dateString)=>handleDateChange(date, dateString)}
                allowClear={false}
                format={"MM-DD-YYYY"}
                style={{width:'507px'}}
            />
            <Input 
                placeholder="Transaction Amount - Numbers Only"
                name="amount"
                value={amount}
                className={"form-fields"}
                onChange={(e)=>handleChange(e)}
            />
            <div style={{marginTop: '20px', marginLeft: '330px'}}>
                <Button onClick={() => props.handleCancel()} style={{marginRight: '15px'}}>Cancel</Button>
                <Button onClick={addTransaction} type="primary">Submit</Button>
            </div>
        </div>
        </Spin>
     );
}
 
export default AddTransaction;