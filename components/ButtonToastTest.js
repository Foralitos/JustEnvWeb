"use client";

import { sileo } from "sileo";

const ButtonToastTest = () => {
  return (
    <button
      className="btn btn-secondary"
      onClick={() => sileo.success({ title: "Sileo works!" })}
    >
      Test Toast
    </button>
  );
};

export default ButtonToastTest;
