'use client';
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function DonationStatus() {
  const [show, setShow] = useState(false);
  const [showed, setShowed] = useState(false);
  useEffect(() => {
    if (location.href.includes('?success=1') && !show) {
      setShow(true);
    }
    if (show && !showed) {
      toast.success('Thanks for your donation!');
      setShowed(true);
    }
  }, [show]);

  return (
    <>

    </>
  );
}