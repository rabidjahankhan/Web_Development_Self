import React from "react";
import "./CardList.css";

export default function ({children}) {
    const reversedChildren = React.Children.toArray(children).reverse();
    return <div className="card-list">{reversedChildren}</div>
}