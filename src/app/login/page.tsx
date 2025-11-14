"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export default function AuthPage() {
  const [showPw, setShowPw] = useState(false);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Bg */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/auth-page/background.png')" }}
      />

      {/* Wrap */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 md:px-6">
        {/* Board */}
        <div className="relative grid w-full max-w-[1150px] h-[640px] grid-cols-1 overflow-hidden rounded-2xl bg-white/90 shadow-[0_24px_100px_rgba(2,6,23,0.15)] backdrop-blur md:grid-cols-2">
          
          {/* Left */}
          <div className="relative flex flex-col items-start justify-center bg-[#0f1a31] px-8 py-10 md:px-10 md:py-12 text-white">
            {/* Logo */}
            <Image
              src="/img/auth-page/logo.png"
              alt="KINOTE"
              width={150}
              height={45}
              priority
              className="absolute top-8 left-8 h-auto w-[140px] md:w-[150px]"
            />

            {/* Text */}
            <div className="max-w-[300px]">
              <h2 className="text-[24px] font-semibold leading-snug">
                Mulai Lagi Sekarang!
              </h2>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                Masuk untuk melanjutkan perjalanan produktivitasmu bersama Kinote.
              </p>
            </div>

            {/* Home */}
            <div className="absolute bottom-8 left-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-[#0f1a31] hover:bg-transparent hover:border-white hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="relative bg-white overflow-hidden">
            {/* BgLogo */}
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src="/img/auth-page/logo_back.png"
                alt="Kinote back"
                width={700}
                height={700}
                className="absolute bottom-[-10px] right-[-10px] object-contain scale-105 select-none"
                priority
              />
            </div>

            {/* Sosmed */}
            <div className="absolute right-6 top-6 z-10 flex items-center gap-3">
              <a
                href="https://www.instagram.com/justinetaniardi/"
                target="_blank"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#0f1a31] text-white hover:opacity-90 transition"
              >
                <Image src="/icons/instagram.png" alt="Instagram" width={20} height={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/justine-taniardi/"
                target="_blank"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#0f1a31] text-white hover:opacity-90 transition"
              >
                <Image src="/icons/linkedin.png" alt="LinkedIn" width={20} height={20} />
              </a>
              <a
                href="https://wa.me/6281258126007"
                target="_blank"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#0f1a31] text-white hover:opacity-90 transition"
              >
                <Image src="/icons/whatsapp.png" alt="WhatsApp" width={20} height={20} />
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="pointer-events-auto w-[88%] md:w-[460px] rounded-xl bg-white p-6 md:p-7 shadow-[0_20px_80px_rgba(2,6,23,0.12)]">
              <h1 className="text-center text-[24px] font-extrabold text-[#0f1a31]">Login</h1>

              {/* Username */}
              <label className="mt-5 block text-sm font-medium text-slate-700">Username</label>
              <div className="mt-2 flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-200 transition">
                <UserIcon className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Insert your Username"
                  className="w-full bg-transparent outline-none text-sm placeholder:text-slate-400"
                />
              </div>

              {/* Password */}
              <label className="mt-4 block text-sm font-medium text-slate-700">Password</label>
              <div className="mt-2 flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-200 transition">
                <LockClosedIcon className="h-5 w-5 text-slate-400" />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Insert your Password"
                  className="w-full bg-transparent outline-none text-sm placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  className="text-slate-500 hover:text-slate-700 transition"
                >
                  {showPw ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>

              {/* Opt */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-[#0f1a31] focus:ring-[#0f1a31]"
                  />
                  Remember me
                </label>
                <a href="#" className="hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Btn */}
              <button className="mt-6 w-full rounded-md bg-[#0f1a31] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#101c36] transition">
                Submit
              </button>

              {/* Reg */}
              <p className="mt-4 text-center text-sm text-slate-600">
                Belum Memiliki Akun?{" "}
                <Link href="/register" className="font-semibold text-[#0f1a31] hover:underline">
                  Daftar
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
