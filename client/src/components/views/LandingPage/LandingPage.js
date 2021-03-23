import React,{ useEffect, useState, useRef } from 'react'
import axios from 'axios'
import io from "socket.io-client";
import { PhoneFilled, SmileFilled, TeamOutlined } from '@ant-design/icons';


function LandingPage(props) {

    const socket = useRef();

    const [roomList, setroomList] = useState(null)
    const [RoomNameInput, setRoomNameInput] = useState('')
    
    useEffect(() => {

        socket.current = io.connect("/main");

        socket.current.on('join-user', roomList => {
            setroomList(roomList)
        })

        socket.current.on('disconnect-user', roomList => {
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

    const makeRoom = (event) => {
        event.preventDefault();
        const roomName = RoomNameInput;

        axios.post('/')
            .then(response => {
                if(response.data.success) {

                    const value = {
                        roomId: response.data.roomId,
                        roomName: roomName
                    }
                    axios.post('/appendRoomList', value)
                    
                    props.history.push(`/room/${response.data.roomId}`);

                } else {
                    alert('방만들기 실패!')
                }
                
            })

    }

    const onRoomNameHandler = (event) => {
        setRoomNameInput(event.currentTarget.value)
    }
    
    return (
        <div>
            <div style={{ textAlign: 'center', marginTop: '70px' }}>
                <h1 >talkin' Bout korea!</h1>
                <br />
                <form onSubmit={makeRoom}>
                    <input type="text" value={RoomNameInput} required 
                    onChange={onRoomNameHandler} placeholder= 'Enter title here'/>
                    <button type="submit" style={{ marginLeft: '5px' }}>Create a new room</button>
                </form>
                
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
            {roomList && 
                roomList.map((room,index) => (
                        <div key={index} style={{ width: '250px', height: '170px', margin: '20px', 
                             borderRadius: '4px', backgroundColor: '#1e272d' }} >
                            <span style={{ color: '#1C8FFC', marginLeft: '6px', 
                             fontSize: '17px' }}><SmileFilled /> room {index +1} </span>
                            <span style={{ color: '#1C8FFC', marginLeft: '120px',  
                            fontSize: '17px'}}><TeamOutlined />{room.users.length}</span>
                            <p style={{ color: '#1C8FFC', marginLeft: '5px', fontSize: '17px'}}>Title</p>
                            <p style={{ color: '#1C8FFC', marginLeft: '5px', fontSize: '17px'}}>{room.roomName}</p>
                            <a href={`/room/${room.roomId}` } style={{ fontSize: '17px', 
                            position: 'relative', top: '25px', left: '70px'}} > join and talk <PhoneFilled /></a>
                        </div>
                ))
            }
            </div>
        </div>
    )
}

export default LandingPage
