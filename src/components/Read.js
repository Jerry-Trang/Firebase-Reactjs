import React, { useState } from "react";
import app from "../FirebaseConfig";
import { getDatabase, ref, get, remove } from "firebase/database";
import { Card, Space } from "antd";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
const Read = () => {
  const navigate = useNavigate()
  let [fruitArray, setFruitArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "accounts/client");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      // console.log(Object.values(snapshot.val()));
      setFruitArray(Object.values(snapshot.val()));
    } else {
      alert("Error!!!");
    }
  };

  const deleteData = async (acountID)=>{
    // console.log(acountID)
    const db = getDatabase(app);
    const dbRef = ref(db, "accounts/client" + acountID);
    console.log(dbRef)
    await remove(dbRef)
    // window.location.reload()
  }


  return (
    <>
    <Button type="primary" danger onClick={()=>{
            navigate('/')
        }}>Write</Button>
        <Button type="primary" danger onClick={()=>{
            navigate('/UpdateRead')
        }}>UpdateRead</Button>
        
        <br/>
      <button onClick={fetchData}>See all accounts</button>

      {fruitArray.map((item, index) => {
        return (
          <>
            <Space key={index} direction="vertical" size={16}>
              <Card
                title="Clients Accounts"
                style={{
                  width: 300,
                }}
              >
                <p>{index}</p>
                <p>{item.ID}</p>
                <p>{item.account}</p>
                <p>{item.password}</p>
              </Card>
              <Button onClick={()=>{
                deleteData(item.ID)
              }}>Delete</Button>

            </Space>
            
          </>
        );
      })}
    </>
  );
};

export default Read;
