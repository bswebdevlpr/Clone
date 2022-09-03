import { useState } from "react";
import Seo from "../components/Seo";

export default function About(){
    let [count, setCount] = useState(0);

    return (
        <div>
            <Seo title="About" />
            About  
        </div>
    );
}