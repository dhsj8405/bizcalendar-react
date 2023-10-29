import React, { useState, useEffect } from 'react';
import '../../assets/css/Calendar.css';
import axios from 'axios'
import { Link } from 'react-router-dom';
import baseUrl from '../../config/Apiurl';

import Button from 'react-bootstrap/Button';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Container from 'react-bootstrap/Container';
import 'react-datepicker/dist/react-datepicker.css';
import SchdModal from './SchdModal';
import * as utils from '../../utils/common.js';
import classNames from 'classnames';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [scheduleList, setScheduleList] = useState([]);
  const [schdClsfList, setSchdClsfList] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null); 

  useEffect(() => {
    getClsfSrno();
  }, [currentDate]);

  useEffect(()=>{
    getSchd();
  },[])
  
  // 일정 조회
  const getSchd = () => {
    axios({
        url: `${baseUrl}/api/v2/mySchd/schdlist`,
        method: 'post',
        data: {
          start : utils.dateToYYYYMMDD(getCalendarDays()[0]),
          end: utils.dateToYYYYMMDD(getCalendarDays()[getCalendarDays().length - 1])
        }
    }).then((res)=> {
        setScheduleList(res.data.data)
    })
}
    // 일정분류 조회
    const getClsfSrno = () => {
      axios({
        url: `${baseUrl}/api/schdClsf`,
        method: 'get',
    }).then((res)=> {
        setSchdClsfList(res.data.data)
    })

  }
  
  // 일정 클릭
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // 달력 전환 버튼
  const prevMonthBtn = () => {
    setCurrentDate((prevDate) => {
      return new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
    });
  };
  const nextMonthBtn = () => {
    setCurrentDate((prevDate) => {
      return new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
    });
  };

  const currentMonthBtn = () => {
    setCurrentDate(new Date());
  }
  const eventClick = (e,schedule) => {
    e.stopPropagation();
    setSelectedSchedule(schedule); 

  }
  const renderCalendar = () => {
    let calendarDiv = [];
    getCalendarDays().forEach(date => {
      let calendarDayClassName = classNames('calendar-day', {
        // 수정필요 : 오늘날짜기준으로만 이전달,다음달 가능 ( 달력상의 현재 달 기준으로 바뀌어야함)
        'prev-month-day': date.getMonth() + 1 < new Date().getMonth() + 1,
        'next-month-day': date.getMonth() + 1 > new Date().getMonth() + 1,
        'current-month-day': date.getMonth() + 1 === new Date().getMonth() + 1,
      });

      let schdForDate = scheduleList.filter((schedule) => schedule.mySchdMapDto.sttgDt === utils.dateToYYYYMMDD(date));
      calendarDiv.push(
        <div
          key={date.toISOString()}
          className={calendarDayClassName}
          onClick={() => handleDateClick(date)}
        >
          <div className="date">{date.getDate()}</div>
          <div className="events">
          {schdForDate.map((schedule) => (
            <>
            <div 
              key={schedule.mySchdMapDto.mySchdSrno} 
              className="event" 
              onClick={(e)=>{eventClick(e,schedule)}}
              // style={{ backgroundColor: schdClsfList.filter((schdClsf) => schdClsf.schdClsfSrno == schedule.schdClsfDto.schdClsfSrno)[0].fontColor}}
            > 
              {schedule.mySchdMapDto.ttl}
            </div>
            </>
          ))}
          </div>
        </div>
      )
    })
    return calendarDiv;
  };

  // 화면에 노출되는 캘린더 시작일~종료일 얻기
  const getCalendarDays = () => {
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 해당 월의 첫 번째 날짜를 가져옴
    const firstDay = new Date(year, month, 1);
    // 해당 월의 마지막 날짜를 가져옴
    const lastDay = new Date(year, month + 1, 0);

    const calendarDays = [];

    // 이전 월의 날짜
    for (let i = firstDay.getDay(); i > 0; i--) {
      const date = new Date(year, month, -i + 1);
      calendarDays.push(date);
    }

    // 현재 월의 날짜
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      calendarDays.push(date);
    }

    // 다음 월의 날짜
    const nextMonthDaysCount = 42 - calendarDays.length;
    for (let i = 1; i <= nextMonthDaysCount; i++) {
        const date = new Date(year, month + 1, i);
        calendarDays.push(date);
    }
    return calendarDays;
  }

  return (
    <>
      <Container fluid>
          <div className="calendar">
              <div className="calendar-header">
                  <div className="calendar-title-text">
                      {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                  </div>
                  <Button variant="link" onClick={prevMonthBtn} title="이전달">
                    <BsChevronLeft size={30}/>
                  </Button>
                  <Button variant="link" onClick={nextMonthBtn} title="다음달">
                    <BsChevronRight size={30} />
                  </Button>
                  <Button variant="light" onClick={currentMonthBtn} title="오늘" size='lg'>오늘</Button>
              </div>
              <div className="calendar-grid">
                  <div className="calendar-weekday">일</div>
                  <div className="calendar-weekday">월</div>
                  <div className="calendar-weekday">화</div>
                  <div className="calendar-weekday">수</div>
                  <div className="calendar-weekday">목</div>
                  <div className="calendar-weekday">금</div>
                  <div className="calendar-weekday">토</div>
                  {renderCalendar()}
              </div>
          </div>
      </Container>  
      <SchdModal 
        selectedDate = {selectedDate}
        setSelectedDate = {setSelectedDate}
        getSchd = {getSchd}
        selectedSchedule={selectedSchedule}
        setSelectedSchedule={setSelectedSchedule}
      />
    </>
  );
};
export default Calendar;