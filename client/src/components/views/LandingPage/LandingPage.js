import React,{ useEffect, useState, useRef } from 'react'
import axios from 'axios'
import io from "socket.io-client";
import { Button } from 'antd';
import { PhoneFilled, SmileFilled } from '@ant-design/icons';


function LandingPage(props) {

    const socket = useRef();

    const [roomList, setroomList] = useState(null)
    
    useEffect(() => {

        socket.current = io.connect("/main");

        socket.current.on('make-room', roomList => {
            setroomList(roomList)
        })

        socket.current.on('delete-room', roomList => {
            setroomList(roomList)
        })

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
                <h1 >talkin' Bout korea!</h1>
                <br />
                <Button onClick={makeRoom} type="primary">Create a new room</Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
            {roomList && 
                roomList.map((room,index) => (
                        <div key={index} style={{ width: '250px', height: '170px', margin: '20px', 
                             borderRadius: '4px', backgroundColor: '#1e272d' }} >
                            <p style={{ color: '#1C8FFC', marginLeft: '5px', 
                            marginTop: '3px', fontSize: '17px' }}><SmileFilled /> room {index} </p>
                            <a href={`/room/${room}` } style={{ fontSize: '20px', 
                            position: 'relative', top: '75px', left: '60px'}} > join and talk <PhoneFilled /></a>
                        </div>
                ))
            }
            </div>
        </div>
    )
}

export default LandingPage
