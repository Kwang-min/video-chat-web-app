import React,{ useEffect, useState } from 'react'
import axios from 'axios'


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
            <div>talkin bout korea!</div>
            <button onClick={makeRoom}>make a room</button>
            {roomList && 
                roomList.map((room,index) => (
                        <div key={index}>
                            <a href={`/room/${room}`} > room  </a>
                        </div>
                ))
            }
        </div>
    )
}

export default LandingPage
