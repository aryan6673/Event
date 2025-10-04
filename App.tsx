
import React, { useEffect } from 'react';
import { Meteors } from './components/Meteors';
import { AnimatedThemeToggler } from './components/AnimatedThemeToggler';
import { LineShadowText } from './components/LineShadowText';
import { Highlighter } from './components/Highlighter';
import { Terminal } from './components/Terminal';
import { SmoothCursor } from './components/SmoothCursor';
import { RegistrationForm } from './components/RegistrationForm';

export default function App() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = storedTheme ? storedTheme === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  return (
    <>
      <SmoothCursor />
      <main className="relative min-h-screen w-full overflow-x-hidden bg-white dark:bg-black font-sans">
        <Meteors number={30} />
        <div className="absolute top-6 right-6 z-50">
          <AnimatedThemeToggler />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <section className="relative z-10 flex min-h-screen flex-col items-center justify-center space-y-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Turn Your Ideas into
            </h1>

            <div className="relative w-full max-w-3xl">
              <LineShadowText
                as="h2"
                className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl italic tracking-tight text-center"
                shadowColor="#38bdf8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.6 }}
              >
                AI-Powered Apps
              </LineShadowText>
            </div>

            <div className="max-w-3xl text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
              <p>
                <Highlighter action="underline" color="#FFEB3B" strokeWidth={2}>
                  Join our month-long AI Fellowship
                </Highlighter>{" "}
                and turn your ideas into powerful AI-driven apps.
              </p>
              <p>
                Learn from experts, gain hands-on experience, and bring your innovative projects to life.
              </p>
              <p>
                <Highlighter
                  action="highlight"
                  color="#87CEFA"
                  className="text-gray-900 dark:text-black"
                >
                  Shape the future of technology
                </Highlighter>{" "}
                while building skills that make a real impact.
              </p>
            </div>
          </section>

          <section className="relative z-20 mt-16 sm:mt-24 flex flex-col items-center space-y-10 pb-24">
            <div className="w-full max-w-lg">
              <RegistrationForm />
            </div>

            <div className="w-full max-w-2xl">
              <Terminal />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}