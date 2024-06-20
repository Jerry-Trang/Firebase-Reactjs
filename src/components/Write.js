import React, { useState } from 'react';
import app from '../FirebaseConfig';
import { Button, Checkbox, Form, Input } from 'antd';
import { getDatabase, ref, set, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const Write = () => {
  const navigate = useNavigate()

  let [inputValue1, setInputValue1] = useState("");
  let [inputValue2, setInputValue2] = useState("");
  // let [inputValue3, setInputValue3] = useState("");

  const saveData = async ()=>{
    const randomID = Math.floor(Math.random()  * 9999)
    const db = getDatabase(app)
    const newDocRef = push(ref(db,"accounts/client"))
    set(newDocRef, {
      ID: randomID,
      account: inputValue1,
      password: inputValue2,
      // fruitImage: inputValue3
    }).then( ()=>{
      alert("Data saved successfully")
    }).catch((error)=>{
      alert("ERROR: ", error.message)
    })
    setInputValue1("")
    setInputValue2("")
  }
  return (
    <>
     <Button type="primary" danger onClick={()=>{
            navigate('/Read')
        }}>Read</Button>
        <Button type="primary" danger onClick={()=>{
            navigate('/UpdateRead')
        }}>UpdateRead</Button>
        
        <br/>
      {/* <label>Account</label><br></br>
      <input type='text' value={inputValue1} onChange={
        (e)=>{
          setInputValue1(e.target.value);
        }
      }/><br></br>
      <label>Pass word</label><br></br>
      <input type='password' value={inputValue2} onChange={
        (e)=>{
          setInputValue2(e.target.value);
        }
      }/> <br></br>
      
      <button onClick={saveData}>Save Data</button> */}

      <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input onChange={(e)=>{
        setInputValue1(e.target.value);
      }}/>
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password onChange={(e)=>{
        setInputValue2(e.target.value);
      }} />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button onClick={saveData}  type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>




    </>
  )
}

export default Write;
