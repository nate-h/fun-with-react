import React from "react";
import "./Card.scss"


const CardHeader = (props: any) => (
    <h1>{props.children}</h1>
)

const CardSubHeader = (props: any) => (
    <h2 style={{ color: "gray" }}> {props.children}</h2 >
)

export default function Card(props: any) {
    return (
        <section className="Card">
            {props.header && <CardHeader>{props.header}</CardHeader>}
            {props.subheader && <CardSubHeader>{props.subheader}</CardSubHeader>}
            {props.children}
        </section>
    )
}