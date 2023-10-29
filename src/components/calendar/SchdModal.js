import React, { useState, useEffect, useReducer  } from 'react';
import { Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import { Modal, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
import baseUrl from '../../config/Apiurl';
import ko from 'date-fns/locale/ko';
import axios from 'axios'
import * as utils from '../../utils/common.js';
import { mySchdReducer, initialState } from '../../reducer/mySchdReducer.js';

const SchdModal = ({ selectedDate, setSelectedDate, getSchd, selectedSchedule,setSelectedSchedule}) => {
    const [selectedTime, setSelectedTime] = useState();
    const [formValues, dispatch] = useReducer(mySchdReducer, initialState);
    const [sttgDtDatePicker, setSttgDtDatePicker] = useState();
    const [fnshDtDatePicker, setFnshDtDatePicker] = useState();
    const [isShow,setIsShow] = useState(false);

    // useEffect(() => {
    //     getNowTime();
    // }, []);
    useEffect(() => {
        fillByModalForNew(selectedDate);
    },[selectedDate])
    
    useEffect(()=>{
        fillByModalForDetail(selectedSchedule);  
    },[selectedSchedule])


    // 일정 상세보기시 모달 채우기
    // 상세보기후 프론트에서 일정 지워지는 현상 수정필요
    const fillByModalForDetail = (selectedSchedule) =>{
        if(selectedSchedule != null){
            setIsShow(true);
            if(selectedSchedule.mySchdMapDto.sttgDt != null){
                selectedSchedule.mySchdMapDto.sttgDt = utils.yyyymmddToDate(selectedSchedule.mySchdMapDto.sttgDt)
                selectedSchedule.mySchdMapDto.fnshDt = utils.yyyymmddToDate(selectedSchedule.mySchdMapDto.fnshDt)
            }
            let dispatchData = Object.entries(selectedSchedule.mySchdMapDto).map(([name, value]) => ({
                type: 'CHANGE',
                name,
                value,
            }));
            dispatchData.forEach((data) => {
                dispatch(data);
            });
        }
    }
    // 달력 빈곳 선택시 모달 채우기
    const fillByModalForNew = (selectedDate) => {
        let name = "sttgDt";
        let value = selectedDate;
        dispatch({ type: 'CHANGE', name , value });
        name = "fnshDt";
        value = selectedDate;
        dispatch({ type: 'CHANGE', name , value });
        if(selectedDate!=null){
            setIsShow(true);
        }

        console.log(getNowTime());
        // dispatch({ type: 'CHANGE',  , value });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let scheduleDtoJson = {
            mySchdMapDto : {
                ...formValues,
                "sttgDt":utils.dateToYYYYMMDD(formValues.sttgDt),
                "fnshDt":utils.dateToYYYYMMDD(formValues.fnshDt)
            },
            schdShrnInfmDtoList :[],
            // schdItrtInfmDto : {...itrtJson},
            schdClsfDto : { schdClsfSrno : 1 }
        }

        axios({
            url: `${baseUrl}/api/v2/mySchd`,
            method: 'post',
            data: scheduleDtoJson
        }).then((res)=> {
            getSchd();
        })
        onHide();
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'CHANGE', name, value });
    };
      const datepickerChange = (value,name) => {
        dispatch({ type: 'CHANGE', name, value });
    };  

    
    const getNowTime = () => {
        // 현재 시간 가져오기
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();

        // 현재 시간을 30분 단위로 정렬
        const roundedMinutes = Math.floor(minutes / 30) * 30;

        // 현재 시간을 문자열로 변환
        return `${hours.toString().padStart(2, '0')}:${roundedMinutes.toString().padStart(2, '0')}`;
    }
    
    // 시간 selectbox 생성 (30분간격)
    const timeOptions = [];
    const createTimeSelectbox = () => {
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                timeOptions.push(<option key={time} value={time}>{time}</option>);
            }
        }
    }
    createTimeSelectbox();
    
    const onHide = () =>{
        setSelectedDate(null);
        setSelectedSchedule(null);
        console.log(formValues)        
        setIsShow(false);
        dispatch({ type: 'reset'});
        console.log(formValues)        

    }
    return (
        <>
        {/* <Modal open={isShow} onClose={onHide} centered>
      <div className="modal-container">
        <Typography variant="h5" component="div" gutterBottom>
          <TextField
            type="text"
            name="ttl"
            label="제목을 입력하세요"
            value={formValues.ttl}
            onChange={handleInputChange}
          />
        </Typography>
        <div className="modal-content">
          <FormControl>
            <InputLabel>시작 일자</InputLabel>
            <DatePicker
              name="sttgDt"
              value={formValues.sttgDt}
              onChange={(date) => datepickerChange(date, 'sttgDt')}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
          <FormControl>
            <InputLabel>시작 시각</InputLabel>
            <Select name="sttgTktm" value={formValues.sttgTktm} onChange={handleInputChange}>
              {timeOptions}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>종료 일자</InputLabel>
            <DatePicker
              name="fnshDt"
              value={formValues.fnshDt}
              onChange={(date) => datepickerChange(date, 'fnshDt')}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
          <FormControl>
            <InputLabel>종료 시각</InputLabel>
            <Select name="fnshTktm" value={formValues.fnshTktm} onChange={handleInputChange}>
              {timeOptions}
            </Select>
          </FormControl>
        </div>
        <div className="modal-footer">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            저장
          </Button>
          <Button variant="contained" color="secondary" onClick={onHide}>
            닫기
          </Button>
        </div>
      </div>
    </Modal> */}
            <Modal
                show={isShow}
                onHide={onHide}
                centered
                size="lg"
            >
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <Form.Group controlId="formEmail">
                                <Form.Control
                                type="text"
                                name="ttl"
                                placeholder="제목을 입력하세요"
                                value={formValues.ttl}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formDate">
                            <Form.Label></Form.Label>
                            <DatePicker
                                name='sttgDt'
                                selected={formValues.sttgDt}
                                onChange={(date)=>datepickerChange(date,'sttgDt')}
                                dateFormat="yyyy-MM-dd"
                                locale={ko}
                                className="form-control"
                            />
                        </Form.Group>
                        <Form.Group controlId="formSttgTktm">
                            <Form.Label></Form.Label>
                            <Form.Control 
                                as="select" 
                                value={formValues.sttgTktm} 
                                onChange={handleInputChange}
                                name="sttgTktm"
                            >
                                {timeOptions}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formDate">
                            <Form.Label></Form.Label>
                            <DatePicker
                                name='fnshDt'
                                selected={formValues.fnshDt}
                                onChange={(date)=>datepickerChange(date,'fnshDt')}
                                dateFormat="yyyy-MM-dd"
                                locale={ko}
                                className="form-control"
                            />
                        </Form.Group>
                        <Form.Group controlId="formRole">
                            <Form.Label></Form.Label>
                            <Form.Control 
                                as="select" 
                                value={formValues.fnshTktm} 
                                onChange={handleInputChange}
                                name="fnshTktm"
                            >
                                {timeOptions}
                            </Form.Control>
                        </Form.Group>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">저장</Button>
                        <Button variant="secondary" onClick={() => setSelectedDate(null)}>
                            닫기
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>

    );
};

export default SchdModal;