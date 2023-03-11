import React, { useEffect, useRef, useState } from "react";
import timeZones from "../time-zones";
import { Input } from "./Input";

type Props = {
    cityCountry: string;
}

export const Timer: React.FC<Props> = ({ cityCountry }) => {
    const styles: React.CSSProperties = {
        backgroundColor: "lightblue",
        fontSize: "2em"
    };
    const [time, setTime] = useState(new Date());
    const myTimeZone = useRef<Object>();
    const [zone, setZone] = useState(cityCountry);

    function tic() {
        setTime(new Date())
    }
    useEffect(() => {
        setZone(cityCountry);
    }, [cityCountry])
    
    useEffect(() => {
        myTimeZone.current = { timeZone: findTimeZone(zone) };
    }, [zone])

    useEffect(() => {
        const interval = setInterval(tic, 1000);
        return () => clearInterval(interval);
    }, [])

    function submit(value: string) {
        let res = '';
        const outValue = value.split(" ").map((v) => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()).join(" ");
        findTimeZone(value) ? setZone(outValue) : res = `${value} does not exist`
        return res;
    }

    return <div className="timer">
        <Input buttonName="Set Time" placeHolder='Set City or Country' submitFn={submit} />
        <h2 >Current Time in {zone}</h2>
        <p style={styles}>{time.toLocaleTimeString("en-GB", myTimeZone.current)}</p>
    </div>
}

function findTimeZone(zone: string): string | undefined {
    console.log("Enter func");
    const res = timeZones.findIndex((obj) => JSON.stringify(obj).toLowerCase().includes(zone.toLowerCase()));
    return res < 0 ? undefined : timeZones[res].name;
}

