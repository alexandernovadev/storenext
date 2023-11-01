import React, { useState, useEffect } from 'react'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { verify } from 'crypto'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'

interface Option {
  name: string
  id: string
}

interface Question {
  name: string
  desc: string
  options: Option[]
  correct: string
}

interface Exam {
  usuario: string
  fechaHoraInicio: string
  fechaHoraFin: string
  ipUsuario: string
  puntajeObtenido: number
  questions: Question[]
}

const QuestionAppPage = () => {
  const [exam, setExam] = useState<Exam>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timeLeft, setTimeLeft] = useState<number>(300)

  const sliderRef = React.useRef(null)

  const [userAnswers, setUserAnswers] = useState<{
    [questionName: string]: string
  }>({})

  useEffect(() => {
    if (timeLeft <= 0) {
      // Handle time up logic here (like disabling the submit button)
      return
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timerId)
  }, [timeLeft])

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await fetch(
          '/api/question?id=654185d1ec37f5fb6c7e6efa',
        )
        const data = await response.json()
        console.log(data)

        if (response.ok) {
          setExam(data.data)
        } else {
          setError(data.message || 'Failed to fetch exam')
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchExam()
  }, [])

  const handleAnswerChange = (questionName: string, answerId: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionName]: answerId,
    }))
  }

  const handleSubmit = () => {
    console.log(userAnswers)
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`
  }

  const verifyOptions = () => {
    console.log()
  }

  return (
    <div>
      <h1>Exam Questions</h1>
      <h2>{formatTime(timeLeft)} / 5:00</h2>

      {/** @ts-ignore */}
      <Slider ref={sliderRef} {...settings}>
        {exam?.questions.map((q) => (
          <div key={q.name} style={{ width: 430 }}>
            <h2>{q.name}</h2>
            <p>{q.desc}</p>
            {q.options.map((option,i) => (
              <div className="radioWrapper" key={option.id}>
                <input
                  className="radioInput"
                  type="radio"
                  id={`${q.name}-${option.id}`}
                  value={option.id}
                  name={q.name}
                  onChange={() => handleAnswerChange(q.name, option.id)}
                  checked={userAnswers[q.name] === option.id}
                />
                <label
                  className="radioLabel"
                  htmlFor={`${q.name}-${option.id}`}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{option.name}</span>
                    <span>
                      {option.id !== q.correct ? (
                        <CloseIcon sx={{ color: 'red' }} />
                      ) : (
                        <CheckIcon sx={{ color: 'green' }} />
                      )}
                    </span>
                  </div>
                </label>
              </div>
            ))}
            {/** @ts-ignore */}
            <button onClick={() => sliderRef.current?.slickNext()}>here</button>
          </div>
        ))}
      </Slider>

      <br />
      <div>
        <button
          onClick={verifyOptions}
          // disabled={timeUp}
        >
          Test
        </button>

        <button
          onClick={handleSubmit}
          // disabled={timeUp}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default QuestionAppPage
