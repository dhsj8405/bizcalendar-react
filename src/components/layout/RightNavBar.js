import React, { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import LayoutCss from '../../assets/css/Layout.css';
import rightNavIconImg from '../../assets/img/icon.png';
import Spinner from '../common/Spinner';
import { AiOutlineArrowLeft } from "react-icons/ai";



const RightNavBar = ({expand,locationPath}) => {
    const [groupList,setGroupList] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    useEffect(()=>{
        getGroupList();
    },[])
    const getGroupList = () =>{
        // axios로 그룹 리스트 조회 코드 start
        // axios로 그룹 리스트 조회 코드 end

        // mock 데이터
        let tmparr = [{
            srno:1,
            title:"그룹1 제목",
            content:"그룹1 내용"
        },
        {
            srno:2,
            title:"그룹2 제목",
            content:"그룹2 내용"
        }]
        setGroupList(tmparr);

    }
    // const handleToggle = (isOpen) => {
    //     // isOpen: true (열릴 때), false (닫힐 때)
    //     setShowDropdown(isOpen);3
    // };
    const groupClick = (e,group) =>{
        e.stopPropagation();    // 상위 컴포넌트 NavDropdown 클릭시에만 열고닫히게하기
        //axios 그룹 상세 조회 코드 start
        //axios 그룹 상세 조회 코드 end
    }
    return (
        <>
        <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton className={LayoutCss.off}>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <img className={LayoutCss.icon} src={rightNavIconImg} alt="비즈캘린더로고"/>
                비즈캘린더
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {locationPath !== '/'
                ?
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        
                        <NavLink to="/board" className="nav-link">공지사항</NavLink>
                        <NavLink to="/setting" className="nav-link">구글연동하기</NavLink>
                        <NavLink to="/" className="nav-link border-top">
                            <AiOutlineArrowLeft size={20}/>
                            캘린더</NavLink>
                    </Nav>
                :
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <NavDropdown
                            title="내 그룹 목록"
                            id={`offcanvasNavbarDropdown-expand-${expand}`}
                            // onToggle={handleToggle}
                        >
                            {groupList != null
                                ?                                
                                groupList.map(group=>(
                                    <NavDropdown.Item key={group.srno} onClick={(e)=>{groupClick(e,group)}} >{group.title}</NavDropdown.Item>
                                ))
                                :
                                <Spinner />
                            }
                        </NavDropdown>
                        <NavLink to="/board" className="nav-link">환경설정</NavLink>
                    </Nav>
                }
              
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </>

    );
};

export default RightNavBar;