import React,{ useEffect, useState, useRef } from 'react'
import io from "socket.io-client";
import Peer from 'peerjs';

function Room(props) {

    const ROOM_ID = props.match.params.roomId

    const myPeer = useRef();
    const socket = useRef();
    
    const videoGrid = useRef();

    const peers = useRef({});


    useEffect(() => {
        
        const myVideo = document.createElement('video')
        socket.current = io.connect("/");
        myPeer.current = new Peer(undefined, {
            host: '/',
            port: '3001'
        })

        navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
        }).then(stream => {
        addVideoStream(myVideo, stream)
        
        
        myPeer.current.on('call', call => {
            
            //전화오면 내 스트림 담아서 답장해줌
            call.answer(stream)
            const video = document.createElement('video')
            //콜올때 상대방 스트림 오는 거 받아서 내 화면에 비디오 생성
            call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
            })
            
            call.on('close', () => {
            video.remove()
            })
        
            peers.current[call.peer] = call
            
        })
        
        //요건 전화 거는 거 
        //유저 연결됐다는 거 받으면 그 아디에다가 전화걸기
        socket.current.on('user-connected', userId => {
            
            connectToNewUser(userId, stream)
        })
        })
        
        
        socket.current.on('user-disconnected', userId => {
        if (peers.current[userId]) peers.current[userId].close()
        })
        
        myPeer.current.on('open', id => {
        socket.current.emit('join-room', ROOM_ID, id)
        })

    }, [])


    function connectToNewUser(userId, stream) {
        //전화 걸고
        
        const call = myPeer.current.call(userId, stream)
        
        const video = document.createElement('video')
        //스트림 답장오는 거 받아서 상대방 비디오 생성
        
        call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
        })

        call.on('close', () => {
        video.remove()
        })
    
        peers.current[userId] = call
    }
    
    function addVideoStream(video, stream) {
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
        video.play()
        })
        videoGrid.current.append(video)
    }


    return (
        <div>
            <div ref={videoGrid}></div>
        </div>
    )
}

export default Room
