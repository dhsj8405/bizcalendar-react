import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logoImg from '../../assets/img/logo.png';
import userImg from '../../assets/img/thumb_none2.png';
import Container from 'react-bootstrap/Container';
import { BsFillGrid3X3GapFill,BsPersonCircle} from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Accordion from 'react-bootstrap/Accordion';

const Heder = () => {
    return (
        <div>
            <Navbar>
                <Container fluid>
                    <Navbar.Brand href="#">
                        <img src={logoImg} alt="비즈플레이로고"/>
                        비즈캘린더
                    </Navbar.Brand>
                    <Form className="d-flex">
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2 custom-search-bar"
                        aria-label="Search"
                        />
                        <Button variant="outline-primary">Search</Button>
                    </Form>
                    <Navbar.Collapse className="justify-content-end">
                        <div className="d-flex align-items-center">
                            <div className="mb-2">
                                {['start'].map(
                                (direction) => (
                                    <DropdownButton
                                    key={direction}
                                    id={`dropdown-button-drop-${direction}`}
                                    drop={direction}
                                    variant="light"
                                    title= {<BsFillGrid3X3GapFill size={30} className='px-1'/>}
                                    
                                    >
                                    <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                                    <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                    </DropdownButton>
                                ),
                                )}
                        </div>
                        {/* <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                <BsFillGrid3X3GapFill size={40} className='px-1'/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Accordion Item #1</Accordion.Header>
                                            <Accordion.Body>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                                            <Accordion.Body>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Dropdown.Item>
                                
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">환경설정</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
                            {/* <img src={userImg} alt="유저사진" className="ml-2" /> */}
                            <BsPersonCircle size={40} className='px-1'/>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Heder;