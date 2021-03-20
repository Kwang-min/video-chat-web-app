import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'antd';
import { PhoneFilled } from '@ant-design/icons';


function LandingPage(props) {

    const [roomList, setroomList] = useState(null)
    
    useEffect(() => {
        axios.post('/getRoomList')
            .then(response => {
                if(response.data.success) {
                    setroomList(response.data.roomList)
                } else {
                    alert('방 목록을 가져오는 데 실패했습니다')
                }
            })

    }, [])

    const makeRoom = () => {

        axios.post('/')
            .then(response => {
                if(response.data.success) {

                    const value = {
                        roomId: response.data.roomId
                    }
                    axios.post('/appendRoomList', value)
                    
                    props.history.push(`/room/${response.data.roomId}`);

                } else {
                    alert('방만들기 실패!')
                }
                
            })

    }
    
    return (
        <div>
            <div style={{ textAlign: 'center', marginTop: '70px' }}>
                <h1 >talkin bout korea!</h1>
                <br />
                <Button onClick={makeRoom} type="primary">Create a new room</Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
            {roomList && 
                roomList.map((room,index) => (
                        <div key={index} style={{ width: '250px', height: '170px', margin: '20px', 
                             borderRadius: '4px', backgroundColor: '#1e272d' }} >
                            <a href={`/room/${room}` } style={{ fontSize: '20px', 
                            position: 'relative', top: '65px', left: '55px'}} > join and talk <PhoneFilled /></a>
                        </div>
                ))
            }
            </div>
        </div>
    )
}

export default LandingPage
