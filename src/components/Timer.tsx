import React from "react";
export const Timer: React.FC = () => {
    const styles: React.CSSProperties = {
        backgroundColor: "lightblue",
        fontSize: "2em"
    };
    const hStyleRed: React.CSSProperties = {
        color: "red"
    }
    const hStyleBlue: React.CSSProperties = {
        color: "blue"
    }
    setTimeout(tic, 1000);
    const [time, setTime] = React.useState(new Date())
    function tic() {
        setTime(new Date())
    }

    setTimeout(colorTic, 5000);
    const [colorCss, setColor] = React.useState(hStyleRed)
    function colorTic() {
        colorCss.color == "red" ? setColor(hStyleBlue) : setColor(hStyleRed);
    }

    return <div>
        <h2 style={colorCss}>Current Time</h2>
        <p style={styles}>{time.toLocaleTimeString()}</p>
    </div>
}