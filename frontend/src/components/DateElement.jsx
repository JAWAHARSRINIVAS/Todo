import '../css/DateElement.css';

function DateElement(){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const date = new Date();

    return (
        <div className="date-element">
            <h2 className="day">{weekday[date.getDay()]}</h2>
            <span className="date-full">{date.getDate()+" "+month[date.getMonth()]+" "+date.getFullYear()}</span>
        </div>
    );
}

export default DateElement;