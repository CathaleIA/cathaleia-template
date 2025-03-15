'use client'

import { useEffect } from "react";
import { test } from "@/app/signin/page";

export default function Home() {
  useEffect(() => {
    const button = document.querySelector<HTMLButtonElement>('#counter');
    if (button) {
      test(button);
    }
  }, []);

  return (
    <div>
      <button id="counter" type="button">
        SALUDAR
      </button>
    </div>
  );
}