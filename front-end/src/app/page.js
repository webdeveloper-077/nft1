"use client";

import UploadFile from './UploadFile'
import NavBar from '../../components/navbar'
import "./globals.css"

export default function Home() {
  return (
    <main>
      <NavBar />
      <UploadFile/>
    </main>
  )
}
