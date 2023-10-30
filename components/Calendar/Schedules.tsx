"use client"

import React from 'react'

import useDate from '@/utils/useDate'

const Schedules = () => {
    const { result } = useDate({ date: new Date() }); // Call the useDate function with a date

  console.log(result);
    return (
    <div>Schedules</div>
  )
}

export default Schedules