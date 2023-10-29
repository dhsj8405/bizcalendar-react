// utils.js
export const dateToYYYYMMDD = (date) => {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// 20230711 -> Sun Jul 11 2023 00:00:00 GMT+0000
export const yyyymmddToDate = (dateString) => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6) - 1;
    const day = dateString.slice(6, 8);
    return new Date(year, month, day);
  }




class Developer {
    constructor(name){
      this.name = name;
    }
  
    hello(){
      return 'Hello World! I am ' + this.name + ' and I am a web developer';
    }
}  