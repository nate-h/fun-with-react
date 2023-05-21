import React from "react";
import Card from "../Card"

export default function TicTacToe() {
    return (
        <Card header="Tic-Tac-Toe" subheader="no text">
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Dolore aliquid unde quam in minus incidunt cupiditate officiis ut et,
                excepturi maiores, vitae numquam voluptatum nesciunt,
                perspiciatis animi quasi soluta quas.
            </p>
            <div style={{ width: 200, height: 200, background: "white" }}></div>
        </Card>
    )
}