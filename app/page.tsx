"use client";

import { pdfjs } from "react-pdf";
import { useCallback, useState } from "react";
import { Document, Page } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { useResizeObserver } from "@wojtekmaj/react-hooks";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Image from "next/image";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

type PDFFile = string | File | null;

const Button = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={() => {
        if (onClick) onClick();
      }}
      className='border border-slate-200 py-1.5 px-2 rounded'
    >
      {children}
    </button>
  );
};
export default function Home() {
  const [filePath, _] = useState<PDFFile>("/portfolio.pdf");
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  return (
    <>
      <main className='flex min-h-screen flex-col items-center justify-center lg:justify-between gap-10 bg-slate-800'>
        <section className='w-full *:pt-10 overflow-hidden bg-gray-50 md:pt-0 sm:pt-16 2xl:pt-16'>
          <div className='px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl'>
            <div className='grid items-center grid-cols-1 md:grid-cols-2'>
              <div>
                <h2 className='text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl'>
                  Hey 👋 I am <br className='block sm:hidden' />
                  ISAAC, Faith
                </h2>
                <p className=' max-w-lg mt-3 text-xl leading-relaxed text-gray-600 md:mt-8'>
                  A graphic designer proficient in adobe creative suite
                  (photoshop, illustrator, indesign),strong knowledge of graphic
                  design principles, typography, and colortheory
                </p>
                <p className='mt-4 text-xl text-gray-600 md:mt-8'>
                  <span className='relative inline-block'>
                    <span className='absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300' />
                    <span className='relative'> Have a question? </span>
                  </span>
                  <br className='block sm:hidden' /> Ask me on{" "}
                  <a
                    href='https://twitter.com/faithybubu'
                    className='transition-all duration-200 text-sky-500 hover:text-sky-600 hover:underline'
                  >
                    Twitter
                  </a>{" "}
                  or{" "}
                  <a
                    href='https://www.linkedin.com/in/faith-isaac-796678195/'
                    className='transition-all duration-200 text-sky-500 hover:text-sky-600 hover:underline'
                  >
                    LinkedIn
                  </a>
                </p>
              </div>
              <div className='relative'>
                {/* <img
                  className='absolute inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2'
                  src='https://cdn.rareblocks.xyz/collection/celebration/images/team/1/blob-shape.svg'
                  alt=''
                /> */}
                <Image
                  className='relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110'
                  src='/faith.jpeg'
                  alt='Isaac Faith'
                  width='500'
                  height='500'
                />
              </div>
            </div>
          </div>
        </section>

        <section className='flex items-center gap-3'>
          {pageNumber !== 1 ? (
            <Button
              onClick={() => {
                setPageNumber(pageNumber - 1);
              }}
            >
              Prev
            </Button>
          ) : null}
          <p>
            Page {pageNumber} of {numPages}
          </p>
          {numPages && numPages > pageNumber ? (
            <Button
              onClick={() => {
                setPageNumber(pageNumber + 1);
              }}
            >
              Next
            </Button>
          ) : null}
        </section>
        <section
          ref={setContainerRef}
          className='flex justify-center items-center w-full'
        >
          <Document
            file={filePath}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            <Page
              pageNumber={pageNumber}
              width={
                containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
              }
              // scale={1.5}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>
        </section>
      </main>
      <footer className='bg-slate-800 p-5 text-center'>
        Isaac Faith © {new Date().getFullYear()}
      </footer>
    </>
  );
}
